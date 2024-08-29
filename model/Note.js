const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
