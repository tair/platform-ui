/**
 * Api Doc Module
 */

angular
		.module(
				/* Name */
				'platform-ui.contentaccess.apidoc',

				/* Dependencies */
				[ 'ui.router', 'service.title',

				'platform-ui.contentaccess.apidoc.landing',
						'platform-ui.contentaccess.apidoc.partners',
						/*'platform-ui.contentaccess.apidoc.parties',
						'platform-ui.contentaccess.apidoc.credentials',
						'platform-ui.contentaccess.apidoc.subscriptions',
						'platform-ui.contentaccess.apidoc.meters',
						'platform-ui.contentaccess.apidoc.authorizations',
						'platform-ui.contentaccess.apidoc.sessionlogs', */])
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'apidoc.landing',
									{
										url : '',
										views : {
											'apidoc' : {
												controller : 'LandingController',
												templateUrl : 'contentaccess/apidoc/landing/landing.html'
											}
										}
									})
							.state(
									'apidoc.partners',
									{
										abstract : true,
										url : '/partners',
										views : {
											'apidoc' : {
												controller : 'PartnersController',
												templateUrl : 'contentaccess/apidoc/partners/partners.html'
											}
										}
									})
							/*.state(
									'apidoc.parties',
									{
										abstract : true,
										url : '/parties',
										views : {
											'apidoc' : {
												controller : 'PartiesController',
												templateUrl : 'contentaccess/apidoc/parties/parties.html'
											}
										}
									})
							.state(
									'apidoc.credentials',
									{
										abstract : true,
										url : '/credentials',
										views : {
											'apidoc' : {
												controller : 'CredentialsController',
												templateUrl : 'contentaccess/apidoc/credentials/credentials.html'
											}
										}
									})
							.state(
									'apidoc.subscriptions',
									{
										abstract : true,
										url : '/subscriptions',
										views : {
											'apidoc' : {
												controller : 'SubscriptionsController',
												templateUrl : 'contentaccess/apidoc/subscriptions/subscriptions.html'
											}
										}
									})
							.state(
									'apidoc.meters',
									{
										abstract : true,
										url : '/meters',
										views : {
											'apidoc' : {
												controller : 'MetersController',
												templateUrl : 'contentaccess/apidoc/meters/meters.html'
											}
										}
									})
							.state(
									'apidoc.authorizations',
									{
										abstract : true,
										url : '/authorizations',
										views : {
											'apidoc' : {
												controller : 'AuthorizationsController',
												templateUrl : 'contentaccess/apidoc/authorizations/authorizations.html'
											}
										}
									})
							.state(
									'apidoc.sessionlogs',
									{
										abstract : true,
										url : '/sessionlogs',
										views : {
											'apidoc' : {
												controller : 'SessionlogsController',
												templateUrl : 'contentaccess/apidoc/sessionlogs/sessionlogs.html'
											}
										}
									})*/;
				});
