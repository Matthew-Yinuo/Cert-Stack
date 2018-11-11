import { Document, Schema, model } from "mongoose";
import * as bcrypt from "bcryptjs";

export interface IUserModel extends Document {
  email: string;
  password: string;
  confirmed: boolean;
  createdAt: Date;
}

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  confirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre<IUserModel>("save", function(next) {
  if (this.password) {
    if (!this.isModified("password")) {
      return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  }
});

export const User = model<IUserModel>("User", UserSchema);
