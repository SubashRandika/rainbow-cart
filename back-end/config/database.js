import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_DB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});

		console.log(`MongoDB connected: ${connection.host}`.success);
	} catch (error) {
		console.error(`Error: ${error.message}`.error);
		process.exit(1);
	}
};

export default connectDB;
