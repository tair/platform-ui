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
						heading : 'Partner API'
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
