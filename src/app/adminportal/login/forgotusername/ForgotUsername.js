/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.login.forgotusername',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.adminportal.login.forgotusername.thankyou',
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('ltlogin.forgotpassword.sendlink', {
			url: '',
			views: {
				'forgotUsername': {
					controller: 'ForgotUsernameController',
					templateUrl: 'adminportal/login/forgotusername/sendlink/sendlink.html'
				}
			}
		}).state('ltlogin.forgotpassword.thankyou', {
			url: '/thankyou?email',
			views: {
				'forgotUsername': {
					controller: 'ForgotUsernameTyController',
					templateUrl: 'adminportal/login/forgotusername/thankyou/thankyou.html'
				}
			}
		});
	});

