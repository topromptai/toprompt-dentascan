import mongoose, { Schema, Document, Types } from 'mongoose';
import { DamageArea } from '@/types';

export interface IAnalysis extends Document {
  userId: Types.ObjectId;
  imageUrl: string;
  damageAreas: DamageArea[];
  overallSeverity: string;
  analysisTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DamageAreaSchema = new Schema<DamageArea>(
  {
    area: { type: String, required: true },
    severity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      required: true,
    },
    description: { type: String, required: true },
  },
  { _id: false }
);

const AnalysisSchema = new Schema<IAnalysis>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true },
    damageAreas: { type: [DamageAreaSchema], default: [] },
    overallSeverity: { type: String, required: true, default: 'unknown' },
    analysisTimestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Analysis ||
  mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
