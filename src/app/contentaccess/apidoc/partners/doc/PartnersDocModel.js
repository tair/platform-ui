/**
 * Doc Model
 */

angular
		.module('platform-ui.contentaccess.apidoc.partners.doc')
		.factory(
				/* Name */
				'PartnersDocModel',

				/* Dependencies */
				[ function() {
					return {
						heading : 'Partner API',
						overview : 'A partner is a scientific data or informatics system that makes up a unit for subscription, authentication, and authorization.',
						elements : [
								'The partner specifies branding elements like logo, login-page text, and email text.',
								'The partner offers its resources through a well-defined set of URIs. ',
								'Each partner has a set of regular expressions that identifies these base URIs.',
								'Partners have individual subscription terms for display on subscription pages.',
								'Terms have period, price, and group discount percentage.',
								'Partners have access rules that identify sets of URIs with regular expressions that are Paid resources or Login-Required Resources.',
								'A Paid resource requires a subscription. A Login-Required resource requires the user to log in, usually because the resource needs the identity of the user for attribution for some reason.',
								'Note that individual subscriptions use login to authenticate for access to Paid resources, but this is independent of rules requiring login to access resources.',
								'Login-Required resources can be Paid resources as well.', ],
						datatypes : [ {
							name : 'Partner',
							fields : [ {
								name : 'partnerId',
								type : 'String',
								description : 'unique partner name, such as tair; all-lowercase',
							}, {
								name : 'name',
								type : 'String',
								description : 'partner name to display on site pages',
							}, {
								name : 'logoUri',
								type : 'String',
								description : 'URI for the partner logo to display on site pages',
							}, {
								name : 'homeUri',
								type : 'String',
								description : 'URI of the partner home or landing page',
							}, {
								name : 'termOfServiceUri',
								type : 'String',
								description : 'URI of the partner terms-of-service or license page',
							}, {
								name : 'description',
								type : 'String',
								description : 'short text summarizing partner system to display on site pages',
							}, {
								name : 'loginUri',
								type : 'String',
								description : 'URI of the login page; null means no support for login',
							}, {
								name : 'defaultLoginRedirect',
								type : 'String',
								description : 'URI to which to redirect when system does not supply a redirect',
							}, {
								name : 'uiUri',
								type : 'String',
								description : 'Scheme and authority (protocol and host/port) for user interface requests',
							}, {
								name : 'uiMeterUri',
								type : 'String',
								description : 'URI for the metering page',
							}, {
								name : 'registerUri',
								type : 'String',
								description : 'URI for the partner registration page',
							}, {
								name : 'subscriptionListDesc',
								type : 'String',
								description : 'Text to display on list of subscribing institutions',
							}, {
								name : 'registerText',
								type : 'String',
								description : 'Text of link to partner registration system',
							}, {
								name : 'forgotUserNameEmailTo',
								type : 'String',
								description : 'Email address to which to send forgot-username emails',
							}, {
								name : 'forgotUserNameEmailSubject',
								type : 'String',
								description : 'Subject of forgot-username emails',
							}, {
								name : 'forgotUserNameEmailBody',
								type : 'String',
								description : 'Body of forgot-username emails',
							}, {
								name : 'forgotUserNameText',
								type : 'String',
								description : 'Text of link to request forgot-username email',
							}, {
								name : 'activationEmailInstructionText',
								type : 'String',
								description : 'Body of activation email giving instructions for using activation code',
							}, {
								name : 'loginUserNameFieldPrompt',
								type : 'String',
								description : 'Prompt for username field on login page',
							}, {
								name : 'loginPasswordFieldPrompt',
								type : 'String',
								description : 'Prompt for password field on login page',
							}, {
								name : 'resetPasswordEmailBody',
								type : 'String',
								description : 'Body of reset-password emails',
							}, {
								name : 'loginRedirectErrorText',
								type : 'String',
								description : 'Text of error message when login redirect is invalid',
							}, {
								name : 'guideUri',
								type : 'String',
								description : 'URI of the login troubleshooting page',
							}, ],
						}, {
							name : 'PartnerPattern',
							fields : [ {
								name : 'partnerPatternId',
								type : 'Number',
								description : 'Unique identifier for the pattern',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'Unique name for the partner; all lowercase',
							}, {
								name : 'sourceUri',
								type : 'String',
								description : 'Regular expression identifying a class of partner URIs; identifies partner as well as the target back-end server',
							}, {
								name : 'targetUri',
								type : 'String',
								description : 'URI including scheme (protocol) and authority (host/port) to which to rewrite source URI',
							}, ],
						}, {
							name : 'PartnerTerm',
							fields : [ {
								name : 'subscriptionTermId',
								type : 'Number',
								description : 'Unique identifier for the subscription term',
							}, {
								name : 'period',
								type : 'Number',
								description : 'The time interval of the term as a number of days, such as 365 for a year',
							}, {
								name : 'price',
								type : 'Number',
								description : 'The monetary amount in USD charged for the term as a decimal number with 2 decimal places, such as 99.99',
							}, {
								name : 'groupDiscountPercentage',
								type : 'Number',
								description : 'The percentage discount for multiple subscriptions as a decimal number with 2 decimal places, such as 10.00',
							}, {
								name : 'partnerId',
								type : 'String',
								description : 'The unique partner id for the partner, such as "tair"',
							}, {
								name : 'description',
								type : 'String',
								description : 'A text describing the term for display in the subscription interface',
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
						},*/ ],
						calls : [ {
							header : 'Get All Partners',
							summary : 'Get all the partners in the API database',
							op : 'GET',
							uri : '/partners',
							parameters : [],
							returns : 'Array of Partner',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/partners',
						}, {
							header : 'Get Partner By Partner ID',
							summary : 'Gets a single partner based on a partner ID',
							op : 'GET',
							uri : '/partners/?partnerId={id}',
							parameters : [ {
								name : 'partnerId',
								type : 'String',
								description : 'The unique partner name',
							}, ],
							returns : 'Array of Partner with single partner object',
							errors : [{code : '400', message : 'PWD NOT FOUND IN DB. username existance unknown'},],
							example : 'https://demoapi.arabidopsis.org/partners/?partnerId=tair',
						}, {
							header : 'Get Partner By Source URI',
							summary : 'Gets the partner that corresponds to a specified URI using a partner pattern',
							op : 'GET',
							uri : '/partners/patterns/?sourceUri={string}',
							parameters : [ {
								name : 'sourceUri',
								type : 'String',
								description : 'The complete source URI for a partner resource',
							}, ],
							returns : 'Array of Partner with one object',
							errors : [{code : '400', message : 'cannot find matched url'},],
							example : 'https://pwapi.arabidopsis.org/partners/patterns/?sourceUri=https://www.arabidopsis.org/',
						}, {
							header : 'Create a Partner Pattern',
							summary : 'Create a new partner pattern with source regular expression and target URI; all PartnerPattern fields other than partnerPatternId are required',
							op : 'POST',
							uri : '/partners/patterns/',
							parameters : [],
							returns : 'Array of PartnerPattern',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/partners/patterns/',
						}, {
							header : 'Update a Partner Pattern',
							summary : 'Update an existing pattern specified by id; you must supply all the pattern fields to update',
							op : 'PUT',
							uri : '/partners/patterns/&partnerPatternId',
							parameters : [ {
								name : 'partnerPatternId',
								type : 'Number',
								description : 'The unique identifier for the pattern',
							}, ],
							returns : 'Array of PartnerPattern',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/partners/patterns/?partnerPatternId=32',
						}, {
							header : 'Delete a Partner Pattern',
							summary : 'Delete an existing partner pattern specified by id',
							op : 'DELETE',
							uri : '/partners/patterns/&partnerPatternId',
							parameters : [ {
								name : 'partnerPatternId',
								type : 'Number',
								description : 'The unique identifier for the pattern',
							}, ],
							returns : '{"success":"delete complete"}',
							errors : [],
							example : 'https://pwapi.arabidopsis.org/partners/patterns/?partnerPatternId=32',
						}, {
						header : 'Get All Partner Subscription Terms',
						summary : 'Gets all the subscription terms for all partners',
						op : 'GET',
						uri : '/partners/terms',
						parameters : [],
						returns : 'Array of PartnerTerm',
						errors : [],
						example : 'https://pwapi.arabidopsis.org/partners/terms',
					}, {
						header : 'Get Partner Subscription Term by ID',
						summary : 'Gets a specific subscription term by unique id',
						op : 'GET',
						uri : '/partners/terms/?subscriptionTermId={id}',
						parameters : [ {
							name : 'subscriptionTermId',
							type : 'Number',
							description : 'The unique identifier for the term',
						}, ],
						returns : 'Array of PartnerTerm with a single PartnerTerm object',
						errors : [],
						example : 'https://pwapi.arabidopsis.org/partners/terms/?subscriptionTermId=5',
					}, {
						header : 'Get Partner Subscription Terms by Partner',
						summary : 'Gets the set of subscription terms for a specified partner',
						op : 'GET',
						uri : '/partners/terms/?partnerId={id}',
						parameters : [ {
							name : 'partnerId',
							type : 'String',
							description : 'The unique partner id for the partner, such as "tair"',
						},],
						returns : 'Array of PartnerTerm',
						errors : [],
						example : 'https://pwapi.arabidopsis.org/partners/terms/?partnerId=tair',
					}, {
						header : 'Get Partner Subscription Terms with Filter',
						summary : 'Gets the set of subscription terms matching a set of optional field values',
						op : 'GET',
						uri : '/partners/terms/?partnerId={id}&period={number}&price={number}&groupDiscountPercentage={number}&description={string}',
						parameters : [ {
							name : 'partnerId',
							type : 'String',
							description : 'The unique partner id for the partner, such as "tair"',
						}, {
							name : 'period',
							type : 'Number',
							description : 'The time interval of the term as a number of days, such as 365 for a year',
						}, {
							name : 'price',
							type : 'Number',
							description : 'The monetary amount in USD charged for the term as a decimal number with 2 decimal places, such as 99.99',
						}, {
							name : 'groupDiscountPercentage',
							type : 'Number',
							description : 'The percentage discount for multiple subscriptions as a decimal number with 2 decimal places, such as 10.00',
						}, {
							name : 'description',
							type : 'String',
							description : 'A text describing the term for display in the subscription interface',
						}, ],
						returns : 'Array of PartnerTerm',
						errors : [],
						example : 'https://pwapi.arabidopsis.org/partners/terms/?partnerId=tair&period=365',
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
						returns : '',
						errors : [{code : '400', message : ''}],
						example : '',
					}, */]
					}
				} ]);
