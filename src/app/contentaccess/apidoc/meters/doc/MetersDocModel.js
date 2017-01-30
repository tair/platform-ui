/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.meters.doc')
		.factory(
				/* Name */
				'MetersDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Meters API',
						overview : 'A meter limit imposes a usage limit on parties accessing partner resources without subscriptions. The IP Address Count maintains the current count of free accesses to the resources of a partner by an IP address. The sequence of limit values provides a series of warnings followed by a resource block at the specified counts. The meter blacklist has regular expression patterns that identify sets of URIs that do not get metered.',
						datatypes : [
								{
									name : 'IPAddressCount',
									fields : [
											{
												name : 'id',
												type : 'Number',
												description : 'Unique identifier for the count',
											},
											{
												name : 'ip',
												type : 'String',
												description : 'The IP address being counted',
											},
											{
												name : 'count',
												type : 'Number',
												description : 'The count of free accesses for the IP address and partner',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for the partner being metered',
											}, ],
								},
								{
									name : 'LimitValue',
									fields : [
											{
												name : 'limitId',
												type : 'Number (generated)',
												description : 'Unique identifier for the limit value',
											},
											{
												name : 'val',
												type : 'Number',
												description : 'The access count at which to warn or block; last value in sequence blocks',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner system to which the limit value applies',
											}, ],
								},
								{
									name : 'MeterStatus',
									fields : [
											{
												name : 'status',
												type : 'String',
												description : 'Status of metering for IP address: OK, Warning, Block, BlackListBlock; Warning means display a warning, Block means block access, BlackListBlock means block access based on matching a blacklisted URI',
											}, ],
								},
								{
									name : 'MeterBlackList',
									fields : [
											{
												name : 'meterBlackListId',
												type : 'Number',
												description : 'The unique identifier for the meter blacklist entry',
											},
											{
												name : 'pattern',
												type : 'String',
												description : 'The Python regular expression identifying a set of URIs to be blacklisted; see https://docs.python.org/2/library/re.html for details on Python regular expreesions',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner system containing the blacklisted resources',
											}, ],
								}, 
									  /*{
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
								}, */],
						calls : [
								{
									header : 'Get All IP Address Counts',
									summary : 'Get all the IP address accounts currently in the API database.',
									op : 'GET',
									uri : '/meters/',
									parameters : [],
									body_parameters : [],
									returns : 'an Array of IPAddressCount objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/',
								},
								{
									header : 'Get IP Address Counts by Filter',
									summary : 'Get the IP address counts that match criteria specified in parameters, including id, IP address, count, and partner ID.',
									op : 'GET',
									uri : '/meters/?id={id}&ip={string}&count={number}&partnerId={id}',
									parameters : [
											{
												name : 'id',
												type : 'Number',
												description : 'Unique identifier for an IP address count',
											},
											{
												name : 'ip',
												type : 'String',
												description : 'IP address',
											},
											{
												name : 'count',
												type : 'Number',
												description : 'The count of metered accesses for an IP address for a partner',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											}, ],
									body_parameters : [],
									returns : 'an Array of IPAddressCount objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/?ip=150.26.157.48',
								},
								{
									header : 'Create an IP Address Count',
									summary : 'Create an entry in the counts for a given IP address and partner.',
									op : 'POST',
									uri : '/meters/',
									parameters : [],
									body_parameters : [
											{
												name : 'ip',
												type : 'String',
												description : 'IP address (required)',
											},
											{
												name : 'count',
												type : 'Number',
												description : 'The count of metered accesses for an IP address for a partner (default value 1)',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner (required)',
											}, ],
									returns : 'created IPAddressCount object',
									errors : [
											{
												code : '400',
												message : '{"partnerId":["This field is required."]}',
												explanation : 'The request did not include a partnerId parameter in the entity.',
												resolution : 'Supply a form-encoded, valid partnerId parameter in the request entity.'
											},
											{
												code : '400',
												message : '{"ip":["This field is required."]}',
												explanation : 'The request did not include an ip parameter in the entity.',
												resolution : 'Supply a form-encoded, valid ip parameter in the request entity.'
											},
											{
												code : '400',
												message : '{"ip":["Enter a valid IPv4 or IPv6 address."]}',
												explanation : 'The ip parameter value is not a valid IP address.',
												resolution : 'Correct the ip parameter in the request entity.'
											},
											{
												code : '400',
												message : '{"partnerId":["Invalid pk \"xxxx\" - object does not exist."]}',
												explanation : 'The request contained an invalid partner id.',
												resolution : 'Correct the partnerId parameter in the request entity.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/',
								},
								{
									header : 'Update a Set of IP Address Counts by Filter',
									summary : 'Update a set of IP address counts that match the specified values for id, ip, count, and partner id.',
									op : 'PUT',
									uri : '/meters/?id={id}&ip={string}&count={number}&partnerId={id}',
									parameters : [
											{
												name : 'id',
												type : 'Number',
												description : 'Unique identifier for an IP address count',
											},
											{
												name : 'ip',
												type : 'String',
												description : 'IP address',
											},
											{
												name : 'count',
												type : 'Number',
												description : 'The count of metered accesses for an IP address for a partner',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											}, ],
									body_parameters : [
											{
												name : 'ip',
												type : 'String',
												description : 'IP address (required)',
											},
											{
												name : 'count',
												type : 'Number',
												description : 'The count of metered accesses for an IP address for a partner (required)',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner (required)',
											}, ],
									returns : 'the IPAddressCount objects',
									errors : [
											{
												code : '200',
												message : '{"error":"does not allow update without query parameters"}',
												explanation : 'The request contained no query parameters.',
												resolution : 'Specify at least one filter query parameter (id, ip, or partnerId) in the request.'
											},
											{
												code : '400',
												message : '{"ip":["Enter a valid IPv4 or IPv6 address."]}',
												explanation : 'The ip parameter value is not a valid IP address.',
												resolution : 'Correct the ip parameter in the request entity.'
											},
											{
												code : '400',
												message : '{"partnerId":["Invalid pk \"xxxx\" - object does not exist."]}',
												explanation : 'The request contained an invalid partner id.',
												resolution : 'Correct the partnerId parameter in the request entity.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/?id=2345',
								},
								{
									header : 'Delete IP Address Counts By Filter',
									summary : 'Delete all the IP address counts that match a filter on id, IP address, count, or partner id.',
									op : 'DELETE',
									uri : '/meters/?id={id}&ip={string}&count={number}&partnerId={id}',
									parameters : [
											{
												name : 'id',
												type : 'Number',
												description : 'Unique identifier for an IP address count',
											},
											{
												name : 'ip',
												type : 'String',
												description : 'IP address',
											},
											{
												name : 'count',
												type : 'Number',
												description : 'The count of metered accesses for an IP address for a partner',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											}, ],
									body_parameters : [],
									returns : '{"success":"delete complete"}',
									errors : [
											{
												code : '200',
												message : '{"error":"does not allow delete without query parameters"}',
												explanation : 'The request contained no query parameters.',
												resolution : 'Specify at least one filter query parameter (id, ip, or partnerId) in the request.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/?partnerId=tair',
								},
								{
									header : 'Get All Meter Limits',
									summary : 'Get all the meter limits for all partners.',
									op : 'GET',
									uri : '/meters/limits/',
									parameters : [],
									body_parameters : [],
									returns : 'an Array of LimitValue objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/limits/',
								},
								{
									header : 'Get Meter Limit By Id',
									summary : 'Get a specific meter limit using its ID.',
									op : 'GET',
									uri : '/meters/limits/?limitId={id}',
									parameters : [
											{
												name : 'limitId',
												type : 'Number',
												description : 'The unique identifier for the limit value',
											}, ],
									body_parameters : [],
									returns : 'An Array of LimitValue objects with a single object',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/limits/?limitId=1',
								},
								{
									header : 'Get the Meter Limits for a Partner',
									summary : 'Get the sequence of meter limits for a partner by ID',
									op : 'GET',
									uri : '/meters/limits/?partnerId={id}',
									parameters : [
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for a partner',
											}, ],
									body_parameters : [],
									returns : 'an Array of LimitValue objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/limits/?partnerId=tair',
								},
								{
									header : 'Get the Meter Limits By Limit Value',
									summary : 'Get all the meter limits set to a certain access count.',
									op : 'GET',
									uri : '/meters/limits/?val={count}',
									parameters : [
											{
												name : 'val',
												type : 'Number',
												description : 'The access count for which to query limit values',
											}, ],
									body_parameters : [],
									returns : 'an Array of LimitValue objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/limits/?val=75',
								},
								{
									header : 'Create a Limit Value',
									summary : '',
									op : 'POST',
									uri : '/meters/limits',
									parameters : [],
									body_parameters : [
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner for which to create a limit',
											},
											{
												name : 'val',
												type : 'Number',
												description : 'The access count at which to warn or block access',
											}, ],
									returns : 'the created LimitValue object',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/limits/',
								},
								{
									header : 'Update a Limit Value By ID',
									summary : 'Update the value for a limit identified by limit ID',
									op : 'PUT',
									uri : '/meters/limits/?limitId={id}',
									parameters : [
											{
												name : 'limitId',
												type : 'Number',
												description : 'The unique identifier for the meter limit value',
											}, ],
									body_parameters : [
											{
												name : 'partnerId',
												type : 'String',
												description : 'The unique identifier for the partner for which to create a limit',
											},
											{
												name : 'val',
												type : 'Number',
												description : 'The access count at which to warn or block access',
											}, ],
									returns : 'the updated LimitValue object',
									errors : [
											{
												code : '200',
												message : '{"error":"does not allow update without query parameters"}',
												explanation : 'The request had no query parameters.',
												resolution : 'Supply a limitId, partnerId, or val query parameter to limit the scope of the update.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/limits/?limitId=3',
								},
								{
									header : 'Delete a Limit Value',
									summary : '',
									op : 'DELETE',
									uri : '/meters/limits/?limitId={id}',
									parameters : [
											{
												name : 'limitId',
												type : 'Number',
												description : 'The unique identifier for the meter limit value',
											}, ],
									body_parameters : [],
									returns : '{"success":"delete complete"}',
									errors : [
											{
												code : '200',
												message : '{"error":"does not allow delete without query parameters"}',
												explanation : 'The request had no query parameters.',
												resolution : 'Supply a limitId, partnerId, or val query parameter to limit the scope of the delete.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/limits/?limitId=3',
								},
								{
									header : 'Increment the Meter Count for an IP Address',
									summary : 'Increments the IP address count for a specified IP address; if the address is not yet in the database, add it with count 1',
									op : 'POST',
									uri : '/meters/ip/{ip address}/increment/?partnerId={id}',
									parameters : [
											{
												name : 'partnerId',
												type : 'String',
												description : 'unique identifier for the partner to meter',
											}, ],
									body_parameters : [],
									returns : '{"message": "success"}',
									errors : [
											{
												code : '200',
												message : '{"message": "not success"}',
												explanation : 'The partner id was not found or another error occurred to prevent insert or update of an address count.',
												resolution : 'Correct the partner id in the request.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/ip/150.26.157.48/increment/?partnerId=tair',
								},
								{
									header : 'Check the Meter Count for an IP Address Against Limit Values',
									summary : 'Checks whether the meter count for a URI and specified IP address and partner is at a specified IP meter limit value',
									op : 'GET',
									uri : '/meters/ip/{ip address}/limit/?partnerId={id}&uri={string}',
									parameters : [
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											},
											{
												name : 'uri',
												type : 'String',
												description : 'The URI from the request to check against the blacklist',
											}, ],
									body_parameters : [],
									returns : 'a MeterStatus object',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/ip/150.26.157.48/limit/?partnerId=tair&uri=https://www.arabidopsis.org/locus/AT1G01010',
								},
								{
									header : 'Get All Meter Blacklist Entries',
									summary : 'Get all the Metering blacklist entries currently in the API database.',
									op : 'GET',
									uri : '/meters/meterblacklist/',
									parameters : [],
									body_parameters : [],
									returns : 'an Array of MeterBlackList objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/meterblacklist/',
								},
								{
									header : 'Get Meter Blacklist Entries by Filter',
									summary : 'Get the IP address counts that match criteria specified in parameters, including meterBlackListId, pattern, and partner ID.',
									op : 'GET',
									uri : '/meters/meterblacklist/?meterBlackListId={id}&pattern={string}&partnerId={id}',
									parameters : [
											{
												name : 'meterBlackListId',
												type : 'Number',
												description : 'Unique identifier for Meter Blacklist entry',
											},
											{
												name : 'pattern',
												type : 'String',
												description : 'The Python regular expression that identifies the blacklisted URIs',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											}, ],
									body_parameters : [],
									returns : 'an Array of MeterBlackList objects',
									errors : [],
									example : 'https://pwapi.arabidopsis.org/meters/meterblacklist/?partnerId=biocyc',
								},
								{
									header : 'Create a Meter Blacklist Entry',
									summary : 'Create a meter blacklist entry for a partner.',
									op : 'POST',
									uri : '/meters/meterblacklist/',
									parameters : [],
									body_parameters : [
											{
												name : 'pattern',
												type : 'String',
												description : 'The Python regular expression that identifies the blacklisted URIs (required)',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner (required)',
											}, ],
									returns : 'created MeterBlackList object',
									errors : [
											{
												code : '400',
												message : '{"partnerId":["This field is required."]}',
												explanation : 'The request did not include a partnerId parameter in the entity.',
												resolution : 'Supply a form-encoded, valid partnerId parameter in the request entity.'
											},
											{
												code : '400',
												message : '{"partnerId":["Invalid pk \"xxxx\" - object does not exist."]}',
												explanation : 'The request contained an invalid partner id.',
												resolution : 'Correct the partnerId parameter in the request entity.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/meterblacklist/',
								},
								{
									header : 'Update a Set of Meter Blacklist Entries by Filter',
									summary : 'Update a set of IP address counts that match the specified values for id, ip, count, and partner id.',
									op : 'PUT',
									uri : '/meters/meterblacklist/?meterBlackListId={id}&pattern={string}&partnerId={id}',
									parameters : [
											{
												name : 'meterBlackListId',
												type : 'Number',
												description : 'Unique identifier for Meter Blacklist entry',
											},
											{
												name : 'pattern',
												type : 'String',
												description : 'The Python regular expression that identifies the blacklisted URIs',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											}, ],
									body_parameters : [
											{
												name : 'pattern',
												type : 'String',
												description : 'The Python regular expression that identifies the blacklisted URIs (required)',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner (required)',
											}, ],
									returns : 'the MeterBlacklist objects',
									errors : [
											{
												code : '200',
												message : '{"error":"does not allow update without query parameters"}',
												explanation : 'The request contained no query parameters.',
												resolution : 'Specify at least one filter query parameter (meterBlacklistId, pattern, or partnerId) in the request.'
											},
											{
												code : '400',
												message : '{"partnerId":["Invalid pk \"xxxx\" - object does not exist."]}',
												explanation : 'The request contained an invalid partner id.',
												resolution : 'Correct the partnerId parameter in the request entity.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/meterblacklist/?meterBlackListId=2345',
								},
								{
									header : 'Delete Meter Blacklist Entries By Filter',
									summary : 'Delete all the IP address counts that match a filter on meterBlackListId, pattern, or partner id.',
									op : 'DELETE',
									uri : '/meters/meterblacklist/?meterBlackListId={id}&pattern={string}&partnerId={id}',
									parameters : [
											{
												name : 'meterBlackListId',
												type : 'Number',
												description : 'Unique identifier for Meter Blacklist entry',
											},
											{
												name : 'pattern',
												type : 'String',
												description : 'The Python regular expression that identifies the blacklisted URIs',
											},
											{
												name : 'partnerId',
												type : 'String',
												description : 'Unique identifier for a partner',
											}, ],
									body_parameters : [],
									returns : '{"success":"delete complete"}',
									errors : [
											{
												code : '200',
												message : '{"error":"does not allow delete without query parameters"}',
												explanation : 'The request contained no query parameters.',
												resolution : 'Specify at least one filter query parameter (meterBlacklistId, pattern, or partnerId) in the request.'
											}, ],
									example : 'https://pwapi.arabidopsis.org/meters/meterblacklist/?partnerId=tair',
								}, /*
									  {
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
									body_parameters : [ {
										name : '',
										type : '',
										description : '',
									}, {
										name : '',
										type : '',
										description : '',
									}, ],
									returns : '',
									errors : [ {
										code : '400',
										message : '',
										explanation : '',
										resolution : ''
									}, ],
									example : '',
								}, */] 
					}
				} ]);
