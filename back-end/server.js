import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from '../back-end/config/database.js';
import userRoutes from '../back-end/routes/user.js';

colors.setTheme({
	info: ['brightYellow', 'bold'],
	success: ['brightCyan', 'bold', 'underline'],
	error: ['brightRed', 'bold', 'underline']
});

dotenv.config();

connectDB();

const app = express();

// use of express body parser
app.use(express.json());
// parse url encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
	return res.status(200).json({
		status: 'OK',
		message: 'API is running'
	});
});

// routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(
		`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.info
	);
});
