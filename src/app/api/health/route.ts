/**
 * Progressive Health Endpoint Template
 *
 * This file gets embedded in the Docker image and serves as the fallback
 * health endpoint for AI-generated applications.
 *
 * Returns 200 OK during all startup phases to keep health checks passing
 * while the app is installing dependencies and starting up.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SandboxState {
  phase: string;
  timestamp: number;
  message: string;
  pid?: number;
}

export async function GET(req: NextRequest) {
  try {
    const includeLogs = req.nextUrl.searchParams.get('logs') === 'true';
    const includeBuildErrors = req.nextUrl.searchParams.get('buildErrors') === 'true';

    // Read state file if exists
    let state: SandboxState = {
      phase: 'running',
      timestamp: Date.now(),
      message: 'Server is running',
    };

    if (fs.existsSync('/tmp/sandbox-state.json')) {
      try {
        const stateData = fs.readFileSync('/tmp/sandbox-state.json', 'utf-8');
        state = JSON.parse(stateData);
      } catch (e) {
        console.error('Failed to parse state file:', e);
      }
    }

    // Get process metrics
    const uptime = process.uptime();
    const memory = process.memoryUsage();

    const healthData: any = {
      status: 'ok',
      phase: state.phase,
      timestamp: Date.now(),
      uptime: Math.round(uptime),
      message: state.message,
      checks: {
        filesDownloaded: fs.existsSync('/app/package.json'),
        nodeModules: fs.existsSync('/app/node_modules'),
        nextConfig: fs.existsSync('/app/next.config.js') || fs.existsSync('/app/next.config.ts'),
        serverListening: true,
      },
      memory: {
        heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
        heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
        rss: Math.round(memory.rss / 1024 / 1024),
        percentage: Math.round((memory.heapUsed / memory.heapTotal) * 100),
      },
    };

    if (includeLogs) {
      if (fs.existsSync('/tmp/sandbox-startup.log')) {
        try {
          const logData = fs.readFileSync('/tmp/sandbox-startup.log', 'utf-8');
          healthData.logs = (logData || '').split('\n').slice(-50);
        } catch (e) {
          healthData.logs = ['Failed to read logs'];
        }
      } else {
        healthData.logs = ['No startup logs available'];
      }
    }

    if (includeBuildErrors) {
      const buildLog = fs.existsSync('/tmp/build.log')
        ? fs.readFileSync('/tmp/build.log', 'utf-8')
        : '';
      const typeCheckLog = fs.existsSync('/tmp/typecheck.log')
        ? fs.readFileSync('/tmp/typecheck.log', 'utf-8')
        : '';
      healthData.buildErrors = parseBuildErrors(buildLog);
      healthData.typeErrors = parseBuildErrors(typeCheckLog);
    }

    // CRITICAL: Always return 200 unless in 'failing' state
    const httpStatus = state.phase === 'failing' ? 503 : 200;

    return NextResponse.json(healthData, {
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'X-Sandbox-Phase': state.phase,
        'X-Sandbox-Uptime': uptime.toString(),
      },
    });
  } catch (error) {
    console.error('Health endpoint error:', error);
    return NextResponse.json({
      status: 'ok',
      phase: 'running',
      uptime: process.uptime(),
      message: 'Healthy (minimal check)',
      checks: { serverListening: true },
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 200 });
  }
}

interface ParsedError {
  type: 'typescript' | 'eslint' | 'missing_dependency' | 'build';
  file?: string;
  line?: number;
  column?: number;
  code?: string;
  message: string;
  rule?: string;
  module?: string;
  severity: 'error' | 'warning';
}

function parseBuildErrors(logContent: string): ParsedError[] {
  if (!logContent) return [];
  const errors: ParsedError[] = [];

  const tsErrorRegex = /^(.+?)\((\d+),(\d+)\): error TS(\d+): (.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = tsErrorRegex.exec(logContent)) !== null) {
    errors.push({ type: 'typescript', file: match[1], line: parseInt(match[2]), column: parseInt(match[3]), code: `TS${match[4]}`, message: match[5], severity: 'error' });
  }

  const eslintRegex = /^\s+(\d+):(\d+)\s+error\s+(.+?)\s+(.+)$/gm;
  while ((match = eslintRegex.exec(logContent)) !== null) {
    errors.push({ type: 'eslint', line: parseInt(match[1]), column: parseInt(match[2]), message: match[3], rule: match[4], severity: 'error' });
  }

  const moduleRegex = /Module not found: Can't resolve '(.+?)'/g;
  while ((match = moduleRegex.exec(logContent)) !== null) {
    errors.push({ type: 'missing_dependency', module: match[1], message: `Missing dependency: ${match[1]}`, severity: 'error' });
  }

  const buildErrorRegex = /Error: (.+)/g;
  while ((match = buildErrorRegex.exec(logContent)) !== null) {
    const m = match;
    if (!(Array.isArray(errors) ? errors : []).some(e => e.message === m[1])) {
      errors.push({ type: 'build', message: m[1], severity: 'error' });
    }
  }

  return (errors || '').slice(0, 20);
}
