/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.login.forgotpassword',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.adminportal.login.forgotpassword.thankyou',
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('ltlogin.forgotpassword.sendlink', {
			url: '',
			views: {
				'forgotPwd': {
					controller: 'ForgotpwdController',
					templateUrl: 'adminportal/login/forgotpassword/sendlink/sendlink.html'
				}
			}
		}).state('ltlogin.forgotpassword.thankyou', {
			url: '/thankyou?email',
			views: {
				'forgotPwd': {
					controller: 'ForgotpwdTyController',
					templateUrl: 'adminportal/login/forgotpassword/thankyou/thankyou.html'
				}
			}
		});
	});

