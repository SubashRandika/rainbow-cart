import Joi from 'joi';

const validateUser = async (user) => {
	const schema = Joi.object({
		firstName: Joi.string().trim().min(3).max(20).required(),
		lastName: Joi.string().trim().min(3).max(20).required(),
		username: Joi.string().trim().lowercase().required(),
		email: Joi.string().trim().required().email(),
		password: Joi.string()
			.trim()
			.pattern(
				new RegExp(
					'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
				)
			)
			.required()
			.messages({
				'string.pattern.base':
					'Not a strong password. Should contain atleast 8 characters including lowercase, uppercase, digits and special characters'
			})
	});

	return schema.validate(user);
};

export default validateUser;
