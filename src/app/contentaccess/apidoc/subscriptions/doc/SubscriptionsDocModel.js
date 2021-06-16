/**
 * Doc Model
 */

angular.module('platform-ui.contentaccess.apidoc.subscriptions.doc').factory(
  /* Name */
  'SubscriptionsDocModel',

  /* Dependencies */
  [
    function () {
      return {
        heading: 'Subscription API',
        overview:
          'Subscriptions relate parties to partners within a specified date period, expiring at the end date of the period. Subscription transactions track the purchase and renewal history of subscriptions. Activation codes provide a simple mechanism for activating individual subscriptions to a partner on the partner web site. Subscription requests provide a way to request assistance from Phoenix for commercial and institutional subscriptions.',
        datatypes: [
          {
            name: 'Subscription',
            fields: [
              {
                name: 'subscriptionId',
                type: 'Number (generated)',
                description: 'Unique identifier for a subscription',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the subscribing party (user or organization or consortium)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description: 'Unique identifier for the subscribed partner',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
          },
          {
            name: 'SubscriptionWithTransaction',
            fields: [
              {
                name: 'subscriptionId',
                type: 'Number (generated)',
                description: 'Unique identifier for a subscription',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the subscribing party (user or organization or consortium)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description: 'Unique identifier for the subscribed partner',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'subscriptionTransactionId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription transaction resulting from the operation',
              },
            ],
          },
          {
            name: 'SubscriptionTransaction',
            fields: [
              {
                name: 'subscriptionTransactionId',
                type: 'Number (generated)',
                description: 'Unique identifier for the transaction',
              },
              {
                name: 'subscriptionId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription to which the transaction applies',
              },
              {
                name: 'transactionDate',
                type: 'Date',
                description:
                  'The date of the transaction; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'The start date of the subscription before the transaction; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'The expiration date of the subscription before the transaction; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'transactionType',
                type: 'String',
                description:
                  'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
              },
            ],
          },
          {
            name: 'ActivationCode',
            fields: [
              {
                name: 'activationCodeId',
                type: 'Number (generated)',
                description: 'Unique identifier for the activation code',
              },
              {
                name: 'activationCode',
                type: 'String',
                description: 'The activation code token',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner system to which the activation code applies',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party that activated the subscription with the code',
              },
              {
                name: 'period',
                type: 'Number',
                description:
                  'The number of days for the activated subscription (endDate - startDate)',
              },
              {
                name: 'purchaseDate',
                type: 'Date',
                description:
                  'The date of the activation code purchase; format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
          },
          {
            name: 'SubscriptionStatus',
            fields: [
              {
                name: 'expDate',
                type: 'Date',
                description: 'Expiration date of the subscription',
              },
              {
                name: 'subscribed',
                type: 'String',
                description: 'True if the subscription is active, false if not',
              },
            ],
          },
          {
            name: 'SubscriptionRequest',
            fields: [
              {
                name: 'subscriptionRequestId',
                type: 'Number (generated)',
                description: 'Unique identifier for the subscription request',
              },
              {
                name: 'requestDate',
                type: 'Date',
                description:
                  'Date of the subscription request; format mm/dd/yyyy',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'First name of the requestor',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'Last name of the requestor',
              },
              {
                name: 'email',
                type: 'String',
                description: 'Email of the requestor',
              },
              {
                name: 'institution',
                type: 'String',
                description:
                  'Institution for which a subscription is requested',
              },
              {
                name: 'librarianName',
                type: 'String',
                description: 'Name of a librarian contact at the institution',
              },
              {
                name: 'librarianEmail',
                type: 'String',
                description: 'Email of a librarian contact at the institution',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments on the request',
              },
              {
                name: 'partnerId',
                type: 'String',
                description: 'Unique identifer for the requested partner',
              },
              {
                name: 'requestType',
                type: 'String',
                description: 'The kind of request: subscription or renewal',
              },
            ],
          } /*{
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
								}, */,
        ],
        calls: [
          {
            header: 'Get a Subscription By ID',
            summary:
              'Get a specific subscription specified by subscription ID.',
            op: 'GET',
            uri: '/subscriptions/?subscriptionId={id}',
            parameters: [
              {
                name: 'subscriptionId',
                type: 'Number',
                description: 'Unique identifier for a subscription (required)',
              },
            ],
            body_parameters: [],
            returns: 'an Array of Subscription objects with a single object',
            errors: [
              {
                code: '400',
                message: '{"error":"Essential parameters needed."}',
                explanation: 'The request had no query parameters.',
                resolution:
                  'Supply a valid subscriptionId query parameter in the request.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/?subscriptionId=123',
          },
          {
            header: 'Get Subscription By Partner, IP, and User ID',
            summary:
              'Get a set of subscriptions by the combination of the partner id, IP address, and user identifier for the user in the partner system. Gets subscriptions by IP address AND by logged-in user identifier.',
            op: 'GET',
            uri:
              '/subscriptions/?partnerId={id}&ipAddress={string}&userIdentifier={string}&partyId={id}',
            parameters: [
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the subscribed partner (required)',
              },
              {
                name: 'ipAddress',
                type: 'String',
                description:
                  'An IP address to look up in the party IP ranges to identify a party (required)',
              },
              {
                name: 'userIdentifier',
                type: 'String',
                description:
                  'A unique id from a logged-in user to identify a party (required)',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for a party, restricts output to specific subscription',
              },
            ],
            body_parameters: [],
            returns: 'an Array of Subscription objects',
            errors: [
              {
                code: '400',
                message: '{"error":"Essential parameters needed."}',
                explanation:
                  'The request did not contain all of the parameters partnerId, ipAddress, and userIdentifier.',
                resolution:
                  'Supply valid filter query parameters in the request.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/?partnerId=tair&ipAddress=150.26.157.48&userIdentifier=1501424090',
          },
          {
            header: 'Create or Renew a Subscription',
            summary:
              'Create a new subscription or renew an existing one, using an activation code if one is specified.',
            op: 'POST',
            uri: '/subscriptions/',
            parameters: [],
            body_parameters: [
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the subscribing party (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe (required but ignored if activation code specified; the activation code partner id takes precedence)',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'activationCode',
                type: 'String',
                description:
                  'An activation code previously created for the partner.',
              },
            ],
            returns: 'the created Subscription object',
            errors: [
              {
                code: '400',
                message: '{"message":"activation code is already used"',
                explanation:
                  'The activation code has a party id associated with it, meaning it has already activated a subscription.',
                resolution: 'Supply an unused activation code.',
              },
            ],
            example: 'https://pwapi.arabidopsis.org/subscriptions/',
          },
          {
            header: 'Update a Set of Subscriptions By Filter',
            summary:
              'Update a set of existing subscriptions identified by matches with filter parameters. Use this method with care only to correct a mistake of some kind.',
            op: 'PUT',
            uri:
              '/subscriptions/?subscriptionId={id}&partyId={id}&partnerId={id}&startDate={date}&endDate={date}',
            parameters: [
              {
                name: 'subscriptionId',
                type: 'Number',
                description: 'Unique identifier for the subscription to update',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party owning the subscription to update',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
            body_parameters: [
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party to update (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe (required)',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ (required)',
              },
            ],
            returns: 'the updated Subscription object',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow update without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution: 'Supply at least one query parameter.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/?subscriptionId=3579',
          },
          {
            header: 'Delete a Set of Existing Subscriptions By Filter',
            summary:
              'Delete a set of existing subscriptions identified by matching filtering parameters, removing the subscriptions from the database.',
            op: 'DELETE',
            uri:
              '/subscriptions/?subscriptionId={id}&partyId={id}&partnerId={id}&startDate={date}&endDate={date}',
            parameters: [
              {
                name: 'subscriptionId',
                type: 'Number',
                description: 'Unique identifier for the subscription to update',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party owning the subscription to update',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
            body_parameters: [],
            returns: '{"success":"delete complete"}',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow delete without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution: 'Supply at least one query parameter.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/?subscriptionId=3579',
          },
          {
            header: 'Get All Subscription Transactions',
            summary:
              'Get all the subscription transactions in the Phoenix database.',
            op: 'GET',
            uri: '/subscriptions/transactions/',
            parameters: [],
            body_parameters: [],
            returns: 'an Array of SubscriptionTransaction',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/transactions/',
          },
          {
            header: 'Get a Set of Subscription Transactions By Filter',
            summary:
              'Get a set of subscription transactions that match any of several parameters: subscriptionTransactionId, subscriptionId, transactionDate, startDate, endDate, or transactionType.',
            op: 'GET',
            uri:
              '/subscriptions/transactions/?subscriptionTransactionId={id}&subscriptionId={id}&transactionDate={date}&startDate={date}&endDate={date}&transactionType={string}',
            parameters: [
              {
                name: 'subscriptionTransactionId',
                type: 'Number',
                description: 'Unique identifier for the transaction',
              },
              {
                name: 'subscriptionId',
                type: 'Number',
                description: 'Unique identifier for the subscription',
              },
              {
                name: 'transactionDate',
                type: 'Date',
                description:
                  'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'transactionType',
                type: 'String',
                description:
                  'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
              },
            ],
            body_parameters: [],
            returns: 'an Array of SubscriptionTransaction objects',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/transactions/&subscriptionId=3579',
          },
          {
            header: 'Create a SubscriptionTransaction',
            summary: 'Create a subscription transaction.',
            op: 'POST',
            uri: '/subscriptions/transactions',
            parameters: [],
            body_parameters: [
              {
                name: 'subscriptionId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription (required)',
              },
              {
                name: 'transactionDate',
                type: 'Date',
                description:
                  'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'transactionType',
                type: 'String',
                description:
                  'The kind of transaction: create, renew, terminate, create_teaching, or create_free (required)',
              },
            ],
            returns: 'the created SubscriptionTransaction object',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/transactions/',
          },
          {
            header: 'Update Existing Subscription Transactions By Filter',
            summary:
              'Update fields in existing subscription transactions that match a filter condition.',
            op: 'PUT',
            uri:
              '/subscriptions/transactions/?subscriptionTransactionId={id}&subscriptionId={id}&transactionDate={date}&startDate={date}&endDate={date}&transactionType={string}',
            parameters: [
              {
                name: 'subscriptionTransactionId',
                type: 'Number',
                description: 'Unique identifier for the transaction',
              },
              {
                name: 'subscriptionId',
                type: 'Number',
                description: 'Unique identifier for the subscription',
              },
              {
                name: 'transactionDate',
                type: 'Date',
                description:
                  'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'transactionType',
                type: 'String',
                description:
                  'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
              },
            ],
            body_parameters: [
              {
                name: 'subscriptionId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription (required)',
              },
              {
                name: 'transactionDate',
                type: 'Date',
                description:
                  'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'transactionType',
                type: 'String',
                description:
                  'The kind of transaction: create, renew, terminate, create_teaching, or create_free (required)',
              },
            ],
            returns: 'an Array of updated SubscriptionTransaction objects',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow update without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution: 'Supply at least one query parameter.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/transactions/&subscriptionTransactionId=3579',
          },
          {
            header: 'Delete Existing Subscription Transactions By Filter',
            summary:
              'Delete existing subscription transactions that match a filter condition. Use caution with this API call, please.',
            op: 'DELETE',
            uri:
              '/subscriptions/transactions/?subscriptionTransactionId={id}&subscriptionId={id}&transactionDate={date}&startDate={date}&endDate={date}&transactionType={string}',
            parameters: [
              {
                name: 'subscriptionTransactionId',
                type: 'Number',
                description: 'Unique identifier for the transaction',
              },
              {
                name: 'subscriptionId',
                type: 'Number',
                description: 'Unique identifier for the subscription',
              },
              {
                name: 'transactionDate',
                type: 'Date',
                description:
                  'Date on which the transaction took place in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Start date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'End date of the subscription as it was before the transaction; in date format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'transactionType',
                type: 'String',
                description:
                  'The kind of transaction: create, renew, terminate, create_teaching, or create_free',
              },
            ],
            body_parameters: [],
            returns: '{"success":"delete complete"}',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow delete without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution: 'Supply at least one query parameter.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/transactions/&subscriptionId=3579',
          },
          {
            header: 'Get All Activation Codes',
            summary:
              'Get all the activation codes currently in the API database.',
            op: 'GET',
            uri: '/subscriptions/activationCodes/',
            parameters: [],
            body_parameters: [],
            returns: 'an Array of ActivationCode objects',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activationCodes/',
          },
          {
            header: 'Get a Set of Activation Codes By Filter',
            summary:
              'Get a set of activation codes that match any of several parameters: activationCodeId, activationCode, partnerId, partyId, period, or purchaseDate.',
            op: 'GET',
            uri:
              '/subscriptions/activationCodes/?activationCodeId={id}&activationCode={string}&partnerId={string}&partyId={id}&period={number}&purchaseDate={date}',
            parameters: [
              {
                name: 'activationCodeId',
                type: 'Number',
                description: 'Unique identifier for the activation code',
              },
              {
                name: 'activationCode',
                type: 'String',
                description: 'The activation code',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party that activated the subscription with the code',
              },
              {
                name: 'period',
                type: 'Number',
                description:
                  'Number of days for which the subscription is valid (endDate - startDate)',
              },
              {
                name: 'purchaseDate',
                type: 'Date',
                description:
                  'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
            body_parameters: [],
            returns: 'an Array of ActivationCode objects',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activationCodes/?period=365',
          },
          {
            header: 'Generate a Set of Activation Codes for a Partner',
            summary: '',
            op: 'GET',
            uri:
              '/subscriptions/activationCodeGenerator/?quantity={number}&period={number}&partnerId={string}',
            parameters: [
              {
                name: 'quantity',
                type: 'Number',
                description:
                  'Number of activation codes to generate (maximum 99)',
              },
              {
                name: 'period',
                type: 'Number',
                description: 'Number of days in the subscription',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe with the codes',
              },
            ],
            body_parameters: [],
            returns: 'an Array of String activation codes',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activationCodeGenerator/?quantity=10&period=30&partnerId=tair',
          },
          {
            header: 'Create an Activation Code',
            summary: '',
            op: 'POST',
            uri: '/subscriptions/activationCodes/',
            parameters: [],
            body_parameters: [
              {
                name: 'activationCode',
                type: 'String',
                description: 'The activation code (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe (required)',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party that activated the subscription with the code; this value is usually specified in a PUT request, not a POST',
              },
              {
                name: 'period',
                type: 'Number',
                description:
                  'Number of days for which the subscription is valid (endDate - startDate) (required)',
              },
              {
                name: 'purchaseDate',
                type: 'Date',
                description:
                  'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
            ],
            returns: 'the created ActivationCode object',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activationCodes/',
          },
          {
            header: 'Update an Existing Set of Activation Codes By Filter',
            summary:
              'Update a set of existing activation codes that match any of several filter parameters: activationCodeId, activationCode, partnerId, partyId, period, or purchaseDate.',
            op: 'PUT',
            uri:
              '/subscriptions/activationCodes/?activationCodeId={id}&activationCode={string}&partnerId={string}&partyId={id}&period={number}&purchaseDate={date}',
            parameters: [
              {
                name: 'activationCodeId',
                type: 'Number',
                description: 'Unique identifier for the activation code',
              },
              {
                name: 'activationCode',
                type: 'String',
                description: 'The activation code',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party that activated the subscription with the code',
              },
              {
                name: 'period',
                type: 'Number',
                description:
                  'Number of days for which the subscription is valid (endDate - startDate)',
              },
              {
                name: 'purchaseDate',
                type: 'Date',
                description:
                  'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
            body_parameters: [
              {
                name: 'activationCode',
                type: 'String',
                description: 'The activation code (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe (required)',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party that activated the subscription with the code',
              },
              {
                name: 'period',
                type: 'Number',
                description:
                  'Number of days for which the subscription is valid (endDate - startDate) (required)',
              },
              {
                name: 'purchaseDate',
                type: 'Date',
                description:
                  'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ (required)',
              },
            ],
            returns: 'the updated ActivationCode objects',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow update without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution: 'Supply at least one query parameter.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activationCodes/?activationCodeId=3579',
          },
          {
            header: 'Delete an Existing Set of Activation Codes By Filter',
            summary:
              'Delete a set of existing activation codes that match any of several filter parameters: activationCodeId, activationCode, partnerId, partyId, period, or purchaseDate.',
            op: 'DELETE',
            uri:
              '/subscriptions/activationCodes/?activationCodeId={id}&activationCode={string}&partnerId={string}&partyId={id}&period={number}&purchaseDate={date}',
            parameters: [
              {
                name: 'activationCodeId',
                type: 'Number',
                description: 'Unique identifier for the activation code',
              },
              {
                name: 'activationCode',
                type: 'String',
                description: 'The activation code',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe',
              },
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the party that activated the subscription with the code',
              },
              {
                name: 'period',
                type: 'Number',
                description:
                  'Number of days for which the subscription is valid (endDate - startDate)',
              },
              {
                name: 'purchaseDate',
                type: 'Date',
                description:
                  'Date of subscription purchase; in date format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
            body_parameters: [],
            returns: '{"success":"delete complete"}',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow delete without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution: 'Supply at least one query parameter.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activationCodes/?activationCodeId=3579',
          },
          {
            header: 'Renew a Subscription',
            summary:
              'Renew a subscription specified by its ID, creating a renew subscription transaction. If you do not specify the start date or end date as body parameters, the values remain unchanged.',
            op: 'PUT',
            uri: '/subscriptions/{id}/renewal/',
            parameters: [
              {
                name: 'id',
                type: 'Number',
                description:
                  'Unique identifier for the subscription (required)',
              },
            ],
            body_parameters: [
              {
                name: 'partyId',
                type: 'Number',
                description:
                  'Unique identifier for the subscribing party (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifier for the partner to which to subscribe (required)',
              },
              {
                name: 'startDate',
                type: 'Date',
                description:
                  'Date on which the subscription begins; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'endDate',
                type: 'Date',
                description:
                  'Date on which the subscription expires; format yyyy-mm-ddThh:mm:ssZ',
              },
            ],
            returns: 'a SubscriptionWithTransactionId object',
            errors: [
              {
                code: '400',
                message:
                  '{"partyId":["This field is required."],"partnerId":["This field is required."]}',
                explanation:
                  'You did not specify a party id or a partnerId in the request body.',
                resolution:
                  'Supply valid, form-encoded values for partnerId and partyId in the request body.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/1445/renewal/',
          },
          {
            header: 'Get the Payment Page as HTML',
            summary:
              'Get the HTML payment page, filling in details as specified in the request.',
            op: 'GET',
            uri: '/subscriptions/payments/?termId={id}&quantity={number}',
            parameters: [
              {
                name: 'termiId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription term (required)',
              },
              {
                name: 'quantity',
                type: 'Number',
                description:
                  'Number of activation codes to generate (required)',
              },
            ],
            body_parameters: [],
            returns: 'an HTML payment page',
            errors: [
              {
                code: '400',
                message: 'error: no termId',
                explanation: 'There is no termId query parameter.',
                resolution: 'Supply a valid termId parameter in the request',
              },
              {
                code: '400',
                message: 'error: no quantity specified',
                explanation: 'There is no quantity query parameter.',
                resolution: 'Supply a valid quantity parameter in the request',
              },
              {
                code: '400',
                message: 'error: unable to get term price',
                explanation: 'The term id does not identify a valid term.',
                resolution: 'Correct the term id value.',
              },
              {
                code: '400',
                message: 'error: quantity must be between 1 and 99',
                explanation: 'The quantity is not between 1 and 99.',
                resolution:
                  'Correct the quantity to be between 1 and 99, inclusive.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/payments/?termId=20&quantity=5',
          },
          {
            header:
              'Submit a Payment to Stripe and Email Activation Codes to Subscriber',
            summary:
              'Submit a payment for a set of activation codes to the Stripe merchant processing service, and if payment succeeds, send an email to the user containing the purchased activation codes.',
            op: 'POST',
            uri: '/subscriptions/payments/',
            parameters: [],
            body_parameters: [
              {
                name: 'stripeToken',
                type: 'String',
                description:
                  'a single-use token from Stripe.card.createToken() encapsulating user information that you can safely pass to the API to charge the user (required)',
              },
              {
                name: 'price',
                type: 'Number',
                description: 'The total amount to charge in dollars (required)',
              },
              {
                name: 'termId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription term (required)',
              },
              {
                name: 'quantity',
                type: 'Number',
                description:
                  'Number of activation codes to purchase (required)',
              },
              {
                name: 'email',
                type: '',
                description:
                  'The email to which to send activation codes and payment notifications (required)',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'First name of the paying user (required)',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'Last name of the paying user (required)',
              },
              {
                name: 'institute',
                type: 'String',
                description:
                  'Organization to which the user belongs (required)',
              },
              {
                name: 'street',
                type: 'String',
                description: 'Street address (required)',
              },
              {
                name: 'city',
                type: 'String',
                description: 'City (required)',
              },
              {
                name: 'state',
                type: 'String',
                description: 'State (required)',
              },
              {
                name: 'country',
                type: 'String',
                description: 'Country (required)',
              },
              {
                name: 'zip',
                type: 'String',
                description: 'Postal code (required)',
              },
              {
                name: 'other',
                type: 'String',
                description: 'VAT terms or other comments about the purchase',
              },
              {
                name: 'domain',
                type: 'String',
                description:
                  'Host name of the server to which to direct the user to use the activation codes',
              },
            ],
            returns:
              '{"status":"{string}} where string is a Stripe status message"',
            errors: [
              {
                code: '400',
                message: '{"message":"Charge validation error"}',
                explanation:
                  'The supplied total amount does not match the term price times the quantity ordered times the group discount rate.',
                resolution: 'Correct the supplied price.',
              },
              {
                code: '400',
                message: '{"message":"{string}"',
                explanation: 'Stripe returned an error message.',
                resolution:
                  'Correct the problem as directed by the Stripe error message.',
              },
            ],
            example: 'https://pwapi.arabidopsis.org/subscriptions/payments/',
          },
          {
            header:
              'Send an Email to Phoenix Requesting Institutional Subscription',
            summary: '',
            op: 'POST',
            uri: '/subscriptions/institutions/',
            parameters: [],
            body_parameters: [
              {
                name: 'partnerName',
                type: 'String',
                description:
                  'The partner to which the institution wants to subscribe',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments about the request',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'The first name of the user',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'The last name of the user',
              },
              {
                name: 'email',
                type: 'String',
                description: 'The email of the user',
              },
              {
                name: 'institution',
                type: 'String',
                description:
                  'The name of the institution requesting subscription',
              },
              {
                name: 'librarianName',
                type: 'String',
                description: 'The name of the institutional librarian',
              },
              {
                name: 'librarianEmail',
                type: 'String',
                description: 'The email of the institutional librarian',
              },
            ],
            returns: '{"message":"success"}',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/institutions/',
          },
          {
            header:
              'Send an Email to Phoenix Requesting Commercial Subscription',
            summary: '',
            op: 'POST',
            uri: '/subscriptions/commercials/',
            parameters: [],
            body_parameters: [
              {
                name: 'partnerName',
                type: 'String',
                description:
                  'The partner to which the company wants to subscribe',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments about the request',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'The first name of the user',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'The last name of the user',
              },
              {
                name: 'email',
                type: 'String',
                description: 'The email of the user',
              },
              {
                name: 'institution',
                type: 'String',
                description: 'The name of the company requesting subscription',
              },
              {
                name: 'individualLicense',
                type: 'String',
                description:
                  'Whether the request is for an individual license (true)',
              },
              {
                name: 'companyLicense',
                type: 'String',
                description:
                  'Whether the request is for an entire company (true)',
              },
            ],
            returns: '{"message":"success"}',
            errors: [],
            example: 'https://pwapi.arabidopsis.org/subscriptions/commercials/',
          },
          {
            header: 'Get Subscription Status of Requestor',
            summary:
              'Get the expiration date and subscription status of a requestor based on IP address or login status based on user identifier; if multiple subscriptions apply, date and status of the expiration furthest in the future.',
            op: 'GET',
            uri:
              '/subscriptions/enddate/?partnerId={id}&ipAddress={string}&userIdentifier={string}',
            parameters: [
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique id of the partner with the subscription to check',
              },
              {
                name: 'ipAddress',
                type: 'String',
                description: 'The IPv4 or IPv6 address of the requestor',
              },
              {
                name: 'userIdentifier',
                type: 'String',
                description:
                  'The user identifier that identifies a logged-in user to the partner (required but may be empty if not logged in)',
              },
            ],
            body_parameters: [],
            returns: 'a SubscriptionStatus object',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/enddate/?partnerId=tair&ipAddress=167.254.2.0&userIdentifier=',
          },
          {
            header:
              'Get Active Subscriptions To Partner By IP Address and/or User Identfier',
            summary:
              'Get all the active subscriptions to a partner using the request IP address and/or an optional user identifier for an authenticated user.',
            op: 'GET',
            uri:
              '/subscriptions/active/?partnerId={id}&ipAddress={string}&userIdentifier={string}',
            parameters: [
              {
                name: 'partnerId',
                type: 'String',
                description: 'Unique identifier for the partner (required)',
              },
              {
                name: 'ipAddress',
                type: 'String',
                description: 'IPv4 or IPv6 IP address (required)',
              },
              {
                name: 'userIdentifier',
                type: 'String',
                description:
                  'Unique identifier for the party in the partner system (required but may be empty if party not authenticated)',
              },
            ],
            body_parameters: [],
            returns: 'an Array of Subscription objects',
            errors: [
              {
                code: '500',
                message: '<h1>Server Error (500)</h1>',
                explanation:
                  'The request did not include all three required parameters.',
                resolution:
                  'Supply partnerId, ipAddress, and userIdentifier query parameters in the request.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/active/?partnerId=tair&ipAddress=67.170.218.66&userIdentifier=12345',
          },
          {
            header: 'Get All Active Subscriptions By Party',
            summary:
              'Get all the active subscriptions that apply to a specified party.',
            op: 'GET',
            uri: '/subscriptions/activesubscriptions/{id}/?',
            parameters: [
              {
                name: 'id',
                type: 'Number',
                description:
                  'Unique identifier for the party for which to get active subscriptions',
              },
            ],
            body_parameters: [],
            returns:
              'a Subscription object as the value of a field named with the partner id: {"tair": {"partyId": 31767, "subscriptionId": 4943, "partnerId": "tair", "endDate": "2017-12-31T12:00:00Z", "startDate": "2015-01-01T12:00:00Z"}}',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/activesubscriptions/31767/',
          },
          {
            header: 'Get All Subscriptions By Party',
            summary:
              'Get all the subscriptions that apply to a specified party, whether or not active.',
            op: 'GET',
            uri: '/subscriptions/allsubscriptions/{id}/?',
            parameters: [
              {
                name: 'id',
                type: 'Number',
                description:
                  'Unique identifier for the party for which to get all subscriptions, whether or not active',
              },
            ],
            body_parameters: [],
            returns:
              'a Subscription object as the value of a field named with the partner id: {"tair": {"partyId": 31767, "subscriptionId": 4943, "partnerId": "tair", "endDate": "2017-12-31T12:00:00Z", "startDate": "2015-01-01T12:00:00Z"}}',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/allsubscriptions/31767/',
          },
          {
            header: 'Get All Active Subscriptions By Party Consortium',
            summary:
              'Get all the active subscriptions that apply to a specified party.',
            op: 'GET',
            uri: '/subscriptions/consactsubscriptions/{id}/?',
            parameters: [
              {
                name: 'id',
                type: 'Number',
                description:
                  'Unique identifier for the party with a consortium for which to get active subscriptions (required)',
              },
            ],
            body_parameters: [],
            returns:
              'an Array of Subscription objects as the value of a field named with the partner id: {"tair": [{"partyId": 31767, "subscriptionId": 4943, "partnerId": "tair", "endDate": "2017-12-31T12:00:00Z", "startDate": "2015-01-01T12:00:00Z"}]}',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/consactsubscriptions/31156/',
          },
          {
            header: 'Send Subscription Request Email to Phoenix',
            summary:
              'Send an email to Phoenix with contact information from a user requesting a subcription.',
            op: 'POST',
            uri: '/subscriptions/request/',
            parameters: [],
            body_parameters: [
              {
                name: 'partnerName',
                type: 'String',
                description:
                  'The name of the partner for which the party is requesting a subscription',
              },
              {
                name: 'partyName',
                type: 'String',
                description: 'The name of the requesting party',
              },
              {
                name: 'email',
                type: 'String',
                description: 'The email of the requesting party',
              },
              {
                name: 'partyType',
                type: 'String',
                description:
                  'The kind of party (user, commercial, institution, consortium)',
              },
              {
                name: 'comments',
                type: 'String',
                description:
                  'Text with comments about the subscription request',
              },
            ],
            returns: '{"message":"success"}',
            errors: [],
            example: 'https://pwapi.arabidopsis.org/subscriptions/request/',
          },
          {
            header: 'Send Subscription Renewal Request Email to Phoenix',
            summary:
              'Send an email to Phoenix with contact information from a user requesting to renew a subcription.',
            op: 'POST',
            uri: '/subscriptions/renew/',
            parameters: [],
            body_parameters: [
              {
                name: 'partnerName',
                type: 'String',
                description:
                  'The name of the partner for which the party is requesting renewal',
              },
              {
                name: 'partyName',
                type: 'String',
                description: 'The name of the requesting party',
              },
              {
                name: 'email',
                type: 'String',
                description: 'The email of the requesting party',
              },
              {
                name: 'partyType',
                type: 'String',
                description:
                  'The kind of party (user, commercial, institution, consortium)',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Text with comments about the renewal request',
              },
            ],
            returns: '{"message":"success"}',
            errors: [],
            example: 'https://pwapi.arabidopsis.org/subscriptions/renew/',
          },
          {
            header: 'Download a CSV File with All Subscription Requests',
            summary: '',
            op: 'GET',
            uri: '/subscriptions/subscriptionrequest/',
            parameters: [],
            body_parameters: [],
            returns: 'CSV file containing SubscriptionRequest object data',
            errors: [],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/subscriptionrequest/',
          },
          {
            header: 'Create a Subscription Request',
            summary: 'Create and save a subscription request to the database.',
            op: 'POST',
            uri: '/subscriptions/subscriptionrequest/',
            parameters: [],
            body_parameters: [
              {
                name: 'requestDate',
                type: 'Date',
                description:
                  'Date of the subscription request; format mm/dd/yyyy (required)',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'First name of the requestor (required)',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'Last name of the requestor (required)',
              },
              {
                name: 'email',
                type: 'String',
                description: 'Email of the requestor (required)',
              },
              {
                name: 'institution',
                type: 'String',
                description:
                  'Institution for which a subscription is requested (required)',
              },
              {
                name: 'librarianName',
                type: 'String',
                description:
                  'Name of a librarian contact at the institution (required)',
              },
              {
                name: 'librarianEmail',
                type: 'String',
                description:
                  'Email of a librarian contact at the institution (required)',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments on the request (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifer for the requested partner (required)',
              },
              {
                name: 'requestType',
                type: 'String',
                description:
                  'The kind of request: subscription or renewal (required)',
              },
            ],
            returns: 'The created SubscriptionTransaction object',
            errors: [
              {
                code: '400',
                message: '{"error":"serializer error"}',
                explanation:
                  'A parameter in the request body was missing or invalid.',
                resolution:
                  'Supply all required body parameters or correct any invalid ones.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/subscriptionrequest/',
          },
          {
            header: 'Update an Existing Set of Subscription Requests By Filter',
            summary:
              'Update a set of subscription requests identified by a set of filter parameters.',
            op: 'PUT',
            uri:
              '/subscriptions/subscriptionrequest/?subscriptionRequestId={id}&requestDate={date}&firstName={string}&lastName={string}&email={string}&institution={string}&librarianName={string}&librarianEmail={string}&comments={string}&partnerId={id}&requestType={string}',
            parameters: [
              {
                name: 'subscriptionRequestId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription request to update',
              },
              {
                name: 'requestDate',
                type: 'Date',
                description:
                  'Date of the subscription request; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'First name of the requestor',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'Last name of the requestor',
              },
              {
                name: 'email',
                type: 'String',
                description: 'Email of the requestor',
              },
              {
                name: 'institution',
                type: 'String',
                description:
                  'Institution for which a subscription is requested',
              },
              {
                name: 'librarianName',
                type: 'String',
                description: 'Name of a librarian contact at the institution',
              },
              {
                name: 'librarianEmail',
                type: 'String',
                description: 'Email of a librarian contact at the institution',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments on the request',
              },
              {
                name: 'partnerId',
                type: 'String',
                description: 'Unique identifer for the requested partner',
              },
              {
                name: 'requestType',
                type: 'String',
                description: 'The kind of request: subscription or renewal',
              },
            ],
            body_parameters: [
              {
                name: 'requestDate',
                type: 'Date',
                description:
                  'Date of the subscription request; format yyyy-mm-ddThh:mm:ssZ (required)',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'First name of the requestor (required)',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'Last name of the requestor (required)',
              },
              {
                name: 'email',
                type: 'String',
                description: 'Email of the requestor (required)',
              },
              {
                name: 'institution',
                type: 'String',
                description:
                  'Institution for which a subscription is requested (required)',
              },
              {
                name: 'librarianName',
                type: 'String',
                description:
                  'Name of a librarian contact at the institution (required)',
              },
              {
                name: 'librarianEmail',
                type: 'String',
                description:
                  'Email of a librarian contact at the institution (required)',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments on the request (required)',
              },
              {
                name: 'partnerId',
                type: 'String',
                description:
                  'Unique identifer for the requested partner (required)',
              },
              {
                name: 'requestType',
                type: 'String',
                description:
                  'The kind of request: subscription or renewal (required)',
              },
            ],
            returns: 'the SubscriptionRequest object with updated values',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow update without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution:
                  'Specify at least one filter query parameter in the request.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/subscriptionrequest/?subscriptionRequestId=1',
          },
          {
            header: 'Delete an Existing Set of Subscription Requests By Filter',
            summary:
              'Delete a set of subscription requests identified by a set of filter parameters.',
            op: 'DELETE',
            uri:
              '/subscriptions/subscriptionrequest/?subscriptionRequestId={id}&requestDate={date}&firstName={string}&lastName={string}&email={string}&institution={string}&librarianName={string}&librarianEmail={string}&comments={string}&partnerId={id}&requestType={string}',
            parameters: [
              {
                name: 'subscriptionRequestId',
                type: 'Number',
                description:
                  'Unique identifier for the subscription request to update',
              },
              {
                name: 'requestDate',
                type: 'Date',
                description:
                  'Date of the subscription request; format yyyy-mm-ddThh:mm:ssZ',
              },
              {
                name: 'firstName',
                type: 'String',
                description: 'First name of the requestor',
              },
              {
                name: 'lastName',
                type: 'String',
                description: 'Last name of the requestor',
              },
              {
                name: 'email',
                type: 'String',
                description: 'Email of the requestor',
              },
              {
                name: 'institution',
                type: 'String',
                description:
                  'Institution for which a subscription is requested',
              },
              {
                name: 'librarianName',
                type: 'String',
                description: 'Name of a librarian contact at the institution',
              },
              {
                name: 'librarianEmail',
                type: 'String',
                description: 'Email of a librarian contact at the institution',
              },
              {
                name: 'comments',
                type: 'String',
                description: 'Comments on the request',
              },
              {
                name: 'partnerId',
                type: 'String',
                description: 'Unique identifer for the requested partner',
              },
              {
                name: 'requestType',
                type: 'String',
                description: 'The kind of request: subscription or renewal',
              },
            ],
            body_parameters: [],
            returns: '{"success":"delete complete"}',
            errors: [
              {
                code: '200',
                message:
                  '{"error":"does not allow delete without query parameters"}',
                explanation: 'The request had no query parameters.',
                resolution:
                  'Specify at least one filter query parameter in the request.',
              },
            ],
            example:
              'https://pwapi.arabidopsis.org/subscriptions/subscriptionrequest/?subscriptionRequestId=1',
          } /*{
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
								}, */,
        ],
      }
    },
  ]
)
