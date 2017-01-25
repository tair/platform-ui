/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.authorizations.doc')
		.factory(
				/* Name */
				'AuthorizationsDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Authorizations API',
						overview : 'The Authorizations API manages the set of access rules for partner data. URI patterns are regular-expression patterns that identify sets of URIs for access control. Access types are specific kinds of access, such as Paid or Login (login-required access). An access rule maps a URI pattern to a partner and access type to control access to the set of resources identified by the pattern.',
						datatypes : [ {
							name : 'Pattern',
							fields : [ {
								name : 'patternId',
								type : 'Number (generated)',
								description : 'The unique identifier for the pattern',
							}, {
								name : 'pattern',
								type : 'String',
								description : 'A Python regular expression that identifies a distinct and mutually exclusive set of URIs to associate with one access type; see https://docs.python.org/2/library/re.html for details on Python regular expressions',
							}, ],
						}, {
							name : 'AccessType',
							fields : [ {
								name : 'accessTypeId',
								type : 'Number (generated)',
								description : 'The unique identifier for the access type',
							}, {
								name : 'name',
								type : 'String',
								description : 'The type name (for example, "Paid", "Login")',
							}, ],
						}, {
							name : 'AccessRule',
							fields : [ {
								name : 'accessRuleId',
								type : 'Number',
								description : 'The unique identifier for the access rule',
							}, {
								name : 'patternId',
								type : 'Number',
								description : 'The unique identifier for the pattern that identifies the resources to which the rule applies',
							}, {
								name : 'accessTypeId',
								type : 'Number',
								description : 'The unique identifier for the kind of access to enforce with the rule',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for the partner to which the rule applies',
							}, ],
						}, {
							name : 'Access',
							fields : [ {
								name : 'status',
								type : 'String',
								description : 'The access status of the URI for an IP address, partner, and authentication state: OK, NeedLogin, NeedSubscription',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'The optional unique identifier for a party in the partner system; null if party is not authenticated',
							},  /*{
							name : '',
							fields : [ {
								name : '',
								type : '',
								description : '',
							}, {
								name : '',
								type : '',
								description : '',
							}, ],
						}, */ ],
						calls : [ {
							header : 'Get All the URI Patterns',
							summary : 'Get all the URI patterns from the database.',
							op : 'GET',
							uri : '/authorizations/patterns/',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of Pattern objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/patterns/',
						}, /*{
							header : 'Get a URI Pattern',
							summary : 'Get a URI pattern specified by pattern id',
							op : 'GET',
							uri : '/authorizations/patterns/?patternId={id}',
							parameters : [ {
								name : 'patternId',
								type : 'Number',
								description : 'The unique identifier for the pattern',
							}, ],
							body_parameters : [],
							returns : 'an Array of Pattern objects with a single object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/patterns/&patternId=12345',
						},*/ {
							header : 'Create a Pattern',
							summary : 'Creates a regular-expression URI pattern that identifies a set of URIs',
							op : 'POST',
							uri : '/authorizations/patterns/',
							parameters : [],
							body_parameters : [{
								name : 'pattern',
								type : 'String',
								description : 'A Python regular expression that identifies a distinct and mutually exclusive set of URIs to associate with one access type; see https://docs.python.org/2/library/re.html for details on Python regular expressions',
							}, ],
							returns : 'A Pattern object',
							errors : [{code : '400', message : '{"error": "POST method:pattern is required as form-data"}', explanation : 'The request did not contain a pattern field.', resolution : 'Supply a valid, form-encoded pattern field in the request entity.'}],
							example : 'https://pwapi.arabidopsis.org/authorizations/patterns/',
						}, {
							header : 'Update a Pattern',
							summary : 'Updates the pattern specified by id.',
							op : 'PUT',
							uri : '/authorizations/patterns/&patternId={id}',
							parameters : [ {
								name : 'patternId',
								type : 'Number',
								description : 'The unique identifier for the pattern',
							}, ],
							body_parameters : [{
								name : 'pattern',
								type : 'String',
								description : 'A Python regular expression that identifies a distinct and mutually exclusive set of URIs to associate with one access type; see https://docs.python.org/2/library/re.html for details on Python regular expressions',
							}, ],
							returns : 'a Pattern object with the updated pattern',
							errors : [{code : '400', message : '{"error":"PUT method:patternId is required as URL parameter"}', explanation : 'There was no query parameter on the URI to limit the scope of the update', resolution : 'Add a query parameter such as patternId to the request.'}, 
							          {code : '400', message : '{"error":"PUT method:pattern is required as form-data"}', explanation : 'There was no pattern field in the request entity', resolution : 'Add a valid, form-encoded pattern field to the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/authorizations/patterns/&patternId=12345',
						}, {
							header : 'Delete a Pattern',
							summary : 'Deletes a pattern specified by id',
							op : 'DELETE',
							uri : '/authorizations/patterns/&patternId={id}',
							parameters : [ {
								name : 'patternId',
								type : 'Number',
								description : 'The unique identifier for the pattern',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '400', message : '{"error":"DELETE method:patternId is required as URL parameter"}', explanation : 'There was no query parameter on the URI to limit the scope of the delete', resolution : 'Add a query parameter such as patternId to the request'}],
							example : 'https://pwapi.arabidopsis.org/authorizations/patterns/&patternId=12345',
						}, {
							header : 'Get All the Access Types',
							summary : 'Get all the access types from the database.',
							op : 'GET',
							uri : '/authorizations/accessTypes/',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of AccessType objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessTypes/',
						}, /*{
							header : 'Get an Access Type',
							summary : 'Get an access type specified by access type id',
							op : 'GET',
							uri : '/authorizations/accessType/?accessTypeId={id}',
							parameters : [ {
								name : 'accessTypeId',
								type : 'Number',
								description : 'The unique identifier for the access type',
							}, ],
							body_parameters : [],
							returns : 'an Array of Access Type objects with a single object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessType/&accessTypeId=12345',
						},*/ {
							header : 'Create an Access Type',
							summary : 'Creates a name for a particular kind of URI access in the paywall',
							op : 'POST',
							uri : '/authorizations/accessTypes/',
							parameters : [],
							body_parameters : [{
								name : 'name',
								type : 'String',
								description : 'A name for a particular kind of access to apply to sets of URIs specified by URI pattern',
							}, ],
							returns : 'an AccessType object',
							errors : [{code : '400', message : '{"error": "POST method:name is required as form-data"}', explanation : 'The request did not contain a name field.', resolution : 'Supply a valid, form-encoded name field in the request entity.'}],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessTypes/',
						}, {
							header : 'Update an Access Type',
							summary : 'Updates the type name specified by id.',
							op : 'PUT',
							uri : '/authorizations/accessTypes/&accessTypeId={id}',
							parameters : [ {
								name : 'accessTypeId',
								type : 'Number',
								description : 'The unique identifier for the access type',
							}, ],
							body_parameters : [{
								name : 'name',
								type : 'String',
								description : 'A name for a particular kind of access to apply to sets of URIs specified by URI pattern',
							}, ],
							returns : 'an AccessType object with the updated type name',
							errors : [{code : '400', message : '{"error":"PUT method:accessTypeId is required as URL parameter"}', explanation : 'There was no query parameter on the URI to limit the scope of the update', resolution : 'Add a query parameter such as patternId to the request.'}, 
							          {code : '400', message : '{"error":"PUT method:name is required as form-data"}', explanation : 'There was no name field in the request entity', resolution : 'Add a valid, form-encoded name field to the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessTypes/&accessTypeId=12345',
						}, {
							header : 'Delete an Access Type',
							summary : 'Deletes an access type specified by id',
							op : 'DELETE',
							uri : '/authorizations/accessTypes/&accessTypeId={id}',
							parameters : [ {
								name : 'accessTypeId',
								type : 'Number',
								description : 'The unique identifier for the access type',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '400', message : '{"error":"DELETE method:accessTypeId is required as URL parameter"}', explanation : 'There was no query parameter on the URI to limit the scope of the delete', resolution : 'Add a query parameter such as patternId to the request'}],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessTypes/&accessTypeId=12345',
						}, {
							header : 'Get All the Access Rules',
							summary : 'Get all the access rules from the database.',
							op : 'GET',
							uri : '/authorizations/accessRules/',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of AccessRule objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessRules/',
						}, /*{
							header : 'Get an Access Rule',
							summary : 'Get an Access Rule specified by access rule id',
							op : 'GET',
							uri : '/authorizations/accessRules/?accessRuleId={id}',
							parameters : [ {
								name : 'accessRuleId',
								type : 'Number',
								description : 'The unique identifier for the access rule',
							}, ],
							body_parameters : [],
							returns : 'an Array of AccessRule objects with a single object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessRules/&accessRuleId=12345',
						},*/ {
							header : 'Create an Access Rule',
							summary : 'Creates an access rule that maps a URI pattern to a partner and access type',
							op : 'POST',
							uri : '/authorizations/accessRules/',
							parameters : [],
							body_parameters : [{
								name : 'patternId',
								type : 'Number',
								description : 'The unique identifier for a URI pattern that identifies the set of resources subject to the access rule',
							}, {
								name : 'accessTypeId',
								type : 'Number',
								description : 'The unique identifier for the kind of access to enforce',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for the partner',
							}, ],
							returns : 'A Pattern object',
							errors : [{code : '400', message : '{"error": "POST method:pattern is required as form-data"}', explanation : 'The request did not contain a pattern field.', resolution : 'Supply a valid pattern field in the request entity.'}],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessRules/',
						}, {
							header : 'Update an Access Rule',
							summary : 'Updates the access rule specified by id.',
							op : 'PUT',
							uri : '/authorizations/accessRules/&accessRuleId={id}',
							parameters : [ {
								name : 'accessRuleId',
								type : 'Number',
								description : 'The unique identifier for the access rule',
							}, ],
							body_parameters : [{
								name : 'patternId',
								type : 'Number',
								description : 'The unique identifier for a URI pattern that identifies the set of resources subject to the access rule',
							},  {
								name : 'accessTypeId',
								type : 'Number',
								description : 'The unique identifier for the kind of access to enforce',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for the partner',
							}, ],
							returns : 'an AccessRule object with the updated set of object ids',
							errors : [{code : '400', message : '{"error":"PUT method:accessTypeId is required as URL parameter"}', explanation : 'There was no query parameter on the URI to limit the scope of the update', resolution : 'Add an accessTypeId query parameter to the request.'}, 
							          {code : '400', message : '{"error":"PUT method:patternId is required as form-data"}', explanation : 'There was no patternId field in the request entity', resolution : 'Add a valid, form-encoded patternId field to the request.'},
							          {code : '400', message : '{"error":"PUT method:accessTypeId is required as form-data"}', explanation : 'There was no accessType field in the request entity', resolution : 'Add a valid, form-encoded accessTypeId field to the request.'},
							          {code : '400', message : '{"error":"PUT method:partnerId is required as form-data"}', explanation : 'There was no partnerId field in the request entity', resolution : 'Add a valid, form-encoded partnerId field to the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessRules/&patternId=12345',
						}, {
							header : 'Delete an Access Rule',
							summary : 'Deletes an access rule specified by id',
							op : 'DELETE',
							uri : '/authorizations/accessRules/&accessRuleId={id}',
							parameters : [ {
								name : 'accessRuleId',
								type : 'Number',
								description : 'The unique identifier for the access rule',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '400', message : '{"error":"DELETE method:accessRuleId is required as URL parameter"}', explanation : 'There was no accessRuleId query parameter on the URI to limit the scope of the delete', resolution : 'Add an accessTypeId query parameter to the request'}],
							example : 'https://pwapi.arabidopsis.org/authorizations/accessRules/&accessRuleId=12345',
						}, {
							header : 'Check Access for URI',
							summary : 'Check the access status for a URI given a partner, an IP address, and authentication state (transmitted through cookies); returns OK, NeedLogin, NeedSubscription',
							op : 'GET',
							uri : '/authorizations/access/?partnerId={id}&ip={ip-address}&url={encoded-string}',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for a partner',
							}, {
								name : 'ip',
								type : 'String',
								description : 'The V4 or V6 IP address of the original requestor',
							}, {
								name : 'url',
								type : 'String',
								description : 'The URL-encoded string identifying the resource to which access is requested',
							}, ],
							body_parameters : [],
							returns : 'an Access object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/authorizations/access/?partnerId=tair&url=http%3A%2F%2Fwww.arabidopsis.org%2Fcgi-bin%2Fbulk%2Fsequences%2F&ip=203.255.24.127',
						}, {
							header : 'Check Subscription Access',
							summary : 'Check the subscription-based access status for a URI given a partner, an IP address, and authentication state (transmitted through cookies); returns true or false; does not test authentication status',
							op : 'GET',
							uri : '/authorizations/subscriptions/',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for a partner',
							}, {
								name : 'ip',
								type : 'String',
								description : 'The V4 or V6 IP address of the original requestor',
							}, {
								name : 'url',
								type : 'String',
								description : 'The URL-encoded string identifying the resource to which access is requested',
							}, ],
							body_parameters : [],
							returns : '',
							errors : [],
							example : 'https://demoapi.arabidopsis.org/authorizations/subscriptions/?partnerId=tair&url=http%3A%2F%2Fwww.arabidopsis.org%2Fcgi-bin%2Fbulk%2Fsequences%2F&ip=203.255.24.127',
						}, {
							header : 'Check Authentication Access',
							summary : 'Check the authentication-based access status for a URI given a partner, an IP address, and authentication state (transmitted through cookies); returns true or false; does not test subscription status',
							op : 'GET',
							uri : '',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for a partner',
							}, {
								name : 'ip',
								type : 'String',
								description : 'The V4 or V6 IP address of the original requestor',
							}, {
								name : 'url',
								type : 'String',
								description : 'The URL-encoded string identifying the resource to which access is requested',
							}, ],
							body_parameters : [],
							returns : 'a TrueFalseAccess object',
							errors : [],
							example : 'https://demoapi.arabidopsis.org/authorizations/authentications/?partnerId=tair&url=http%3A%2F%2Fwww.arabidopsis.org%2Fcgi-bin%2Fbulk%2Fsequences%2F&ip=203.255.24.127',
						}, /*{
						header : '',
						summary : '',
						op : 'GET',
						uri : '',
						parameters : [ {
							name : '',
							type : '',
							description : '',
						}, {
							name : '',
							type : '',
							description : '',
						}, ],
						body_parameters : [],
						returns : '',
						errors : [{code : '400', message : '', explanation : '', resolution : ''}],
						example : '',
					}, */]
					}
				} ]);
