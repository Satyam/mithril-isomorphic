module.exports = function (m) {
	m.route('/', {
		'/': 'app',
		'/:tab': 'app'
	});
};
