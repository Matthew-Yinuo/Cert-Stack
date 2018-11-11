import { Document, Schema, model } from "mongoose";
export interface ICredentialModel extends Document {
  recipient: string;
  email: string;
  groupId: string;
  issueDate: Date;
  createdAt: Date;
}
const CredentialSchema = new Schema({
  recipient: { type: String },
  email: { type: String },
  groupId: { type: String },
  issueDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
export const Credential = model<ICredentialModel>(
  "Credential",
  CredentialSchema
);