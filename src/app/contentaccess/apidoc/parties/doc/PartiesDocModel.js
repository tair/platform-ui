/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.parties.doc')
		.factory(
				/* Name */
				'PartiesDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Party API',
						overview : 'The Party API manages parties, the individual people and organizations that play a role in the Phoenix system. Parties may be users, organizations, consortiums, partners, staff, or admin parties. The party type defines the role of the party in the system and hence what API calls the party may execute. The party is the basis for authentication.',
						datatypes : [ {
							name : 'Party',
							fields : [ {
								name : 'partyId',
								type : 'Number (generated)',
								description : 'The unique identifier for the party',
							}, {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party: user, organization, consortium, partner, staff, admin',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display',
							}, {
								name : 'country',
								type : 'Number',
								description : 'The unique identifier for the country to which the party belongs',
							}, {
								name : 'display',
								type : 'String',
								description : 'Whether to display (true) or not to display (false) the party in a list of parties in the user interface, such as a subscription list',
							}, {
								name : 'consortiums',
								type : 'Array of Party',
								description : 'A list of the consortiums to which the party affiliates',
							}, {
								name : 'label',
								type : 'String',
								description : 'A label for the party for use in the Admin Portal user interface',
							}, ],
						}, {
							name : 'SubscribedOrganization',
							fields : [ {
								name : 'name',
								type : 'String',
								description : 'The subscribed organization name',
							}, {
								name : 'country',
								type : 'String',
								description : 'The name of the country in which the subscribed organization is located',
							}, ],
						}, {
							name : 'IpRange',
							fields : [ {
								name : 'ipRangeId',
								type : 'Number (generated)',
								description : 'The unique identifier for the IP range',
							}, {
								name : 'start',
								type : 'String',
								description : 'The V4 or V6 IP address that starts the range',
							}, {
								name : 'end',
								type : 'String',
								description : 'The V4 or V6 IP address that ends the range',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'The party that owns the range',
							}, {
								name : 'label',
								type : 'String',
								description : 'A label for the range; useful for grouping ranges, for example, into departments',
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
							header : 'Get Party By Id',
							summary : '',
							op : 'GET',
							uri : '/parties/?partyId={id}',
							parameters : [ {
								name : 'id',
								type : 'Number',
								description : 'The unique identifier for the party to query',
							}, ],
							body_parameters : [],
							returns : 'an Array of Party objects with a single object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/?partyId=1234',
						}, {
							header : 'Get Parties by Type',
							summary : 'Get all the parties of a single type',
							op : 'GET',
							uri : '/parties/?partyType={string}',
							parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to query: user, organization, consortium, partner, staff, admin',
							}, ],
							body_parameters : [],
							returns : 'an Array of Party objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/?partyType=consortium',
						}, {                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
							header : 'Create a Party',
							summary : 'Create a new party.',
							op : 'POST',
							uri : '/parties/',
							parameters : [],
							body_parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to create: user, organization, consortium, partner, staff, admin',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display in the user interface',
							}, {
								name : 'country',
								type : 'Number',
								description : 'The unique identifier for the country',
							}, {
								name : 'display',
								type : 'String',
								description : 'Whether to display (true) or not (false) the party in a list in the user interface',
							}, {
								name : 'label',
								type : 'String',
								description : 'A label for the party to display in the Admin Portal user display',
							}, ],
							returns : '',
							errors : [{code : '400', message : '', explanation : '', resolution : ''}, ],
							example : '',
						}, {
							header : 'Update an Existing Party by Id',
							summary : 'Update an existing party.',
							op : 'PUT',
							uri : '/parties/&partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party to update',
							}, ],
							body_parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to create: user, organization, consortium, partner, staff, admin',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display in the user interface',
							}, {
								name : 'country',
								type : 'Number',
								description : 'The unique identifier for the country',
							}, {
								name : 'display',
								type : 'String',
								description : 'Whether to display (true) or not (false) the party in a list in the user interface',
							}, {
								name : 'label',
								type : 'String',
								description : 'A label for the party to display in the Admin Portal user display',
							}, ],
							returns : 'Array of Party objects with one object showing updated field values',
							errors : [{code : '200', message : '{"error": "does not allow update without query parameters"}', explanation : 'The URI did not contain any parameters to limit the update', resolution : 'Supply a valid partyId parameter in the URI request.'},],
							example : 'https://pwapi.arabidopsis.org/parties/?partyId=73',
						}, {
							header : 'Delete an Existing Party By Id',
							summary : 'Deletes an existing party identified by id',
							op : 'DELETE',
							uri : '/parties/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party to delete',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '200', message : '{"error": "does not allow delete without query parameters"}', explanation : 'The URI did not contain any parameters to limit the delete', resolution : 'Supply a valid partyId parameter in the URI request.'},],
							example : 'https://pwapi.arabidopsis.org/parties/?partyId=73',
						}, {
							header : 'Get List of Subscribed Organizations',
							summary : 'Get a list of the organization names and country names for all currently subscribed organizations, including consortium organizations, that allow their name to be displayed.',
							op : 'GET',
							uri : '/parties/organizations/&partnerId={id}',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'The unique identifier for a partner',
							}, ],
							body_parameters : [],
							returns : 'Array of Arrays of Strings, each of which contains 2 strings (organization name and country name)',
							errors : [{code : '400', message : '', explanation : '', resolution : ''}, ],
							example : 'https://pwapi.arabidopsis.org/parties/organizations/?partnerId=biocyc',
						}, {
							header : 'Get Institution By Party ID',
							summary : 'Get the party and credential information for a specific party by party ID.',
							op : 'GET',
							uri : '/parties/institutions/&partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party to query',
							}, ],
							body_parameters : [],
							returns : 'an Array of 2 objects, a Party object and a Credential object corresponding to it',
							errors : [{code : '400', message : '{"error":"does not allow get without partyId"}', explanation : 'The request did not include a query parameter partyId to specify the institution.', resolution : 'Supply a valid partyId query parameter in the request.'}, 
							          {code : '200', message : '{"error":"partyId {id} not found in Party tbl"}', explanation : 'The specified party id does not identify a known party.', resolution : 'Correct the party id value in the request.'}, 
							          {code : '200', message : '"error":"partyId {id} not found in Credential tbl"', explanation : 'There is no credential for the specified party id.', resolution : 'Correct the party id value in the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/institutions/?partyId=12345',
						}, {
							header : 'Create an Institution with Credential',
							summary : '',
							op : 'POST',
							uri : '/parties/institutions/',
							parameters : [],
							body_parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to create:  must specify organization',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display in the user interface',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for the user for the partner; required',
							}, {
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
								name : 'email',
								type : 'String',
								description : 'The user email; must be unique across all institutions',
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
							returns : 'code 201 with an Array of 2 objects, a Party object and a Credential object corresponding to it',
							errors : [{code : '400', message : '{"error": "POST method needs partyType"}', explanation : 'The request entity did not contain a partyType parameter.', resolution : 'Supply a valid, form-encoded partyType parameter and value in the request entity.'}, 
							          {code : '400', message : '{"error": "POST method. patyType must be organization"}', explanation : 'The partyType parameter had a value other than "organization"', resolution : 'Correct the party type to "organization".'}, 
							          {code : '400', message : '{"error":"This email is already used by another institution."}', explanation : 'The value for the email parameter in the entity has already been used for another institution.', resolution : 'Correct the email value.'}, 
							          {code : '400', message : '{"error": "POST parties/institutions/ password must not be empty"}', explanation : 'There was a password paramater in the entity but it had no value.', resolution : 'Supply a form-encoded value for the password parameter or remove the parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/institutions/',
						}, {
							header : 'Update an Existing Institution and Credential',
							summary : '',
							op : 'PUT',
							uri : '/parties/institutions/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party',
							}, {
								name : '',
								type : '',
								description : '',
							}, ],
							body_parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to update:  must specify organization',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display in the user interface',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for the user for the partner; required',
							}, {
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
								name : 'email',
								type : 'String',
								description : 'The user email; must be unique across all institutions',
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
							returns : 'code 201 with an Array of 2 objects, a Party object and a Credential object corresponding to it',
							errors : [{code : '400', message : '{"error": "partyId (aka institutionId) required"}', explanation : 'The request did not contain a partyType query parameter.', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error":"This email is already used by another institution."}', explanation : 'The value for the email parameter in the entity has already been used for another institution.', resolution : 'Correct the email value.'}, 
							          {code : '400', message : '{"error": "PUT parties/institutions/ password must not be empty"}', explanation : 'There was a password parameter in the entity but it had no value.', resolution : 'Supply a form-encoded value for the password parameter or remove the parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/institutions/&partyId=12345',
						}, {
							header : 'Delete an Existing Institution and Credential',
							summary : 'Delete an existing institution and its corresponding credential identified by party id.',
							op : 'DELETE',
							uri : '/parties/institutions/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the institution',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete partyId {id} completed"}',
							errors : [{code : '400', message : '{"error":"does not allow update without query parameters"}', explanation : 'The request did not contain any query parameters.', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error":"partyId (aka institutionId) required"}', explanation : 'The request had parameters but not the required partyId parameter', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error":"delete partyId {id} failed. partyId not found"}', explanation : 'The partyId value did not correspond to a known party id in the database.', resolution : 'Correct the partyId value.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/institutions/&partyId=12345',
						}, {
							header : 'Get Consortium By Party ID',
							summary : 'Get the party and credential information for a specific consortium by party ID.',
							op : 'GET',
							uri : '/parties/consortiums/&partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the consortium to query',
							}, ],
							body_parameters : [],
							returns : 'an Array of 2 objects, a Party object and a Credential object corresponding to it',
							errors : [{code : '400', message : '{"error":"does not allow get without partyId"}', explanation : 'The request did not include a query parameter partyId to specify the institution.', resolution : 'Supply a valid partyId query parameter in the request.'}, 
							          {code : '200', message : '{"error":"partyId {id} not found in Party tbl"}', explanation : 'The specified party id does not identify a known party.', resolution : 'Correct the party id value in the request.'}, 
							          {code : '200', message : '"error":"partyId {id} not found in Credential tbl"', explanation : 'There is no credential for the specified party id.', resolution : 'Correct the party id value in the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/consortiums/?partyId=12345',
						}, {
							header : 'Create a Consortium with Credential',
							summary : '',
							op : 'POST',
							uri : '/parties/consortiums/',
							parameters : [],
							body_parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to create:  must specify consortium',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display in the user interface',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for the user for the partner; required',
							}, {
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
								name : 'email',
								type : 'String',
								description : 'The user email; must be unique across all institutions',
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
							returns : 'code 201 with an Array of 2 objects, a Party object and a Credential object corresponding to it',
							errors : [{code : '400', message : '{"error": "POST method needs partyType"}', explanation : 'The request entity did not contain a partyType parameter.', resolution : 'Supply a valid, form-encoded partyType parameter and value in the request entity.'}, 
							          {code : '400', message : '{"error": "POST parties/consortiums/. patyType must be consortium"}', explanation : 'The partyType parameter had a value other than "consortium"', resolution : 'Correct the party type to "consortium".'}, 
							          {code : '400', message : '{"error":"This email is already used by another consortium."}', explanation : 'The value for the email parameter in the entity has already been used for another institution.', resolution : 'Correct the email value.'}, 
							          {code : '400', message : '{"error": "POST parties/consortiums/ password must not be empty"}', explanation : 'There was a password paramater in the entity but it had no value.', resolution : 'Supply a form-encoded value for the password parameter or remove the parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/consortiums/',
						}, {
							header : 'Update an Existing Consortium and Credential',
							summary : '',
							op : 'PUT',
							uri : '/parties/consortiums/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party',
							}, {
								name : '',
								type : '',
								description : '',
							}, ],
							body_parameters : [ {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party to update:  must specify consortium',
							}, {
								name : 'name',
								type : 'String',
								description : 'The full name of the party for display in the user interface',
							}, {
								name : 'username',
								type : 'String',
								description : 'The unique username for the user for the partner; required',
							}, {
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
								name : 'email',
								type : 'String',
								description : 'The user email; must be unique across all institutions',
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
							returns : 'code 201 with an Array of 2 objects, a Party object and a Credential object corresponding to it',
							errors : [{code : '400', message : '{"error": "PUT parties/consortiums/ does not allow update without query parameters"}', explanation : 'The request did not contain any parameters.', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error": "PUT parties/consortiums/ partyId required"}', explanation : 'The request did not contain a partyType query parameter.', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error": "This email is already used by another consortium."}', explanation : 'The value for the email parameter in the entity has already been used for another consortium.', resolution : 'Correct the email value.'}, 
							          {code : '400', message : '{"error": "PUT parties/consortiums/ password must not be empty"}', explanation : 'There was a password parameter in the entity but it had no value.', resolution : 'Supply a form-encoded value for the password parameter or remove the parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/consortiums/&partyId=12345',
						}, {
							header : 'Delete an Existing Consortium and Credential',
							summary : 'Delete an existing institution and its corresponding credential identified by party id.',
							op : 'DELETE',
							uri : '/parties/consortiums/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the consortium',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete partyId {id} completed"}',
							errors : [{code : '400', message : '{"error":"does not allow update without query parameters"}', explanation : 'The request did not contain any query parameters.', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error":"partyId required"}', explanation : 'The request had parameters but not the required partyId parameter', resolution : 'Supply a valid partyId parameter and value in the request URI.'}, 
							          {code : '400', message : '{"error":"delete partyId {id} failed. partyId not found"}', explanation : 'The partyId value did not correspond to a known party id in the database.', resolution : 'Correct the partyId value.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/consortiums/&partyId=12345',
						}, {
							header : 'Get Affiliated Institutions of a Consortium',
							summary : 'Get all the institution organization parties affiliated with a consortium party.',
							op : 'GET',
							uri : '/parties/affiliations/?partyId={id}&partyType=consortium',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the consortium',
							}, {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party, a consortium',
							}, ],
							body_parameters : [],
							returns : 'an Array of organization Party objects',
							errors : [{code : '400', message : '{"error":"invalid partyType"}', explanation : 'The partyType parameter has a value other than consortium or organization.', resolution : 'Supply only consortium or organization as the party type parameter value.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/affiliations/?partyId=31767&partyType=consortium',
						}, {
							header : 'Get Affiliated Consortiums of an Institution',
							summary : 'Get all the consortium parties affiliated with an institution (organization) party.',
							op : 'GET',
							uri : '/parties/affiliations/?partyId={id}&partyType=organization',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the organization',
							}, {
								name : 'partyType',
								type : 'String',
								description : 'The kind of party, an organization',
							}, ],
							body_parameters : [],
							returns : 'an Array of organization Party objects',
							errors : [{code : '400', message : '{"error":"invalid partyType"}', explanation : 'The partyType parameter has a value other than consortium or organization.', resolution : 'Supply only consortium or organization as the party type parameter value.'}, ],
							example : 'https://pwapi.arabidopsis.org/parties/affiliations/?partyId=30892&partyType=organization',
						}, {
							header : 'Affililate an Institution to a Consortium',
							summary : 'Affiliate an existing institution to an existing consortium by linking their ids in a parent-child relationship.',
							op : 'POST',
							uri : '/parties/affiliations/?parentPartyId={id}&childPartyId={id}',
							parameters : [ {
								name : 'parentPartyId',
								type : 'Number',
								description : 'The unique identifier for a consortium',
							}, {
								name : 'childPartyId',
								type : 'Number',
								description : 'The unique identifier for an organization that belongs to the consortium',
							}, ],
							body_parameters : [],
							returns : '',
							errors : [{code : '400', message : '{"error":"does not allow creation without parentPartyId or childPartyId"}', explanation : 'The request did not contain a parentPartyId or a childPartyId parameter.', resolution : 'Supply both the parentPartyId and the childPartyId parameters in the query parameters of the URI.'}, 
							          {code : '400', message : '{"error":"parentParty does not exist"}', explanation : 'The id in the parentPartyId parameter does not exist.', resolution : 'Correct the parentPartyId in the query parameters of the URI.'}, 
							          {code : '400', message : '{"error":"childParty does not exist"}', explanation : 'The id in the childPartyId parameter does not exist.', resolution : 'Correct the childPartyId in the query parameters of the URI.'}, 
							          {code : '500', message : '<h1>Server Error (500)</h1>', explanation : 'There was a database error on insert.', resolution : 'Check to make sure the two ids are not already linked.'}, 
							          ],
							example : 'https://pwapi.arabidopsis.org/parties/affiliations/?parentPartyId=31767&childPartyId=30892',
						}, {
							header : 'Delete an Affiliation',
							summary : 'Delete an affiliation between a consortium and an organization.',
							op : 'DELETE',
							uri : '/parties/affiliations/?parentPartyId={id}&childPartyId={id}',
							parameters : [ {
								name : 'parentPartyId',
								type : 'Number',
								description : 'The unique identifier for a consortium',
							}, {
								name : 'childPartyId',
								type : 'Number',
								description : 'The unique identifier for an organization that belongs to the consortium',
							}, ],
							body_parameters : [],
							returns : '',
							errors : [{code : '400', message : '{"error":"does not allow deletion without parentPartyId or childPartyId"}', explanation : 'The request did not contain a parentPartyId or a childPartyId parameter.', resolution : 'Supply both the parentPartyId and the childPartyId parameters in the query parameters of the URI.'}, 
							          {code : '400', message : '{"error":"parentParty does not exist"}', explanation : 'The id in the parentPartyId parameter does not exist.', resolution : 'Correct the parentPartyId in the query parameters of the URI.'}, 
							          {code : '400', message : '{"error":"childParty does not exist"}', explanation : 'The id in the childPartyId parameter does not exist.', resolution : 'Correct the childPartyId in the query parameters of the URI.'}, 
							          {code : '500', message : '<h1>Server Error (500)</h1>', explanation : 'There was a database error on delete.', resolution : 'Check to make sure the two ids are actually linked.'}, 
							          ],
							example : 'https://pwapi.arabidopsis.org/parties/affiliations/?parentPartyId=31767&childPartyId=30892',
						}, {
							header : 'Get the IP Ranges for a Party',
							summary : 'Get all the IP ranges that a party owns.',
							op : 'GET',
							uri : '/parties/ipranges/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party for which to get the IP ranges',
							}, ],
							body_parameters : [],
							returns : '',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/ipranges/?partyId=30892',
						}, {
							header : 'Create an IP Range for a Party',
							summary : '',
							op : 'POST',
							uri : '/parties/ipranges/',
							parameters : [],
							body_parameters : [{
								name : 'start',
								type : 'String',
								description : 'The IP address that starts the range',
							}, {
								name : 'end',
								type : 'String',
								description : 'The IP address that ends the range',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party that owns the IP range',
							}, {
								name : 'label',
								type : 'String',
								description : 'A text label for the IP range to display in the Admin Portal, such as a department name',
							}, ],
							returns : 'an Array of IpRange objects with a single object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/ipranges/',
						}, {
							header : 'Update an IP Range',
							summary : 'Update an existing IP range for a party.',
							op : 'PUT',
							uri : '/parties/ipranges/?partyId={id}&ipRangeId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party that owns the IP range (required)',
							}, {
								name : 'ipRangeId',
								type : 'Number',
								description : 'The unique identifier for the IP range to update (required)',
							}, ],
							body_parameters : [{
								name : 'ipRangeId',
								type : 'Number',
								description : 'The unique identifier for the IP range to update (required)',
							}, {
								name : 'start',
								type : 'String',
								description : 'The IP address that starts the range (required)',
							}, {
								name : 'end',
								type : 'String',
								description : 'The IP address that ends the range (required)',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party that owns the IP range (required)',
							}, {
								name : 'label',
								type : 'String',
								description : 'A text label for the IP range to display in the Admin Portal, such as a department name (required)',
							}, ],
							returns : 'an updated IpRange object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/ipranges/?partyId=30901&ipRangeId=1017',
						}, {
							header : 'Delete an IP Range',
							summary : 'Deletes an IP range that belongs to a specific party',
							op : 'DELETE',
							uri : '/parties/ipranges/?partyId={id}&ipRangeId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'The unique identifier for the party that owns the IP range (required)',
							}, {
								name : 'ipRangeId',
								type : 'Number',
								description : 'The unique identifier for the IP range to delete (required)',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/ipranges/?partyId=30901&ipRangeId=1017',
						}, {
							header : 'Get Organization By IP Address',
							summary : 'Get the name of an organization based on a specified IP address.',
							op : 'GET',
							uri : '/parties/org/?ip={string}',
							parameters : [ {
								name : 'ip',
								type : 'String',
								description : 'The IP address to look up (required)',
							}, ],
							body_parameters : [],
							returns : 'the name of the organization that owns the IP address',
							errors : [],
							example : '',
						}, {
							header : 'Get a List of Country Names',
							summary : 'Gets a list of all the country names.',
							op : 'GET',
							uri : '/parties/countries',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of String country names',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/countries/',
						}, {
							header : 'Send Usage Request Email to Phoenix',
							summary : 'Send an email to Phoenix requesting statistics for usage of a specific partner system by a specific party.',
							op : 'POST',
							uri : '/parties/usage/?partyId={id}',
							parameters : [ {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party for which to request usage statistics',
							}, ],
							body_parameters : [{
								name : 'institution',
								type : 'String',
								description : 'The name of the institution for which to send usage statistics',
							}, {
								name : 'consortium',
								type : 'String',
								description : 'The name of the consortium for which to send usage statistics',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The name of the partner for which to send usage statistics',
							}, {
								name : 'name',
								type : 'String',
								description : 'The username of the user requesting usage statistics',
							}, {
								name : 'email',
								type : 'String',
								description : 'The email of the party to which to send usage statistics',
							}, {
								name : 'startDate',
								type : 'String',
								description : 'The start date of the period for which to collect usage statistics',
							}, {
								name : 'endDate',
								type : 'String',
								description : 'The end date of the period for which to collect usage statistics',
							}, {
								name : 'comments',
								type : 'String',
								description : 'Comments about the usage statistics request',
							}, ],
							returns : '{"message":"success"}',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/parties/usage/partyId=',
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
