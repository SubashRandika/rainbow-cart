import User from '../models/User.js';
import validateUser from '../validations/userValidation.js';

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
