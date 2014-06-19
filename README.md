mithril-isomorphic
==================

An attempt at making Mithril work both on the client and the server.

Installation
============

Clone this repository or download the zip file and expand.

Run `npm install` in the project folder to install the dependencies.

So far..
========

This is a work in progress.  Sorry if at any point it gets unstable.

So far:

If you do `node server.js` and then browse to `localhost:8000` as the console message suggests
you will be able to get to a sample application.  

The text on the application is all in uppercase letters.  This is a clue to its origin.  
The contents generated on the server has been turned into uppercase to tell it apart
from that generated on the client.

As you move across the tabs you will see the contents on the new tab panels show in lowercase letters 
while the labels on the tabs themselves remain in uppercase as they are not refreshed.

If you reload any of those pages, reloading them from the server, an uppercased version will show.

All active elements, whether in the client or server side sections, are active and should respond as expected.
As a matter of fact, if you switched tabs it was because the action associated with the tabs 
was revived.  As expected of a single page application such as this, no trips to the server are required
unless you explicitly reload the page.

`server.js` launches an express server which uses middleware to run the Mithril application in the server.
For the default configuration, you just need to add this to the express server script:

	app.use(require('mithril-isomorphic')());
	
When loading the middleware, an object with several configuration options can be given.	
You can see the configuration options documented [here](https://github.com/Satyam/mithril-isomorphic/blob/master/node_modules/mithril-isomorphic/isomithril.js#L125)

The [`routes.js` file](https://github.com/Satyam/mithril-isomorphic/blob/master/app/routes.js)
is slightly modified from the standard arguments to `m.route()`:

	module.exports = function (m) {
		m.route('/', {
			'/': 'app',
			'/:tab': 'app'
		});
	};

* It should be exported as any node module.  
* The route configuration is missing the first argument, the document root, as there is no document yet.
* The module name is given as a string (`'app'` instead of `app`) as there is no instance of it yet.

The application can be made of any number of individual files. 
A [module](https://github.com/Satyam/mithril-isomorphic/blob/master/app/app.js) would look like this:

	module.exports = function (m, IsoModules) {
		var app = {
			// The regular application goes here
		};
		IsoModules.app = app;
	};

The module is defined as normal Mithril one within the exported function which will be called with the instance of Mithril
and an object which will be used to collect all the modules in the application.
A single module can be split into several files or several of them placed in the same file, as long as a
reference to each module, with its `controller` and `view` properties are in the `IsoModules` collection of modules.
The name of the module within the collection is the one used in the `routes` file above.

The [home page](https://github.com/Satyam/mithril-isomorphic/blob/master/client/index.html)
`index.html` by default, should contain a placeholder `{{body}}` somewhere within the body.
It will be replaced by the static version of the page plus the  scripts to make it active, including Mithril itself.

Only the minimum of Mithril itself has been modified to be able to access internal variables and member
functions inaccessible to external applications.  The `m.render()` method is the only one changed.
Other methods have bene monkey-patched.   
The version of Mithril tagged *next* was used for this package.

I have used the [mock DOM](https://github.com/lhorie/mithril.js/blob/master/tests/mock.js) 
used for testing with very slight modifications, instead of attempting to use a more
comprehensive emulator such as PhantomJS.
