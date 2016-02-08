/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.login.forgotpassword',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.login.forgotpassword.thankyou',
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('ltlogin.forgotpassword.sendlink', {
			url: '',
			views: {
				'forgotPwd': {
					controller: 'ForgotpwdController',
					templateUrl: 'librariantool/login/forgotpassword/sendlink/sendlink.html'
				}
			}
		}).state('ltlogin.forgotpassword.thankyou', {
			url: '/thankyou?email',
			views: {
				'forgotPwd': {
					controller: 'ForgotpwdTyController',
					templateUrl: 'librariantool/login/forgotpassword/thankyou/thankyou.html'
				}
			}
		});
	});

