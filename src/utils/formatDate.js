const formatDate = (date) => {
	const newDate = new Date();
	return new Intl.DateTimeFormat('en-Us', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date));
};

export default formatDate;
