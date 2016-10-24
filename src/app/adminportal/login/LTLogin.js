/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.login',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.adminportal.login.requestaccount',
	'platform-ui.adminportal.login.page',
	'platform-ui.adminportal.login.forgotpassword',
	'platform-ui.adminportal.login.forgotusername',
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('ltlogin.default', {
			url: '',
			views: {
				'ltlogin': {
					controller: 'LTLoginPageController',
					templateUrl: 'adminportal/login/loginpage/loginpage.html'
				}
			}
		}).state('ltlogin.page', {
			url: '',
			views: {
				'ltlogin': {
					controller: 'LTLoginPageController',
					templateUrl: 'adminportal/login/loginpage/loginpage.html'
				}
			}
		}).state('ltlogin.requestaccount', {
			url: '/requestaccount',
			views: {
				'ltlogin': {
					controller: 'RequestAccountController',
					templateUrl: 'adminportal/login/requestaccount/requestaccount.html'
				}
			}
		}).state('ltlogin.forgotpassword', {
			abstract: true,
			url: '/forgotpassword',
			views: {
				'ltlogin': {
					controller: 'ForgotpwdController',
					templateUrl: 'adminportal/login/forgotpassword/forgotpassword.html'
				}
			}
		}).state('ltlogin.forgotusername', {
			abstract: true,
			url: '/forgotusername',
			views: {
				'ltlogin': {
					controller: 'ForgotUsernameController',
					templateUrl: 'adminportal/login/forgotusername/forgotusername.html'
				}
			}
		});
	});

