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
						heading : 'Party API',
						overview : '',
						elements : [
								'',
								'',
								'', ],
						datatypes : [ /*{
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
						calls : [ /*{
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
