const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const notesRouter = require('./routes/Notes');
const app = express();
const port = process.env.PORT || 5000;

const successHandler = require('./utils/successHandler');
const errorHandler = require('./utils/errorHandler');

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
	try {
		return successHandler(res, 200, {}, 'Welcome to the Notes API');
	} catch (error) {
		console.error(error);
		errorHandler(res, 500, error.message);
	}
});

app.use('/api/v1/notes', notesRouter);

const startServer = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		app.listen(port, () =>
			console.log(`Server started successfully on port ${port}`)
		);
	} catch (error) {
		console.error(error);
	}
};

startServer();
