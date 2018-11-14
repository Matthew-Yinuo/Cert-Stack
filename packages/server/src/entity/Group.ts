import { Document, Schema, model } from "mongoose";

export interface IGroupModel extends Document {
  course: string;
  organization: string;
  userId: string;
  createdAt: Date;
}

const GroupSchema = new Schema({
  course: { type: String },
  organization: { type: String },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Group = model<IGroupModel>("Group", GroupSchema);
