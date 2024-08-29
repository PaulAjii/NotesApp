/**
 *
 * @param {import('express').Response} res the response object
 * @param {number} statusCode the status code of the response
 * @param {string} message the message to be sent
 */

const errorHandler = (res, statusCode, message) => {
	res.status(statusCode).json({
		status: 'Error',
		message,
	});
};

module.exports = errorHandler;
