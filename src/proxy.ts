// Design preview — middleware disabled (no real auth)
import { NextResponse } from 'next/server';
export function proxy() { return NextResponse.next(); }
