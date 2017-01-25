/**
 * Landing Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.landing')
		.factory(
				/* Name */
				'LandingModel',

				/* Dependencies */
				[ function() {
					return {
						title : 'Default',
						api : 'def',
						apis : {
							partners : {
								id : 'partners',
								heading : 'Partners',
								description : 'A partner is a scientific data or informatics system that makes up a unit for subscription, authentication, and authorization.',
								elements : [
										'URI regular expressions for partner URIs',
										'Subscription terms with period, price, and group discount percentage',
										'Branding elements including logo, subscription information, and email text',
										'Access rules for Paid and Login-Required resources identified by regular expressions', ]
							},
							credentials : {
								id : 'credentials',
								heading : 'Credentials',
								description : 'A credential is a username used to authenticate a party to the API.',
								elements : [
										'Currently, a credential applies to a single party for a given partner.',
										'Credentials have a party id, username, password, email, partner ID, and user identifier as well as optional information.',
										'Passwords are encrypted in the API database.',
										'Credentials usually get created through partner registration features. The user identifier is the partner identifier for the user.',
										'Credentials get imported from partners when partners integrate with the paywall API.',
										'When the API supplies credential information in JSON objects, it suppresses the password or encrypts it; you never see a cleartext password in a response.',
										'Specifying the phoenix partner creates a credential for the Phoenix Admin Portal.',
										'A user can log in with the credential information.',
										'A user can reset their password.',
										'A user can update password and username as part of a profile.',
										'A user can get the usernames associated with an email address.', ]
							},
							parties : {
								id : 'parties',
								heading : 'Parties',
							},
							subscriptions : {
								id : 'subscriptions',
								heading : 'Subscriptions',
							},
							meters : {
								id : 'meters',
								heading : 'Meters',
							},
							authorizations : {
								id : 'authorizations',
								heading : 'Authorizations',
								description : 'Authorizations determine access to resources for users.',
								elements : [
										'Access patterns are regular expressions that match to a set of partner URIs.',
										'Access types are kinds of access, such as Paid or Login (requires login).',
										'Access rules map an access pattern to an access type and parter; the rule specifies which resources have what kind of access requirements such as requiring login or requiring a subscription.',
										'The paywall can determine the status of a specific URI given the request URI, the requesting IP address, and the authentication status of the user.',
										'The paywall can separately determine status for subscription and for authentication.' ]
							},
							sessionlogs : {
								id : 'sessionlogs',
								heading : 'Session Logs',
							},
							def : {
								id : 'default',
								heading : 'SMS REST API',
								description : 'The Subscription Management System (SMS) REST API gives you a complete system for subscription management.',
								elements : [
										'SMS resources include partners, parties, credentials, subscriptions, meters, authorizations, and session logs.',
										'The API calls are Uniform Resource Identifiers (URIs) that identify resources or actions. You can use the GET, POST, PUT, and DELETE HTTP operations to query, create, update, or delete the resources, respectively.',
										'It is good practice to always end a path with / before the query parameters, as in /credentials/login/?partnerId=biocyc',
										'The substitution value {id} is a unique integer identifier for an object, used throughout the documentation. The {id} for a partner is a string name rather than a number.',
										'You submit new and updated data values in the body of the POST or PUT operations in form-data or form-urlencoded format. For PUT updates, you must supply all the data fields for the object in the body.',
										'Most API calls require authentication. See the Credentials API for more information. You must be authenticated as a registered user through one of the partner registration systems.',
										'When a call succeeds, it returns a 200 HTTP code (201 for POST); when it fails, it returns 200 (with message) or 400 (with no message)',
										'Parameters are either query parameters in the URI string or body parameters in the content of the POST or PUT request' ]
							},
						},
					}
				} ]);
