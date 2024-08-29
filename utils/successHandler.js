/**
 *
 * @param {import('express').Response} res the response object
 * @param {number} statusCode the status code of the response
 * @param {object} data the data to be sent as response
 * @param {string} message the message to be sent
 */

const successHandler = (res, statusCode, data, message) => {
	res.status(statusCode).json({
		status: 'Success',
		data,
		message,
	});
};

module.exports = successHandler;
