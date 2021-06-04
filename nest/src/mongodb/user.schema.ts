import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  icon: String,
  created_at: Date,
  updated_at: Date,
});
