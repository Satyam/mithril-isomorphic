/* jshint node:true */
module.exports = function (m, IsoModules) {

	var app = {
		//models

		// I keep a static copy of the list in the app
		// so it doesn't get reloaded each time the route changes
		// and a new app instance gets initialized
		list: null,

		//controller
		controller: function () {

			// model initialization, if does not already exists
			if (!app.list) {
				app.list = m.request({
					method: 'GET',
					url: 'data/quotes.json'
				});
			}

			// app properties
			this.color = m.prop('');
			this.bigFonts = m.prop(false);

			// event listeners
			this.reset = function () {
				this.bigFonts(false);
				this.color('');
			}.bind(this);

			this.randomizeColor = function () {
				this.color("rgb(0, " + (Math.random() * 125 | 0) + ", 0)");
			}.bind(this);

		},


		//view
		view: function (ctrl) {
			return m(
				"div", {
					class: "app " + (ctrl.bigFonts() ? "big" : ""),
					style: {
						backgroundColor: ctrl.color()
					}
				},
				tabs(ctrl, {
					list: app.listView,
					settings: app.settingsView,
					about: app.aboutView
				})
			);
		},
		listView: function (ctrl) {
			return m(
				"ul.itemlist",
				app.list().map(function (item) {
					return m("li", item.quote + ' - ' + item.author);
				})
			);
		},
		settingsView: function (ctrl) {
			return m(".settings", [
				m("div", [
					m("input[type=checkbox]", {
						checked: ctrl.bigFonts(),
						onclick: m.withAttr('checked', ctrl.bigFonts)
					}),
					"big fonts"
				]),
				m("div", [
					m("button", {
						onclick: ctrl.randomizeColor
					}, "random color")
				]),
				m("div", [
					m("button", {
						onclick: ctrl.reset
					}, "reset")
				])
			]);
		},
		aboutView: function () {
			return m(
				".about", 
				[
					"This is a sample demo",
					m("hr"),
					m(
						"textarea", {
							rows: 10,
							cols: 80,
							onchange: function () {
								app.list(JSON.parse(this.value));
								console.log(app.list());
							}
						},
						JSON.stringify(app.list)
					),
					m('p', 'If you go to the [list] tab, you will see the changes at once.')
				]
			);
		}
	};

	/*
	Receives a reference to the controller and 
	an object with the labels to be shown as the keys and
	the content as functions returning the result of an m()  call.

	I'm using a potentially localizable string as the key to the tabs.
	That is not a good idea but for the example it serves
	*/
	var tabs = function (ctrl, options) {

		// read the tab key from the URL or use the first key as default
		var tabKey = m.route.param('tab') || Object.keys(options)[0];

		var tab = function (name) {
			return m("li", [
			m("a", {
				class: tabKey == name ? "selected" : "",
				href: '/' + name,
				// let Mithril take care of the routing
				config: m.route
			}, name)
		]);
		};

		return [
			// tabs:
			m('.tabs', [
				m("ul", Object.keys(options).map(tab))
			]),
			// body:
			options[tabKey](ctrl)
		];
	};
	
	IsoModules.app = app;
};
