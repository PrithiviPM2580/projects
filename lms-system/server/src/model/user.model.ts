import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  description?: string;
  role: "student" | "instructor";
  avatarUrl?: string;
  enrolledCourses: mongoose.Types.ObjectId[];
  comparePassword(candidatePassword: string): boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String },
    role: { type: String, enum: ["student", "instructor"], required: true },
    avatarUrl: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 });

UserSchema.pre<IUser>("save", function () {
  if (!this.isModified("password")) return;
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
