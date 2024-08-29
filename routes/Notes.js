const {
	createNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
} = require('../controller/Note');
const router = require('express').Router();

router.route('/').post(createNote).get(getAllNotes);
router.route('/:id').get(getNoteById).patch(updateNote).delete(deleteNote);

module.exports = router;
