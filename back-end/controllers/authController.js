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

export const registerAdmin = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (user) {
			return res
				.status(400)
				.json({ email: `Admin already registered with ${req.body.email}` });
		}

		const { firstName, lastName, username, email, password } = req.body;
		user = new User({
			firstName,
			lastName,
			username,
			email,
			password,
			role: 'admin'
		});

		await user.save();

		return res.status(201).json({
			message: 'Admin successfully created'
		});
	} catch (error) {
		console.error(`Unable to signup admin: ${error.message}`.error);
		return res.status(500).json({ error: error.message });
	}
};

export const signinAdmin = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res
				.status(404)
				.json({ email: `Admin not yet registered with ${req.body.email}` });
		}

		const { _id, firstName, lastName, fullName, username, email, role } = user;

		if (user.authenticate(req.body.password) && role === 'admin') {
			const token = jwt.sign({ _id, email, username }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRATION
			});

			return res.status(200).json({
				token,
				user: { _id, firstName, lastName, fullName, username, email, role }
			});
		} else {
			return res.status(401).json({
				message: `Invalid admin credentials. Please check your password and try again.`
			});
		}
	} catch (error) {
		console.error(`Unable to signin as admin: ${error.message}`.error);
		return res.status(500).json({ error: error.message });
	}
};

export const authorizeRequest = async (req, res, next) => {
	const token = req?.headers?.authorization?.split(' ')[1];

	if (!token) {
		return res
			.status(400)
			.json({ message: 'Authorization header token must be provided' });
	}

	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) {
			const { name, expiredAt } = err;

			if (name === 'TokenExpiredError') {
				return res.status(400).json({
					message: `Authorization token has expired at ${new Date(expiredAt)}`
				});
			} else {
				return res.status(400).json({
					message: 'Invalid authorization token provided'
				});
			}
		}

		req.user = decoded;
		next();
	});
};
