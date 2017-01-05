/**
 * API Doc Controller
 */

angular
		.module('platform-ui.contentaccess.apidoc')
		.controller(
				/* Name */
				'ApiDocController',

				/* Dependencies */
				[
						'$http',
						'$scope',
						'$location',
						// '$cookies',
						'$state',
						'Title',
						'ApiDocModel',

						/* Controller Definition */
						function($http, $scope, $location, $state, Title,
								ApiDocModel) {
							init();
							console.log($state);

							$scope.switchTab = function(tabName) {
								// $scope.currentTab = tabName;
								if (tabName == "landing") {
									$state.go("apidoc.landing", {
										partnerId : $scope.partnerId,
										redirect : $scope.redirect
									});
									console.log($state);
									return;
								}
							};

							$scope.listInstitution = function($event) {
								$scope.currentTab = 'listTab';
								$event.preventDefault();
							}
							function getPartnerUriFromRedirect() {
								console
										.log("$scope.redirectNoEncode (before split)="
												+ $scope.redirect); // PW-218
								arr = $scope.redirect.split("/");
								console.log("arr (after split)=" + arr[0]
										+ "//" + arr[2]); // PW-218
								return arr[0] + "//" + arr[2];
							}

							function init() {
								Title.setTitle(ApiDocModel.title);// PW-264
								$scope.initialheading = ApiDocModel.initialheading;
								$scope.currentTab = ApiDocModel.currentTab;
								$scope.tabs = ApiDocModel.tabs;
								$scope.templates = ApiDocModel.templates;
								$scope.partnerId = $location.search()['partnerId'];// TODO:
																					// need
																					// to
																					// use
																					// $stateParams
																					// in
																					// the
																					// future
								$scope.partner = ApiDocModel.partner;
								$scope.institutions = ApiDocModel.institutions;
								$scope.countries = ApiDocModel.countries;
								$scope.redirect = $scope.getRedirectNoEncode();
								$scope.redirect = decodeURIComponent($scope.redirect);
								$scope.redirectNoEncode = $scope
										.getRedirectNoEncode();
								$scope.domain = getPartnerUriFromRedirect();
								$http(
										{
											url : $scope.apiUri
													+ '/partners/?partnerId='
													+ $scope.partnerId,
											method : 'GET',
										})
										.success(
												function(data, status, headers,
														config) {
													$scope.partner = data[0];
												});
								$http(
										{
											url : $scope.apiUri
													+ '/parties/organizations/', // needed
																					// for
																					// PW-266
											method : 'GET',
										})
										.success(
												function(data, status, headers,
														config) {
													$scope.institutions = data;
												});
								$http(
										{
											url : $scope.apiUri
													+ '/parties/countries/',
											method : 'GET',
										})
										.success(
												function(data, status, headers,
														config) {
													$scope.countries = data
															.sort();
												});
							}
						} ]);
