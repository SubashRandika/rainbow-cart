import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

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

userSchema.virtual('password').set(function (textPassword) {
	this.password = bcrypt.hashSync(textPassword, SALT_ROUNDS);
});

userSchema.methods = {
	authenticate: function (textPassword) {
		return bcrypt.compareSync(textPassword, this.password);
	}
};

const User = mongoose.model('User', userSchema);

export default User;
