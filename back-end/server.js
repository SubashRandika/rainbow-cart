import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

colors.setTheme({
	info: ['brightYellow', 'bold'],
	success: ['brightCyan', 'bold', 'underline'],
	error: ['brightRed', 'bold', 'underline']
});

dotenv.config();

const app = express();

app.get('/health', (req, res) => {
	return res.status(200).json({
		status: 'OK',
		message: 'API is running'
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(
		`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.info
	);
});
