import mongoose from 'mongoose';

const damagedPartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  severity: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
  description: { type: String, default: '' },
  repairEstimate: { type: String },
  zone: { type: String },
}, { _id: false });

const analysisSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  imageUrl: { type: String, default: null },
  vehicleType: { type: String, default: 'Unknown' },
  overallSeverity: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
  damagedParts: { type: [damagedPartSchema], default: [] },
  summary: { type: String, default: '' },
  confidence: { type: Number, default: 0 },
  scanDuration: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
