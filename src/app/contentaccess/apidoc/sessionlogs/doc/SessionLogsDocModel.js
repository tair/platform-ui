/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.sessionlogs.doc')
		.factory(
				/* Name */
				'SessionLogsDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Session Logs API',
						overview : 'A session log is a log of page views in a session. Page views are single accesses of a partner resource. The first access in a session usually generates the session id, so it is not associated with the session in the session logs. Each page view contains the URI, the IP address of the requestor, and optionally a party id if the party is authenticated. Session counts are counts of sessions based on filter criteria.',
						datatypes : [ {
							name : 'PageView',
							fields : [ {
								name : 'pageViewId',
								type : 'Number (generated)',
								description : 'Unique identifier for the page view',
							}, {
								name : 'uri',
								type : 'String',
								description : 'The URI identifying the resource to access',
							}, {
								name : 'pageViewDate',
								type : 'Date',
								description : 'The date and time of the page view; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Optional, unique identifier for the authenticated party requesting the resource',
							}, {
								name : 'sessionId',
								type : 'String',
								description : 'Optional, unique identifier for the server session containing the page view',
							}, {
								name : 'ip',
								type : 'String',
								description : 'IPv4 or IPv6 IP address of the requestor',
							}, ],
						}, /*{
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
							header : 'Get All Page Views',
							summary : 'Gets all the page views in the database. This may be millions of rows, please be patient.',
							op : 'GET',
							uri : '/session-logs/page-views/',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of PageView objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/session-logs/page-views/',
						}, {
							header : 'Get a Set of Page Views By Filter',
							summary : 'Gets a set of page views by matching the query parameter values; startDate and EndDate do greater-than and less-than comparisons, other parameters use equality comparisons.',
							op : 'GET',
							uri : '/session-logs/page-views/?pageViewId={id}&startDate={date}&endDate={date}&pageViewDate={date}&ip={string}&uri={string}&partyId={id}&sessionId={string}',
							parameters : [ {
								name : 'pageViewId',
								type : 'Number',
								description : 'Unique identifier for the page view',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'The date and time after which the page view occurred, inclusive (greater-than comparison); format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'The date and time before which the page view occurred, inclusive (less-than comparison); format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'pageViewDate',
								type : 'Date',
								description : 'The date and time of the page view; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'ip',
								type : 'String',
								description : 'IPv4 or IPv6 IP address of the requestor',
							}, {
								name : 'uri',
								type : 'String',
								description : 'The URI identifying the resource to access',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the authenticated party requesting the resource',
							}, {
								name : 'sessionId',
								type : 'String',
								description : 'Unique identifier for the server session containing the page view',
							}, ],
							body_parameters : [],
							returns : 'an Array of PageView objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/session-logs/page-views/?startDate=2017-02-03T10:00:00Z&endDate=2017-02-03T11:00:00Z',
						}, {
							header : 'Log a Page View',
							summary : 'Log a page view in the session logs.',
							op : 'POST',
							uri : '/session-logs/page-views/',
							parameters : [],
							body_parameters : [{
								name : 'pageViewDate',
								type : 'Date',
								description : 'The date and time of the page view; format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'ip',
								type : 'String',
								description : 'IPv4 or IPv6 IP address of the requestor (required)',
							}, {
								name : 'uri',
								type : 'String',
								description : 'The URI identifying the resource to access (required)',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the authenticated party requesting the resource',
							}, {
								name : 'sessionId',
								type : 'String',
								description : 'Unique identifier for the server session containing the page view; usually application server session id',
							}, ],
							returns : 'the created PageView object with a 201 code',
							errors : [{code : '400', message : '{"uri":["This field is required."],"ip":["This field is required."]}', explanation : 'One or more of the required body parameters is not in the request body.', resolution : 'Supply valid, form-encoded values for all required body parameters.'}, ],
							example : 'https://pwapi.arabidopsis.org/session-logs/page-views/',
						}, {
							header : 'Get Session Counts By Filter',
							summary : 'Get counts for all sessions that match a set of filter query parameters. All parameters are optional, but getting all counts returns a lot of data and may time out.',
							op : 'GET',
							uri : '/sessions/counts/?startDate={date}&endDate={date}&ip={string}&uri={string}',
							parameters : [ {
								name : 'startDate',
								type : 'Date',
								description : 'The date after which, inclusive, a page view in a session occurs (greater-than comparison)',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'The date before which, inclusive, a page view in a session occurs (less-than comparison)',
							}, {
								name : 'ip',
								type : 'String',
								description : 'The IP address of the page views in the session',
							}, {
								name : 'uri',
								type : 'String',
								description : 'A URI that was requested in a page view in the session',
							}, ],
							body_parameters : [],
							returns : '{"count":{number}} where {number} is a non-negative integer',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/sessions/counts/?startDate=2017-02-03T10:00:00Z&endDate=2017-02-03T11:00:00Z',
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
						errors : [{code : '400', message : '', explanation : '', resolution : ''}, ],
						example : '',
					}, */]
					}
				} ]);
