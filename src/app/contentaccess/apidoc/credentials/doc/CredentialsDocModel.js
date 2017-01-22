/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.credentials.doc')
		.factory(
				/* Name */
				'CredentialsDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Credentials API',
						overview : 'A credential is a username used to authenticate a party to the API.',
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
								'A user can get the usernames associated with an email address.',],
						datatypes : [ {
							name : 'Credential',
							fields : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party corresponding to the credential',
							}, {
								name : 'username',
								type : 'String',
								description : 'The login username for the party accessing the partner; unique for the partner; case sensitive',
							}, {
								name : 'password',
								type : 'String',
								description : 'The password for authentication; suppressed on GET requests',
							}, {
								name : 'email',
								type : 'String',
								description : 'The user email for notification of changes',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for the partner to which the user authenticates with this credential',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'The partner unique identifier for the party in the partner system',
							}, {
								name : 'institution',
								type : 'String',
								description : 'For end users, the institution to which they belong',
							}, {
								name : 'firstName',
								type : 'String',
								description : 'The user first name for display',
							}, {
								name : 'lastName',
								type : 'String',
								description : 'The user last name for display',
							}, ],
						}, {
							name : 'Authentication',
							fields : [ {
								name : 'username',
								type : 'String',
								description : 'The authenticated username',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'The unique identifier for the user for the partner',
							}, {
								name : 'token',
								type : 'String',
								description : 'The JWT token for authorization of future API calls',
							}, {
								name : 'role',
								type : 'String',
								description : 'The API authorization role (user, organization, consortium, staff, admin, partner)',
							}, {
								name : 'email',
								type : 'String',
								description : 'The user email address from the credential',
							}, {
								name : 'message',
								type : 'String',
								description : 'Success message, "Correct password"',
							}, {
								name : 'credentialId',
								type : 'Number',
								description : 'For backward compatibility, the party ID of the user',
							}, {
								name : 'secretKey',
								type : 'String',
								description : 'For backward compatibility, a non-URL-encoded encrypted secret key for authorization',
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
							header : 'Get all Credentials',
							summary : 'Get all the credentials',
							op : 'GET',
							uri : '/credentials/',
							parameters : [],
							body_parameters : [],
							returns : 'Array of Credential (no passwords)',
							errors : [],
							example : 'https://demoapi.arabidopsis.org/credentials/',
						}, {
							header : 'Get Credentials with Filter',
							summary : 'Get credentials based on the parameters specified in the request, all of which are optional',
							op : 'GET',
							uri : '/credentials/?partyId={id}&username={string}&email={string}&userIdentifier={string}&firstName={string}&lastName={string}&partnerId={id}&institution={string}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for a party',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for a party for a partner',
							}, {
								name : 'email',
								type : 'String',
								description : 'The user email',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'The unique identifier for the party for a partner',
							}, {
								name : 'firstName',
								type : 'String',
								description : 'The user first name',
							}, {
								name : 'lastName',
								type : 'String',
								description : 'The user last name',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The partner ID of the credential for the party',
							}, {
								name : 'institution',
								type : 'String',
								description : 'The institution to which the user party belongs',
							}, ],
							body_parameters : [],
							returns : 'Array of Credential',
							errors : [],
							example : 'https://demoapi.arabidopsis.org/credentials/?partyId=34589',
						}, {
							header : 'Create a User Party and Credential or Credential for Existing Party',
							summary : 'Create a new party of party type user and its credential in one operation',
							op : 'POST',
							uri : '/credentials/',
							parameters : [],
							body_parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique id for the party; optional but if supplied, creates credential',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for the user for the partner; required',
							}, {
								name : 'password',
								type : 'String',
								description : 'The user password for authentication in cleartext; stored after encrypting; required',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for the partner; required',
							}, {
								name : 'name',
								type : 'String',
								description : 'Full name of the user; required',
							}, {
								name : 'email',
								type : 'String',
								description : 'The user email',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'The unique identifier for the user for the partner',
							}, {
								name : 'firstName',
								type : 'String',
								description : 'First name of the user',
							}, {
								name : 'lastName',
								type : 'String',
								description : 'Last name of the user',
							}, {
								name : 'institution',
								type : 'String',
								description : 'Institution to which a user belongs',
							}, {
								name : 'country',
								type : 'Number',
								description : 'Unique identifier for the country in the API database (see list)',
							}, {
								name : 'display',
								type : 'Number',
								description : '1 means display in institution list, 0 means do not display in list; default 0',
							}, {
								name : 'label',
								type : 'String',
								description : 'A label to display for the user in list displays',
							}, ],
							returns : 'Credential, HTTP 201',
							errors : [{code : '500', message : 'Server Error (500)'},
								      {code : '400', message : 'There is an existing credential for the user, use PUT to update the credential.'},
								      {code : '400', message : '{"non_field_errors":["The fields username, partnerId must make a unique set."]}'},],
							        
							example : 'https://pwapi.arabidopsis.org/credentials/',
						}, {
							header : 'Update a Credential and Its Party',
							summary : 'Update the fields of an existing party (if partyId specified) and its credential. This call is designed for use by a partner registration system to update user profile information.',
							op : 'PUT',
							uri : '/credentials/?userIdentifier={string}',
							parameters : [ {
								name : 'userIdentifier',
								type : 'String',
								description : 'The unique identifier for a user from the partner system, identifies the user for the update',
							}, ],
							body_parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique id for the party; optional but if supplied, causes update of Party fields',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for the user for the partner',
							}, {
								name : 'password',
								type : 'String',
								description : 'The user password for authentication in cleartext; stored after encrypting',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for the partner',
							}, {
								name : 'name',
								type : 'String',
								description : 'Full name of the user',
							}, {
								name : 'email',
								type : 'String',
								description : 'The user email',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'The unique identifier for the user for the partner',
							}, {
								name : 'firstName',
								type : 'String',
								description : 'First name of the user',
							}, {
								name : 'lastName',
								type : 'String',
								description : 'Last name of the user',
							}, {
								name : 'institution',
								type : 'String',
								description : 'Institution to which a user belongs',
							}, {
								name : 'country',
								type : 'Number',
								description : 'Unique identifier for the country in the API database (see list)',
							}, {
								name : 'display',
								type : 'Number',
								description : '1 means display in institution list, 0 means do not display in list; default 0',
							}, {
								name : 'label',
								type : 'String',
								description : 'A label to display for the user in list displays',
							}, ],
							returns : 'JSON object with updated field values',
							errors : [{code : '200', message : '{"error":"Put method needs userIdentifier"}'},
							          {code : '400', message : '{"error":"Serializer error"}'},],
							example : 'https://pwapi.arabidopsis.org/credentials/?userIdentifier=12345&partnerId=tair',
						}, {
							header : 'Authenticate the user for a specific partner',
							summary : 'Given a username and password in cleartext and the partner id, authenticate the user against a credential.',
							op : 'POST',
							uri : '/credentials/login/?partnerId={id}',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'the unique string identifying the partner',
							}, ],
							body_parameters : [{
								name : 'user',
								type : 'String',
								description : 'The credential username of the user',
							}, {
								name : 'password',
								type : 'String',
								description : 'The password with which to authenticate the user, in cleartext',
							}, ],
							returns : '',
							errors : [{code : '401', message : 'PWD NOT FOUND IN DB. username existance unknown'},
							          {code : '401', message : 'Authentication Login USER NOT MATCH. i={n} continue...'},],
							example : 'POST https://pwapi.arabidopsis.org/credentials/login/?partnerId=tair',
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
						errors : [{code : '400', message : ''}],
						example : '',
					}, */]
					}
				} ]);
