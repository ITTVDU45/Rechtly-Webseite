import mongoose, { Schema, Document as MDocument } from 'mongoose';

export interface IImage extends MDocument {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  anfrageId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const imageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  path: { type: String, required: true },
  anfrageId: { type: Schema.Types.ObjectId, ref: 'Anfrage', required: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', imageSchema, 'Anfragen');






