import { Document, Schema, model } from "mongoose";

export interface ICredentialModel extends Document {
  recipient: string;
  recipientEmail: string;
  groupId: string;
  issueDate: Date;
  createdAt: Date;
}

const CredentialSchema = new Schema({
  recipient: { type: String },
  recipientEmail: { type: String },
  groupId: { type: String },
  issueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const Credential = model<ICredentialModel>(
  "Credential",
  CredentialSchema
);
