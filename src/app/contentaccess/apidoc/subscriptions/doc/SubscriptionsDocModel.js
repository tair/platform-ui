/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.subscriptions.doc')
		.factory(
				/* Name */
				'SubscriptionsDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Subscription API',
						overview : 'Subscriptions relate parties to partners within a specified date period, expiring at the end date of the period. Subscription transactions track the purchase and renewal history of subscriptions. Activation codes provide a simple mechanism for activating individual subscriptions to a partner on the partner web site. Subscription requests provide a way to request assistance from Phoenix for commercial and institutional subscriptions.',
						datatypes : [ {
							name : 'Subscription',
							fields : [ {
								name : 'subscriptionId',
								type : 'Number (generated)',
								description : 'Unique identifier for a subscription',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the subscribing party (user or organization or consortium)',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the subscribed partner',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
							}, ],
						}, {
							name : 'SubscriptionTransaction',
							fields : [ {
								name : 'subscriptionTransactionId',
								type : 'Number (generated)',
								description : 'Unique identifier for the transaction',
							}, {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription to which the transaction applies',
							}, {
								name : 'transactionDate',
								type : 'Date',
								description : 'The date of the transaction; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'The start date of the subscription before the transaction; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'The expiration date of the subscription before the transaction; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'transactionType',
								type : 'String',
								description : 'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
							}, ],
						}, {
							name : 'ActivationCode',
							fields : [ {
								name : 'activationCodeId',
								type : 'Number (generated)',
								description : 'Unique identifier for the activation code',
							}, {
								name : 'activationCode',
								type : 'String',
								description : 'The activation code token',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner system to which the activation code applies',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party that activated the subscription with the code',
							}, {
								name : 'period',
								type : 'Number',
								description : 'The number of days for the activated subscription (endDate - startDate)',
							}, {
								name : 'purchaseDate',
								type : 'Date',
								description : 'The date of the activation code purchase; format yyyy-mm-ddThh:mm:ssZ',
							}, ],
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
							header : 'Get a Subscription By ID',
							summary : 'Get a specific subscription specified by subscription ID.',
							op : 'GET',
							uri : '/subscriptions/?subscriptionId={id}',
							parameters : [ {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for a subscription',
							}, ],
							body_parameters : [],
							returns : 'an Array of Subscription objects with a single object',
							errors : [{code : '400', message : '{"error":"Essential parameters needed."}', explanation : 'The request had no query parameters.', resolution : 'Supply a valid subscriptionId query parameter in the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/?subscriptionId=123',
						}, {
							header : 'Get Subscription By Partner, IP, and User ID',
							summary : 'Get a set of subscriptions by the combination of the partner id, IP address, and user identifier for the user in the partner system. Gets subscriptions by IP address AND by logged-in user identifier.',
							op : 'GET',
							uri : '/subscriptions/?partnerId={id}&ipAddress={string}&userIdentifier={string}&partyId={id}',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the subscribed partner (required)',
							}, {
								name : 'ipAddress',
								type : 'String',
								description : 'An IP address to look up in the party IP ranges to identify a party (required)',
							}, {
								name : 'userIdentifier',
								type : 'String',
								description : 'A unique id from a logged-in user to identify a party (required)',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for a party, restricts output to specific subscription',
							}, ],
							body_parameters : [],
							returns : 'an Array of Subscription objects',
							errors : [{code : '400', message : '{"error":"Essential parameters needed."}', explanation : 'The request did not contain all of the parameters partnerId, ipAddress, and userIdentifier.', resolution : 'Supply valid filter query parameters in the request.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/?partnerId=tair&ipAddress=150.26.157.48&userIdentifier=1501424090',
						}, {
							header : 'Create or Renew a Subscription',
							summary : 'Create a new subscription or renew an existing one, using an activation code if one is specified.',
							op : 'POST',
							uri : '/subscriptions/',
							parameters : [],
							body_parameters : [ {
								name : 'activationCode',
								type : 'String',
								description : 'Activation code token; must be in ActivationCode table with no party id--that is, not already used',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party using the activation code to create the subscription or otherwise being subscribed (required)',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe (required)',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ (required)',
							}, ],
							returns : 'the created Subscription object',
							errors : [{code : '400', message : '{"message":"activation code is already used"', explanation : 'The activation code has a party id associated with it, meaning it has already activated a subscription.', resolution : 'Supply an unused activation code.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/',
						}, {
							header : 'Update a Subscription',
							summary : 'Update an existing subscription with new data. Use this method with care only to correct a mistake of some kind.',
							op : 'PUT',
							uri : '/subscriptions/?subscriptionId={id}&partyId={id}&partnerId={id}&startDate={date}&endDate={date}',
							parameters : [ {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription to update',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party owning the subscription to update',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
							}, ],
							body_parameters : [{
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party to update (required)',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe (required)',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ (required)',
							}, ],
							returns : 'the updated Subscription object',
							errors : [{code : '200', message : '{"error":"does not allow update without query parameters"}', explanation : 'The request had no query parameters.', resolution : 'Supply at least one query parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/?subscriptionId=3579',
						}, {
							header : 'Delete an Existing Subscription',
							summary : 'Deletes an existing subscription, removing it completely from the database.',
							op : 'DELETE',
							uri : '/subscriptions/?subscriptionId={id}&partyId={id}&partnerId={id}&startDate={date}&endDate={date}',
							parameters : [ {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription to update',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party owning the subscription to update',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '200', message : '{"error":"does not allow delete without query parameters"}', explanation : 'The request had no query parameters.', resolution : 'Supply at least one query parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/?subscriptionId=3579',
						}, {
							header : 'Get All Subscription Transactions',
							summary : 'Get all the subscription transactions in the Phoenix dtabase.',
							op : 'GET',
							uri : '/subscriptions/transactions/',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of SubscriptionTransaction',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/subscriptions/transactions/',
						}, {
							header : 'Get a Set of Subscription Transactions By a Filter',
							summary : 'Get a set of subscription transactions that match any of several parameters: subscriptionTransactionId, subscriptionId, transactionDate, startDate, endDate, or transactionType.',
							op : 'GET',
							uri : '/subscriptions/transactions/?subscriptionTransactionId={id}&subscriptionId={id}&transactionDate={date}&startDate={date}7endDate={date}&transactionType={string}',
							parameters : [ {
								name : 'subscriptionTransactionId',
								type : 'Number',
								description : 'Unique identifier for the transaction',
							}, {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription',
							}, {
								name : 'transactionDate',
								type : 'Date',
								description : 'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'transactionType',
								type : 'String',
								description : 'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
							}, ],
							body_parameters : [],
							returns : 'an Array of SubscriptionTransaction objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/subscriptions/transactions/&subscriptionId=3579',
						}, {
							header : 'Create a SubscriptionTransaction',
							summary : 'Create a subscription transaction',
							op : 'POST',
							uri : '/subscriptions/transactions',
							parameters : [],
							body_parameters : [{
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription (required)',
							}, {
								name : 'transactionDate',
								type : 'Date',
								description : 'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'transactionType',
								type : 'String',
								description : 'The kind of transaction: create, renew, terminate, create_teaching, or create_free (required)',
							}, ],
							returns : 'the created SubscriptionTransaction object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/subscriptions/transactions/',
						}, {
							header : 'Update Existing Subscription Transactions By Filter',
							summary : 'Update fields in existing subscription transactions that match a filter condition.',
							op : 'PUT',
							uri : '/subscriptions/transactions/?subscriptionTransactionId={id}&subscriptionId={id}&transactionDate={date}&startDate={date}7endDate={date}&transactionType={string}',
							parameters : [ {
								name : 'subscriptionTransactionId',
								type : 'Number',
								description : 'Unique identifier for the transaction',
							}, {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription',
							}, {
								name : 'transactionDate',
								type : 'Date',
								description : 'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'transactionType',
								type : 'String',
								description : 'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
							}, ],
							body_parameters : [{
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription (required)',
							}, {
								name : 'transactionDate',
								type : 'Date',
								description : 'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, {
								name : 'transactionType',
								type : 'String',
								description : 'The kind of transaction: create, renew, terminate, create_teaching, or create_free (required)',
							}, ],
							returns : 'an Array of updated SubscriptionTransaction objects',
							errors : [{code : '200', message : '{"error":"does not allow update without query parameters"}', explanation : 'The request had no query parameters.', resolution : 'Supply at least one query parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/transactions/&subscriptionTransactionId=3579',
						}, {
							header : 'Delete Existing Subscription Transactions By Filter',
							summary : 'Delete existing subscription transactions that match a filter condition. Use caution with this API call, please.',
							op : 'DELETE',
							uri : '/subscriptions/transactions/?subscriptionTransactionId={id}&subscriptionId={id}&transactionDate={date}&startDate={date}7endDate={date}&transactionType={string}',
							parameters : [ {
								name : 'subscriptionTransactionId',
								type : 'Number',
								description : 'Unique identifier for the transaction',
							}, {
								name : 'subscriptionId',
								type : 'Number',
								description : 'Unique identifier for the subscription',
							}, {
								name : 'transactionDate',
								type : 'Date',
								description : 'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'startDate',
								type : 'Date',
								description : 'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'endDate',
								type : 'Date',
								description : 'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
							}, {
								name : 'transactionType',
								type : 'String',
								description : 'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '200', message : '{"error":"does not allow delete without query parameters"}', explanation : 'The request had no query parameters.', resolution : 'Supply at least one query parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/transactions/&subscriptionId=3579',
						}, {
							header : 'Get All Activation Codes',
							summary : 'Get all the activation codes currently in the API database.',
							op : 'GET',
							uri : '/subscriptions/activationCodes/',
							parameters : [],
							body_parameters : [],
							returns : 'an Array of ActivationCode objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/subscriptions/activationCodes/',
						}, {
							header : 'Get a Set of Activation Codes By a Filter',
							summary : 'Get a set of activation codes that match any of several parameters: activationCodeId, activationCode, partnerId, partyId, period, or purchaseDate.',
							op : 'GET',
							uri : '/subscriptions/activationCodes/?activationCodeId={id}&activationCode={string}&partnerId={string}&partyId={id}&period={number}&purchaseDate={date}',
							parameters : [ {
								name : 'activationCodeId',
								type : 'Number',
								description : 'Unique identifier for the activation code',
							}, {
								name : 'activationCode',
								type : 'String',
								description : 'The activation code (UUID format)',
							},  {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party that activated the subscription with the code',
							},  {
								name : 'period',
								type : 'Number',
								description : 'Number of days for which the subscription is valid (endDate - startDate)',
							}, {
								name : 'purchaseDate',
								type : 'Date',
								description : 'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ',
							}, ],
							body_parameters : [],
							returns : 'an Array of ActivationCode objects',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/subscriptions/activationCodes/?period=365',
						}, {
							header : 'Create an Activation Code',
							summary : '',
							op : 'POST',
							uri : '/subscriptions/activationCodes/',
							parameters : [],
							body_parameters : [{
								name : 'activationCode',
								type : 'String',
								description : 'The activation code (UUID format) (required)',
							},  {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe (required)',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party that activated the subscription with the code; this value is usually specified in a PUT request, not a POST',
							},  {
								name : 'period',
								type : 'Number',
								description : 'Number of days for which the subscription is valid (endDate - startDate) (required)',
							}, {
								name : 'purchaseDate',
								type : 'Date',
								description : 'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, ],
							returns : 'the created ActivationCode object',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/subscriptions/activationCodes/',
						}, {
							header : 'Update an Existing Set of Activation Codes',
							summary : 'Update a set of existing activation codes that match any of several parameters: activationCodeId, activationCode, partnerId, partyId, period, or purchaseDate.',
							op : 'PUT',
							uri : '/subscriptions/activationCodes/?activationCodeId={id}&activationCode={string}&partnerId={string}&partyId={id}&period={number}&purchaseDate={date}',
							parameters : [ {
								name : 'activationCodeId',
								type : 'Number',
								description : 'Unique identifier for the activation code',
							}, {
								name : 'activationCode',
								type : 'String',
								description : 'The activation code (UUID format)',
							},  {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party that activated the subscription with the code',
							},  {
								name : 'period',
								type : 'Number',
								description : 'Number of days for which the subscription is valid (endDate - startDate)',
							}, {
								name : 'purchaseDate',
								type : 'Date',
								description : 'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ',
							}, ],
							body_parameters : [{
								name : 'activationCode',
								type : 'String',
								description : 'The activation code (UUID format) (required)',
							},  {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe (required)',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party that activated the subscription with the code; this value is usually specified in a PUT request, not a POST',
							},  {
								name : 'period',
								type : 'Number',
								description : 'Number of days for which the subscription is valid (endDate - startDate) (required)',
							}, {
								name : 'purchaseDate',
								type : 'Date',
								description : 'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ (required)',
							}, ],
							returns : 'the updated ActivationCode objects',
							errors : [{code : '200', message : '{"error":"does not allow update without query parameters"}', explanation : 'The request had no query parameters.', resolution : 'Supply at least one query parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/activationCodes/?activationCodeId=3579',
						}, {
							header : 'Delete an Existing Set of Activation Codes',
							summary : 'Delete a set of existing activation codes that match any of several parameters: activationCodeId, activationCode, partnerId, partyId, period, or purchaseDate.',
							op : 'DELETE',
							uri : '/subscriptions/activationCodes/?activationCodeId={id}&activationCode={string}&partnerId={string}&partyId={id}&period={number}&purchaseDate={date}',
							parameters : [ {
								name : 'activationCodeId',
								type : 'Number',
								description : 'Unique identifier for the activation code',
							}, {
								name : 'activationCode',
								type : 'String',
								description : 'The activation code (UUID format)',
							},  {
								name : 'partnerId',
								type : 'String',
								description : 'Unique identifier for the partner to which to subscribe',
							}, {
								name : 'partyId',
								type : 'Number',
								description : 'Unique identifier for the party that activated the subscription with the code',
							},  {
								name : 'period',
								type : 'Number',
								description : 'Number of days for which the subscription is valid (endDate - startDate)',
							}, {
								name : 'purchaseDate',
								type : 'Date',
								description : 'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ',
							}, ],
							body_parameters : [],
							returns : '{"success":"delete complete"}',
							errors : [{code : '200', message : '{"error":"does not allow delete without query parameters"}', explanation : 'The request had no query parameters.', resolution : 'Supply at least one query parameter.'}, ],
							example : 'https://pwapi.arabidopsis.org/subscriptions/activationCodes/?activationCodeId=3579',
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
