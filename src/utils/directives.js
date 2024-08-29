const vAutoResize = {
	mounted(el) {
		(el.style.overflow = 'hidden'),
			(el.style.resize = 'none'),
			(el.style.height = 'auto'),
			(el.style.height = el.scrollHeight + 'px');

		el.addEventListener('input', () => {
			el.style.height = 'auto';
			el.style.height = el.scrollHeight + 'px';
		});
	},
};

export default vAutoResize;
