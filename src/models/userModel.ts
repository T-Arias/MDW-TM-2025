import { Schema, model, InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name:   { type: String, required: true, trim: true },
  email:  { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export type UserDoc = InferSchemaType<typeof userSchema>;
export default model<UserDoc>("User", userSchema);
