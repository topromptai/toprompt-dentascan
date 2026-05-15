// src/types/index.ts — shared types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DamageArea {
  area: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
}

export interface Analysis {
  _id: string;
  userId: string;
  imageUrl: string;
  damageAreas: DamageArea[];
  overallSeverity: string;
  analysisTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  analysisIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
