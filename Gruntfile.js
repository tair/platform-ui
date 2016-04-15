module.exports = function ( grunt ) {
	
	/** 
	 * Load required Grunt tasks. These are installed based on the versions listed
	 * in `package.json` when you do `npm install` in this directory.
	 */
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-shell');

	/**
	 * Load in our build configuration file.
	 */
	var userConfig = require( './build.config.js' );

	/**
	 * This is the configuration object Grunt uses to give each plugin its 
	 * instructions.
	 */
	var taskConfig = {
		/**
		 * We read in our `package.json` file so we can access the package name and
		 * version. It's already there, so we don't repeat ourselves here.
		 */
		pkg: grunt.file.readJSON("package.json"),

		/**
		 * The banner is the comment that is placed at the top of our compiled 
		 * source files. It is first processed as a Grunt template, where the `<%=`
		 * pairs are evaluated based on this very configuration object.
		 */
		meta: {
			banner: 
				'/**\n' +
				' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' *\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
				' */\n'
		},

		/**
		 * Creates a changelog on a new version.
		 */
		changelog: {
			options: {
				dest: 'CHANGELOG.md',
				template: 'changelog.tpl'
			}
		},

		/**
		 * Increments the version number, etc.
		 */
		bump: {
			options: {
				files: [
					"package.json" 
				],
				commit: false,
				commitMessage: 'chore(release): v%VERSION%',
				commitFiles: [
					"package.json" 
				],
				createTag: false,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'origin'
			}
		},

		/**
		 * The directories to delete when `grunt clean` is executed.
		 */
		clean: [ 
			'<%= dir.dev %>', 
			'<%= dir.prod %>'
		],

		/**
		 * The `copy` task just copies files from A to B. We use it here to copy
		 * our project assets (images, fonts, etc.) and javascripts into
		 * `build_dir`, and then to copy the assets to `compile_dir`.
		 */
		copy: {
			build_static: {
				files: [
					{
						src: [ '<%= src.static_files %>' ],
						dest: '<%= dir.dev %>',
						cwd: '<%= src.root %>',
						expand: true
					}
				]
			},
			build_appjs: {
				files: [
					{
						src: [ '<%= src.app %>' ],
						dest: '<%= dir.dev %>',
						cwd: '<%= src.root %>',
						expand: true
					}
				]
			},
			build_libjs: {
				files: [
					{
						src: [ '<%= src.lib %>' ],
						dest: '<%= dir.dev %>',
						cwd: '<%= src.root %>',
						expand: true
					}
				]
			},
			compile_static: {
				files: [
					{
						src: [ '<%= src.static_files %>' ],
						dest: '<%= dir.prod %>',
						cwd: '<%= dir.dev %>',
						expand: true
					}
				]
			}
		},

		/**
		 * `grunt concat` concatenates multiple source files into a single file.
		 */
		concat: {
			/**
			 * The `compile_js` target is the concatenation of our application source
			 * code and all specified vendor source code into a single file.
			 */
			compile_app: {
				options: {
					banner: '<%= meta.banner %>'
				},
				src: [
					'module.prefix',
					'<%= dir.dev %>/<%= src.app %>', 
					'<%= html2js.app.dest %>',
					'module.suffix' 
				],
				dest: '<%= dir.prod %>/js/<%= pkg.name %>.js'
			},

			compile_lib: {
				src: [
					'src/lib/js/angulartics-ga.min.js',
					'src/lib/js/angulartics.min.js',
					'src/lib/js/angular-ui-router.min.js',
					'src/lib/js/lodash.min.js',
					'src/lib/js/ui-bootstrap-tpls-0.13.0.min.js',
					'src/lib/js/bootbox.min.js',
					//'src/lib/js/bootstrap-tooltip.js',
					//'src/lib/js/bootstrap-confirmation.js',
					//'src/lib/js/jquery-1.11.3.min.js',
					//'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js',
					//'src/lib/js/bootstrap-confirmation.js'
					//'src/lib/js/angular-ui-router.min.js',
					//'src/lib/js/ui-bootstrap-tpls-0.6.0.min.js',
					//'src/lib/js/ui-utils.min.js',
					//'src/lib/js/d3.v3.min.js',
					//'src/lib/js/underscore.min.js',
				],
				dest: '<%= dir.prod %>/js/lib.js'
			}
		},

		/**
		 * `ng-min` annotates the sources before minifying. That is, it allows us
		 * to code without the array syntax.
		 */
		ngmin: {
			compile: {
				files: [
					{
						src: [ '<%= src.app %>' ],
						cwd: '<%= dir.dev %>',
						dest: '<%= dir.dev %>',
						expand: true
					}
				]
			}
		},

		/**
		 * Minify the sources!
		 */
		uglify: {
			compile: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= concat.compile_app.dest %>': '<%= concat.compile_app.dest %>'
				}
			}
		},

		/**
		 * `less` handles our LESS compilation and uglification automatically.
		 * Only our `main.less` file is included in compilation; all other files
		 * must be imported from this file.
		 */

		less: {
			build: {
				options: {
					compress: false,
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: '<%= dir.dev %>/css/<%= pkg.name %>.css.map'
				},
				src: 'src/css/main.less',
				dest: '<%= dir.dev %>/css/<%= pkg.name %>.css'
			},
			compile: {
				options: {
					compress: true,
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: '<%= dir.prod %>/css/<%= pkg.name %>.min.css.map'
				},
				src: 'src/css/main.less',
				dest: '<%= dir.prod %>/css/<%= pkg.name %>.min.css'
			}
		},

		/**
		 * `jshint` defines the rules of our linter as well as which files we
		 * should check. This file, all javascript sources, and all our unit tests
		 * are linted based on the policies listed in `options`. But we can also
		 * specify exclusionary patterns by prefixing them with an exclamation
		 * point (!); this is useful when code comes from a third party but is
		 * nonetheless inside `src/`.
		 */
		jshint: {
			src: [ 
				'<%= src.app %>'
			],
			gruntfile: [
				'Gruntfile.js'
			],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},

		/**
		 * HTML2JS is a Grunt plugin that takes all of your template files and
		 * places them into JavaScript files as strings that are added to
		 * AngularJS's template cache. This means that the templates too become
		 * part of the initial payload as one JavaScript file. Neat!
		 */
		html2js: {
			/**
			 * These are the templates from `src/app`.
			 */
			app: {
				options: {
					base: 'src/app'
				},
				src: [ '<%= src.templates %>' ],
				dest: '<%= dir.dev %>/app/templates-app.js'
			}
		},

		/**
		 * The `index` task compiles the `index.html` file as a Grunt template. CSS
		 * and JS files co-exist here but they get split apart later.
		 */
		index: {

			/**
			 * During development, we don't want to have wait for compilation,
			 * concatenation, minification, etc. So to avoid these steps, we simply
			 * add all script files directly to the `<head>` of `index.html`. The
			 * `src` property contains the list of included files.
			 */
			build: {
				dir: '<%= dir.dev %>',
				src: [
					'<%= dir.dev %>/css/boilerplate.css',
					'<%= dir.dev %>/lib/js/angulartics-ga.min.js',
                    '<%= dir.dev %>/lib/js/angulartics.min.js',
                    '<%= dir.dev %>/lib/js/angular-ui-router.min.js',
                    '<%= dir.dev %>/lib/js/lodash.min.js',
                    '<%= dir.dev %>/lib/js/ui-bootstrap-tpls-0.13.0.min.js',
                    '<%= dir.dev %>/lib/js/bootbox.min.js',
					//'<%= dir.dev %>/lib/js/angular-ui-router.min.js',
					//'<%= dir.dev %>/lib/js/ui-bootstrap-tpls-0.6.0.min.js',
					//'<%= dir.dev %>/lib/js/ui-utils.min.js',
					//'<%= dir.dev %>/lib/js/d3.v3.min.js',
					//'<%= dir.dev %>/lib/js/underscore.min.js',
					'<%= dir.dev %>/app/*.js',
					'<%= dir.dev %>/app/**/*.js'
				]
			},

			/**
			 * When it is time to have a completely compiled application, we can
			 * alter the above to include only a single JavaScript and a single CSS
			 * file. Now we're back!
			 */
			compile: {
				dir: '<%= dir.prod %>',
				src: [
					'<%= less.compile.dest %>',
					'<%= concat.compile_lib.dest %>',
					'<%= concat.compile_app.dest %>'
				]
			}
		},

		shell: {
			jssrc: {
				command: 'rsync -avz --delete ./bin/dev/app/ "/var/www/azeem/dev/pw2/app"'
			},

			assets: {
				command: [
					'rsync -avz ./bin/dev/assets/ "/var/www/azeem/dev/pw2/assets"',
					'rsync -avz ./bin/dev/api/ "/var/www/azeem/dev/pw2/api"',
					'rsync -avz ./bin/dev/lib/ "/var/www/azeem/dev/pw2/lib"'
				].join(';')
			},

			html: {
				command: 'rsync -avz ./bin/dev/index.html "/var/www/azeem/dev/pw2/index.html"'
			},

			tpls: {
				command: 'rsync -avz ./bin/dev/app/templates-app.js "/var/www/azeem/dev/pw2/app/templates-app.js"'
			},

			less: {
				command: 'rsync -avz --delete ./bin/dev/css/ "/var/www/azeem/dev/pw2/css"'
			}
		},

		/**
		 * And for rapid development, we have a watch set up that checks to see if
		 * any of the files listed below change, and then to execute the listed 
		 * tasks when they do. This just saves us from having to type "grunt" into
		 * the command-line every time we want to see what we're working on; we can
		 * instead just leave "grunt watch" running in a background terminal. Set it
		 * and forget it, as Ron Popeil used to tell us.
		 *
		 * But we don't need the same thing to happen for all the files. 
		 */
		delta: {
			/**
			 * By default, we want the Live Reload to work for all tasks; this is
			 * overridden in some tasks (like this file) where browser resources are
			 * unaffected. It runs by default on port 35729, which your browser
			 * plugin should auto-detect.
			 * If this works, it should pick a random port number between 10,000 and 60,000
			 */
			options: {
				livereload: Math.random()*50000+10000
			},

			/**
			 * When the Gruntfile changes, we just want to lint it. In fact, when
			 * your Gruntfile changes, it will automatically be reloaded!
			 */
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: [ 'jshint:gruntfile' ],
				options: {
					livereload: false
				}
			},

			/**
			 * When our JavaScript source files change, we want to run lint them and
			 * run our unit tests.
			 */
			jssrc: {
				files: [ 
					'src/<%= src.app %>'
				],
				tasks: [ 'jshint:src', 'copy:build_appjs', 'shell:jssrc' ]
			},

			/**
			 * When assets are changed, copy them. Note that this will *not* copy new
			 * files, so this is probably not very useful.
			 */
			assets: {
				files: [ 
					'src/assets/**/*',
                    'src/config/**/*',
                    'src/lib/**/*',
					'src/api/*'
				],
				tasks: [ 'copy:build_static', 'shell:assets' ]
			},

			/**
			 * When index.html changes, we need to compile it.
			 */
			html: {
				files: [ 'src/<%= src.html %>' ],
				tasks: [ 'index:build', 'shell:html' ]
			},

			/**
			 * When our templates change, we only rewrite the template cache.
			 */
			tpls: {
				files: [ 
					'<%= src.templates %>'
				],
				tasks: [ 'html2js', 'shell:tpls' ]
			},

			/**
			 * When the CSS files change, we need to compile and minify them.
			 */
			less: {
				files: [ 'src/**/*.less', 'src/**/*.css' ],
				tasks: [ 'less:build', 'shell:less' ]
			}

		}
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	/**
	 * In order to make it safe to just compile or copy *only* what was changed,
	 * we need to ensure we are starting from a clean, fresh build. So we rename
	 * the `watch` task to `delta` (that's why the configuration var above is
	 * `delta`) and then add a new task called `watch` that does a clean build
	 * before watching for changes.
	 */
	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [ 'build', 'delta' ] );

	/**
	 * The default task is to build and compile.
	 */
	grunt.registerTask( 'default', [ 'build', 'compile' ] );

	/**
	 * The `build` task gets your app ready to run for development and testing.
	 */
	grunt.registerTask( 'build', [
		'clean', 'html2js', 'less:build',
		'copy:build_static', 'copy:build_appjs', 'copy:build_libjs',
		'index:build'
	]);

	/**
	 * The `compile` task gets your app ready for deployment by concatenating and
	 * minifying your code.
	 */
	grunt.registerTask( 'compile', [
		'less:compile', 'copy:compile_static', 'ngmin', 'concat', 'uglify', 'index:compile'
	]);

	/**
	 * A utility function to get all app JavaScript sources.
	 */
	function filterForJS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.js$/ );
		});
	}

	/**
	 * A utility function to get all app CSS sources.
	 */
	function filterForCSS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.css$/ );
		});
	}

	/** 
	 * The index.html template includes the stylesheet and javascript sources
	 * based on dynamic names calculated in this Gruntfile. This task assembles
	 * the list into variables for the template to use and then runs the
	 * compilation.
	 */
	grunt.registerMultiTask( 'index', 'Process index.html template', function () {
		var dirRE = new RegExp( '^('+grunt.config('dir.dev')+'|'+grunt.config('dir.prod')+')\/', 'g' );
		var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
			return file.replace( dirRE, '' );
		});
		var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
			return file.replace( dirRE, '' );
		});

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
			process: function ( contents, path ) {
				return grunt.template.process( contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config( 'pkg.version' )
					}
				});
			}
		});
	});
};
