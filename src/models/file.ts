import { model, Schema, Document } from 'mongoose';

interface FileDocument extends Document {
  name: string;
  encodedName: string;
}

const fileSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    encodedName: {
      type: String,
      maxlength: 100,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

export const File = model<FileDocument>('File', fileSchema);
