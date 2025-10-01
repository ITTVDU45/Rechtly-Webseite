import mongoose, { Schema, Document as MDocument } from 'mongoose';
// bcrypt typings may not be installed in this workspace; require dynamically
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
// @ts-expect-error - dynamic import fallback for environments without types

export interface IUser extends MDocument {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'mandant' | 'anwalt' | 'gutachter' | 'admin';
  isActive: boolean;
  activationToken?: string;
  activationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  profile?: {
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      postalCode?: string;
      country?: string;
    };
    company?: string;
    position?: string;
    specialization?: string[];
  };
  settings?: {
    notifications?: { email?: boolean; push?: boolean };
    language?: string;
  };
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  role: { type: String, enum: ['mandant', 'anwalt', 'gutachter', 'admin'], required: true },
  isActive: { type: Boolean, default: false },
  activationToken: String,
  activationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  profile: {
    phone: String,
    address: { street: String, city: String, postalCode: String, country: String },
    company: String,
    position: String,
    specialization: [String]
  },
  settings: {
    notifications: { email: { type: Boolean, default: true }, push: { type: Boolean, default: true } },
    language: { type: String, default: 'de' }
  }
}, { timestamps: true });

// Passwort-Hashing vor dem Speichern
userSchema.pre('save', async function(this: any, next: (err?: unknown) => void) {
  // if password not modified, continue
  // @ts-expect-error - mongoose Document typing
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

// Methode zum Vergleichen von Passwörtern
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  // @ts-expect-error - mongoose Document typing
  return bcrypt.compare(candidatePassword, this.password as string);
};

// Methoden zum Generieren von Tokens
userSchema.methods.generateActivationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  // @ts-expect-error - mongoose Document typing
  this.activationToken = token;
  // @ts-expect-error
  this.activationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 Stunden
  return token;
};

userSchema.methods.generateResetToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  // @ts-expect-error - mongoose Document typing
  this.resetPasswordToken = token;
  // @ts-expect-error
  this.resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 Stunde
  return token;
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
