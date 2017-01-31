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
								description : 'A party is an entity that plays a role in the Phoenix system.',
								elements : [
										'A party may be a user, an organization, a consortium, a partner, a staff member, or an admin.',
										'The party is the subject of authentication by the paywall system; see the Credential documentation for details.',
										'The party type defines the role of the party in the system and hence what API calls the party may execute.',
										'Parties may have linked IP addresses that serve as the basis for subscription access to partners.',
										'Parties may have a designated country.',
										'Parties may affiliate to one or more consortiums.',
										'The system tracks partner resource usage by party when the party authenticates.', ]
							},
							subscriptions : {
								id : 'subscriptions',
								heading : 'Subscriptions',
								description : 'A subscription associates a party with a partner for a period of time and allows access to Paid resources.',
								elements : [
										'A subscription is a relationship between a party and a partner with a start date and an end date.',
										'The subscription expires on the end date.', 
										'Every subscription has a series of transactions tracking creation, renewal, and termination events.', 
										'Individual subscriptions use activation codes entered through the partner web site, allowing purchase of multiple subscriptions in a simple transaction.', 
										'Commercial and institutional subscriptions require customized licenses; the API lets you request Phoenix assistance with that.']
							},
							meters : {
								id : 'meters',
								heading : 'Meters',
								description : 'A meter limit imposes a usage limit on parties accessing partner resources without subscriptions.',
								elements : [
										'Limit values are a sequence of access counts that specify a count at which to display a meter warning.',
										'The last limit value in the sequence is the access count at which to block access.',
										'The sequence lets you specify a series of warnings at specific counts, then a block.',
										'Metering works on the basis of requests made by a specific IP address for Paid resources; free resources are not metered.',
										'Meter counts are reset at the beginning of each month.',
										'The API lets you manage limits, increment access counts for an IP address, and query status of specific IP addresses.',
										'The meter blacklist permits a partner to exclude certain Paid resources from metering; blacklisted resources require a subscription for access.',
										'The meter blacklist specifies sets of blacklisted resources with Python regular expressions.', ]
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
										'The paywall can separately determine status for subscription and for authentication.', ]
							},
							sessionlogs : {
								id : 'sessionlogs',
								heading : 'Session Logs',
								description : 'A session log is a log of page views in a session. Page views are single accesses of a partner resource.',
								elements : [
										'A page view is a single access of a partner resource, as represented by a URI.',
										'A session is a collection of page views identified by the partner as a single entity.',
										'Logs include only the non-embedded resource accesses, not images, css or js files, or other embedded resources.', ]
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
										'Parameters are either query parameters in the URI string or body parameters in the content of the POST or PUT request', ]
							},
						},
					}
				} ]);
