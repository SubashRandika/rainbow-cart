import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (user) {
			return res
				.status(400)
				.json({ email: `User already registered with ${req.body.email}` });
		}

		const { firstName, lastName, username, email, password } = req.body;
		user = new User({
			firstName,
			lastName,
			username,
			email,
			password
		});

		await user.save();

		return res.status(201).json({
			message: 'User successfully created'
		});
	} catch (error) {
		console.error(`Unable to signup user: ${error.message}`.error);
		return res.status(500).json({ error: error.message });
	}
};

export const signinUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res
				.status(404)
				.json({ email: `User not yet registered with ${req.body.email}` });
		}

		const { _id, firstName, lastName, fullName, username, email, role } = user;

		if (user.authenticate(req.body.password)) {
			const token = jwt.sign({ _id, email, username }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRATION
			});

			return res.status(200).json({
				token,
				user: { _id, firstName, lastName, fullName, username, email, role }
			});
		} else {
			return res.status(401).json({
				message: `Invalid credentials. Please check your password and try again.`
			});
		}
	} catch (error) {
		console.error(`Unable to signin: ${error.message}`.error);
		return res.status(500).json({ error: error.message });
	}
};
