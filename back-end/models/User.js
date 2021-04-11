import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true, unique: true, indexed: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['admin', 'user'], default: 'user' },
		contactNumber: { type: String },
		image: { type: String }
	},
	{
		timestamp: true
	}
);

const User = mongoose.model('User', userSchema);

export default User;
