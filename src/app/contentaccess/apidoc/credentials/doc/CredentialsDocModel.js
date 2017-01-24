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
						datatypes : [
								{
									name : 'Credential',
									fields : [
											{
												name : 'partyId',
												type : 'Number',
												description : 'The unique identifier for the party corresponding to the credential',
											},
											{
												name : 'username',
												type : 'String',
												description : 'The login username for the party accessing the partner; unique for the partner; case sensitive',
											},
											{
												name : 'password',
												type : 'String',
												description : 'The password for authentication; suppressed on GET requests',
											},
											{
												name : 'email',
												type : 'String',
												description : 'The user email for notification of changes',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner to which the user authenticates with this credential',
											},
											{
												name : 'userIdentifier',
												type : 'String',
												description : 'The partner unique identifier for the party in the partner system',
											},
											{
												name : 'institution',
												type : 'String',
												description : 'For end users, the institution to which they belong',
											},
											{
												name : 'firstName',
												type : 'String',
												description : 'The user first name for display',
											},
											{
												name : 'lastName',
												type : 'String',
												description : 'The user last name for display',
											}, ],
								},
								{
									name : 'Authentication',
									fields : [
											{
												name : 'username',
												type : 'String',
												description : 'The authenticated username',
											},
											{
												name : 'userIdentifier',
												type : 'String',
												description : 'The unique identifier for the user for the partner',
											},
											{
												name : 'token',
												type : 'String',
												description : 'The JWT token for authorization of future API calls',
											},
											{
												name : 'role',
												type : 'String',
												description : 'The API authorization role (user, organization, consortium, staff, admin, partner)',
											},
											{
												name : 'email',
												type : 'String',
												description : 'The user email address from the credential',
											},
											{
												name : 'message',
												type : 'String',
												description : 'Success message, "Correct password"',
											},
											{
												name : 'credentialId',
												type : 'Number',
												description : 'For backward compatibility, the party ID of the user',
											},
											{
												name : 'secretKey',
												type : 'String',
												description : 'For backward compatibility, a non-URL-encoded encrypted secret key for authorization',
											}, ],
								},
								{
									name : 'ResetPasswordData',
									fields : [
											{
												name : 'username',
												type : 'String',
												description : 'The username for which the password was reset',
											},
											{
												name : 'useremail',
												type : 'String',
												description : 'The email to which the password-reset email was sent',
											},
											{
												name : 'temppwd',
												type : 'String',
												description : 'The encrypted temporary password',
											},
											{
												name : 'reset pwd',
												type : 'String',
												description : 'success message',
											}, ],
								}, /*
									 * { name : '', fields : [ { name : '', type :
									 * '', description : '', }, { name : '',
									 * type : '', description : '', }, ], },
									 */],
						calls : [
								{
									header : 'Get all Credentials',
									summary : 'Get all the credentials',
									op : 'GET',
									uri : '/credentials/',
									parameters : [],
									body_parameters : [],
									returns : 'Array of Credential (no passwords)',
									errors : [],
									example : 'https://demoapi.arabidopsis.org/credentials/',
								},
								{
									header : 'Get Credentials with Filter',
									summary : 'Get credentials based on the parameters specified in the request, all of which are optional',
									op : 'GET',
									uri : '/credentials/?partyId={id}&username={string}&email={string}&userIdentifier={string}&firstName={string}&lastName={string}&partnerId={id}&institution={string}',
									parameters : [
											{
												name : 'partyId',
												type : 'Number',
												description : 'The unique identifier for a party',
											},
											{
												name : 'username',
												type : 'String',
												description : 'The unique username for a party for a partner',
											},
											{
												name : 'email',
												type : 'String',
												description : 'The user email',
											},
											{
												name : 'userIdentifier',
												type : 'String',
												description : 'The unique identifier for the party for a partner',
											},
											{
												name : 'firstName',
												type : 'String',
												description : 'The user first name',
											},
											{
												name : 'lastName',
												type : 'String',
												description : 'The user last name',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The partner ID of the credential for the party',
											},
											{
												name : 'institution',
												type : 'String',
												description : 'The institution to which the user party belongs',
											}, ],
									body_parameters : [],
									returns : 'Array of Credential',
									errors : [],
									example : 'https://demoapi.arabidopsis.org/credentials/?partyId=34589',
								},
								{
									header : 'Create a User Party and Credential or Credential for Existing Party',
									summary : 'Create a new party of party type user and its credential in one operation',
									op : 'POST',
									uri : '/credentials/',
									parameters : [],
									body_parameters : [
											{
												name : 'partyId',
												type : 'Number',
												description : 'The unique id for the party; optional but if supplied, creates credential',
											},
											{
												name : 'username',
												type : 'String',
												description : 'The unique username for the user for the partner; required',
											},
											{
												name : 'password',
												type : 'String',
												description : 'The user password for authentication in cleartext; stored after encrypting; required',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner; required',
											},
											{
												name : 'name',
												type : 'String',
												description : 'Full name of the user; required',
											},
											{
												name : 'email',
												type : 'String',
												description : 'The user email',
											},
											{
												name : 'userIdentifier',
												type : 'String',
												description : 'The unique identifier for the user for the partner',
											},
											{
												name : 'firstName',
												type : 'String',
												description : 'First name of the user',
											},
											{
												name : 'lastName',
												type : 'String',
												description : 'Last name of the user',
											},
											{
												name : 'institution',
												type : 'String',
												description : 'Institution to which a user belongs',
											},
											{
												name : 'country',
												type : 'Number',
												description : 'Unique identifier for the country in the API database (see list)',
											},
											{
												name : 'display',
												type : 'Number',
												description : '1 means display in institution list, 0 means do not display in list; default 0',
											},
											{
												name : 'label',
												type : 'String',
												description : 'A label to display for the user in list displays',
											}, ],
									returns : 'Credential, HTTP 201',
									errors : [
											{
												code : '500',
												message : 'Server Error (500)',
												explanation : 'An unknown error prevented the server from responding.',
												resolution : 'Check the parameters to make sure all are valid.'
											},
											{
												code : '400',
												message : 'There is an existing credential for the user, use PUT to update the credential.',
												explanation : 'The request specified the partyId, but there was already a credential for that party.',
												resolution : 'Remove the partyId parameter from the request.'
											},
											{
												code : '400',
												message : '{"non_field_errors":["The fields username, partnerId must make a unique set."]}',
												explanation : 'The request contained both username and partnerId but updating would create a duplicate on those fields.',
												resolution : 'Remove or correct the duplicating combination.'
											}, ],

									example : 'https://pwapi.arabidopsis.org/credentials/',
								},
								{
									header : 'Update a Credential and Its Party',
									summary : 'Update the fields of an existing Credential and optionally the Party corresponding to it. This call is designed for use by a partner registration system to update user profile information.',
									op : 'PUT',
									uri : '/credentials/?userIdentifier={string}',
									parameters : [
											{
												name : 'userIdentifier',
												type : 'String',
												description : 'The unique identifier for a user from the partner system, identifies the user for the update',
											}, ],
									body_parameters : [
											{
												name : 'partyId',
												type : 'Number',
												description : 'The unique id for the party; optional but if supplied, read-only; causes update of Party fields',
											},
											{
												name : 'username',
												type : 'String',
												description : 'The unique username for the user for the partner',
											},
											{
												name : 'password',
												type : 'String',
												description : 'The user password for authentication in cleartext; stored after encrypting',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner',
											},
											{
												name : 'name',
												type : 'String',
												description : 'Full name of the user',
											},
											{
												name : 'email',
												type : 'String',
												description : 'The user email',
											},
											{
												name : 'userIdentifier',
												type : 'String',
												description : 'The unique identifier for the user for the partner',
											},
											{
												name : 'firstName',
												type : 'String',
												description : 'First name of the user',
											},
											{
												name : 'lastName',
												type : 'String',
												description : 'Last name of the user',
											},
											{
												name : 'institution',
												type : 'String',
												description : 'Institution to which a user belongs',
											},
											{
												name : 'country',
												type : 'Number',
												description : 'Unique identifier for the country in the API database (see list)',
											},
											{
												name : 'display',
												type : 'Number',
												description : '1 means display in institution list, 0 means do not display in list; default 0',
											},
											{
												name : 'label',
												type : 'String',
												description : 'A label to display for the user in list displays',
											}, ],
									returns : 'JSON object with updated field values',
									errors : [
											{
												code : '200',
												message : '{"error":"Put method needs userIdentifier"}',
												explanation : 'The request does not contain a userIdentifier value',
												resolution : 'Supply a userIdentifier parameter and value in the request.'
											},
											{
												code : '400',
												message : '{"error":"Serializer error"}',
												explanation : 'The request is missing a field from the list of fields to update',
												resolution : 'Supply all the listed fields for update of the credential.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/credentials/?userIdentifier=12345&partnerId=tair',
								},
								{
									header : 'Authenticate the user for a specific partner',
									summary : 'Given a username and password in cleartext and the partner id, authenticate the user against a credential.',
									op : 'POST',
									uri : '/credentials/login/?partnerId={id}',
									parameters : [
											{
												name : 'partnerId',
												type : 'String',
												description : 'the unique string identifying the partner',
											}, ],
									body_parameters : [
											{
												name : 'user',
												type : 'String',
												description : 'The credential username of the user',
											},
											{
												name : 'password',
												type : 'String',
												description : 'The password with which to authenticate the user, in cleartext',
											}, ],
									returns : '',
									errors : [
											{
												code : '401',
												message : 'PWD NOT FOUND IN DB. username existance unknown',
												explanation : 'The username value is not a known credential username.',
												resolution : 'Correct the username or update the profile with the new username.'
											},
											{
												code : '401',
												message : 'Authentication Login USER NOT MATCH. i={n} continue...',
												explanation : 'The password supplied does not match any password found for the username.',
												resolution : 'Correct the password or reset it.'
											}, ],
									example : 'POST https://pwapi.arabidopsis.org/credentials/login/?partnerId=tair',
								},
								{
									header : 'Reset Password',
									summary : 'Reset a credential password to a randomly-generated, temporary password and email to specified user',
									op : 'PUT',
									uri : '/resetPwd/',
									parameters : [
											{
												name : 'user',
												type : 'String',
												description : 'The username for the user registered with the partner',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique name of the partner for which to reset the user password',
											}, ],
									body_parameters : [],
									returns : 'A ResetPasswordData object',
									errors : [
											{
												code : '400',
												message : '{"message": "No username provided"}',
												explanation : 'Resetting password requires username.',
												resolution : 'Supply a user parameter to the request.'
											},
											{
												code : '400',
												message : '{"message": "No partnerId provided"}',
												explanation : 'Resetting password requires partner id.',
												resolution : 'Supply a partnerId parameter to the request.'
											},
											{
												code : '401',
												message : '{"reset pwd failed": "No such user"}',
												explanation : 'The username was not found.',
												resolution : 'Correct the username.'
											}, ],
									example : '',
								}, {
									header : 'Get Usernames for Email',
									summary : 'Gets all the usernames associated with a specific email and sends them to that email address',
									op : 'GET',
									uri : '/credentials/getUsernames/?email={string}',
									parameters : [ {
										name : 'email',
										type : 'String',
										description : 'The email address for which to find the usernames and to which to send an email with those names',
									}, ],
									body_parameters : [],
									returns : 'Credential object with no password field',
									errors : [ {
										code : '400',
										message : '{"error": "email param is required."}',
										explanation : 'The request requires an email address to look up.',
										resolution : 'Supply a valid email parameter in the request.'
									}, {
										code : '400',
										message : '{"error": "no username found."}',
										explanation : 'The email is not associated with any users.',
										resolution : 'Correct the username in the request.'
									}, ],
									example : 'https://pwapi.arabidopsis.org/credentials/getUsernames/?email=user@anywhere.org',
								}, /*
									 * { header : '', summary : '', op : 'GET',
									 * uri : '', parameters : [ { name : '',
									 * type : '', description : '', }, { name :
									 * '', type : '', description : '', }, ],
									 * body_parameters : [], returns : '',
									 * errors : [{code : '400', message : '',
									 * explanation : '', resolution : ''}],
									 * example : '', },
									 */]
					}
				} ]);
