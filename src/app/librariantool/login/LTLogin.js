/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.login',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.login.requestaccount',
	'platform-ui.librariantool.login.page',
	'platform-ui.librariantool.login.forgotpassword',
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('ltlogin.default', {
			url: '',
			views: {
				'ltlogin': {
					controller: 'LTLoginPageController',
					templateUrl: 'librariantool/login/loginpage/loginpage.html'
				}
			}
		}).state('ltlogin.page', {
			url: '',
			views: {
				'ltlogin': {
					controller: 'LTLoginPageController',
					templateUrl: 'librariantool/login/loginpage/loginpage.html'
				}
			}
		}).state('ltlogin.requestaccount', {
			url: '/requestaccount',
			views: {
				'ltlogin': {
					controller: 'RequestAccountController',
					templateUrl: 'librariantool/login/requestaccount/requestaccount.html'
				}
			}
		}).state('ltlogin.forgotpassword', {
			abstract: true,
			url: '/forgotpassword',
			views: {
				'ltlogin': {
					controller: 'ForgotpwdController',
					templateUrl: 'librariantool/login/forgotpassword/forgotpassword.html'
				}
			}
		});
	});

