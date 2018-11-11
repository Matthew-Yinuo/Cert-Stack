import { Document, Schema, model } from "mongoose";
export interface ITemplateModel extends Document {
    course: string;
    organization: string;
    userId: string;
    createdAt: Date;
}
const TemplateSchema = new Schema({
    course: { type: String },
    organization: { type: String },
    userId: { type: String },
    createdAt: { type: Date, default: Date.now }
});
export const Template = model<ITemplateModel>("Template", TemplateSchema);