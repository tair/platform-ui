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
										'Access rules for Paid and Login-Required resources identified by regular expressions' 
										]
							},
							/*
							 * parties : { id : 'parties', heading : 'Parties', },
							 * credentials : { id : 'credentials', heading :
							 * 'Credentials', }, subscriptions : { id :
							 * 'subscriptions', heading : 'Subscriptions', },
							 * meters : { id : 'meters', heading : 'Meters', },
							 * authorizations : { id : 'authorizations', heading :
							 * 'Authorizations', }, sessionlogs : { id :
							 * 'sessionlogs', heading : 'Session Logs', },
							 */
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
										'Parameters are either query parameters in the URI string or body parameters in the content of the POST or PUT request'
										]
							},
						},
					}
				} ]);
