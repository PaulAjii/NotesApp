const Note = require('../model/Note');
const errorHandler = require('../utils/errorHandler');
const successHandler = require('../utils/successHandler');

/**
 *
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res the response object
 * @param {Object} req.body the body of the request
 * @param {string} req.body.title the title of the note
 * @param {string} req.body.description the description of the note
 * @returns {Promise<Note>} the note object: an instance of the Note model
 * @description This function creates a new note. It takes in the title and description from the request body, creates a new note, saves it to the database, and returns the note.
 */

const createNote = async (req, res) => {
	try {
		const { title, description } = req.body;

		if (!title || !description) {
			return errorHandler(res, 400, 'Both fields are required');
		}

		const note = await Note.create({ title, description });
		await note.save();
		return successHandler(res, 201, note, 'Note created successfully');
	} catch (error) {
		console.error(error);
		errorHandler(res, 500, error.message);
	}
};

/**
 *
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res the response object
 * @returns {Array<Note>} the array of note objects: an instance of the Note model
 * @description This function get all the notes in the database.
 */

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find();

		if (!notes) {
			return errorHandler(res, 404, 'No notes found!');
		}

		return successHandler(res, 200, notes, 'Notes fetched successfully');
	} catch (error) {
		console.error(error);
		errorHandler(res, 500, error.message);
	}
};

/**
 *
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res the response object
 * @param {Object} res.params the response parameter
 * @param {string} res.params.id the unique id of the note to be fetched which serves as the filter for the query.
 * @returns {Promise<Note>} the note object which matches id: an instance of the Note model
 * @description This function gets a single note from the database. The note returned has an _id that is equal to the req.query.id.
 */

const getNoteById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorHandler(res, 400, 'id has to be provided');
		}

		const note = await Note.findOne({ _id: id });

		if (!note) {
			return errorHandler(res, 404, 'Note not found!');
		}

		return successHandler(res, 200, note, 'Note fetched successfully');
	} catch (error) {
		console.error(error);
		errorHandler(res, 500, error.message);
	}
};

/**
 *
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res the response object
 * @param {Object} req.body the body of the request
 * @param {string} req.body.title the title of the note: the new update
 * @param {string} req.body.description the description of the note: the new update
 * @returns {Promise<Note>} the note object: an instance of the Note model
 * @description This function updates an existing note. It, first, finds an existing note using the id from the req.params and then updates the note found with the title and description from the request body, saves it to the database, and returns the note.
 */

const updateNote = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorHandler(res, 400, 'id has to be provided');
		}

		const { title, description } = req.body;

		const note = await Note.findOneAndUpdate(
			{ _id: id },
			{ title, description },
			{ new: true }
		);

		if (!note) {
			return errorHandler(res, 404, 'Note not found!');
		}

		return successHandler(res, 201, note, 'Note updated successfully');
	} catch (error) {
		console.error(error);
		errorHandler(res, 500, error.message);
	}
};

/**
 *
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res the response object
 * @param {Object} res.params the response parameter
 * @param {string} res.params.id the unique id of the note to be fetched which serves as the filter for the query.
 * @returns {Promise<void>}
 * @description This function deletes an existing note. It, first, finds an existing note using the id from the req.params and then deletes the note found.
 */

const deleteNote = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorHandler(res, 400, 'id has to be provided');
		}

		const note = await Note.findOneAndDelete({ _id: id });

		if (!note) {
			return errorHandler(res, 404, 'Note not found!');
		}

		return successHandler(res, 200, {}, 'Note deleted successfully');
	} catch (error) {
		console.error(error);
		errorHandler(res, 500, error.message);
	}
};

module.exports = {
	createNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
};
