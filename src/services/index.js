import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI;

const api = axios.create({
	baseURL: API_URI,
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 *
 * @returns {Promise<Object>} all available notes
 * @description this function returns all available notes in the database
 */

export const fetchThoughts = async () => {
	try {
		const response = await api.get('/notes');
		return response.data;
	} catch (error) {
		console.error('Error fetching notes:', error);
		throw error;
	}
};

/**
 *
 * @param {object} note data to be sent to the server
 * @returns {Promise<Object>} the created note
 * @description this function is used to create a note. It receives the note object as an argument
 */

export const createThought = async (note) => {
	try {
		const response = await api.post('/notes', note);
		return response.data;
	} catch (error) {
		console.error('Error creating note:', error);
		throw error;
	}
};

/**
 *
 * @param {string} id unique id of the note to delete
 * @returns a message indicating the note has been deleted
 * @description this function is used to delete a note with a given id
 */

export const deleteThought = async (id) => {
	try {
		const response = await api.delete(`/notes/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting note:', error);
		throw error;
	}
};

/**
 *
 * @param {string} id unique id of the note to update
 * @param {object} note update to be sent to the server
 * @returns {Promise<object>} the updated note
 * @description this function is used to update a note with a given id
 */

export const editThought = async (id, note) => {
	try {
		const response = await api.patch(`/notes/${id}`, note);
		return response.data;
	} catch (error) {
		console.error('Error updating your note:', error);
		throw error;
	}
};
