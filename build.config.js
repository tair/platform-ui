/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
	dir: {
		dev: 'bin/dev',
		prod: 'bin/prod'
	},

	/**
	 * This is a collection of file patterns that refer to our app code (the
	 * stuff in `src/`). These file paths are used in the configuration of
	 * build tasks. `js` is all project javascript, less tests. `ctpl` contains
	 * our reusable components' (`src/common`) template HTML files, while
	 * `atpl` contains the same, but for our app's code. `html` is just our
	 * main HTML file, `less` is our main stylesheet, and `unit` contains our
	 * app's unit tests.
	 */
	src: {
		root: 'src',

		static_files: [
			'assets/**/*',
			'lib/**/.htaccess',
			'api/**/*.py'
		],

		app: [ 'app/**/*.js' ],
		templates: [ 'src/app/**/*.html' ],
		html: [ 'index.html' ],
		lib: [
			//'lib/js/angular-ui-router.min.js',
			//'lib/js/ui-bootstrap-tpls-0.13.0.min.js',
			//'lib/js/underscore.min.js',
			'lib/js/angulartics-ga.min.js',
			'lib/js/angulartics.min.js',
			'lib/js/angular-ui-router.min.js',
			'lib/js/lodash.min.js',
			'lib/js/ui-bootstrap-tpls-0.13.0.min.js',
			'lib/js/bootbox.min.js'
		]
	}
};
