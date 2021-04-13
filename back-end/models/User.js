import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const SALT_ROUNDS = 10;

const userSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true, unique: true, indexed: true },
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		role: { type: String, enum: ['admin', 'user'], default: 'user' },
		contactNumber: { type: String },
		image: { type: String }
	},
	{
		timestamp: true
	}
);

userSchema.virtual('password').set(function (textPassword) {
	this.passwordHash = bcrypt.hashSync(textPassword, SALT_ROUNDS);
});

userSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
	authenticate: function (textPassword) {
		return bcrypt.compareSync(textPassword, this.passwordHash);
	}
};

userSchema.options.toJSON = {
	transform: function (doc, ret) {
		return _.omit(ret, ['__v', 'passwordHash']);
	}
};

const User = mongoose.model('User', userSchema);

export default User;
