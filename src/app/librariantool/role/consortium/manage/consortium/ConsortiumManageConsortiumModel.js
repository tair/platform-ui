/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.manage.consortium').factory(
	/* Name */
	'ConsortiumManageConsortiumModel',

	/* Dependencies */
	[

	function () {
		return {
                    title: 'Consortium Manager',
                    consortiums: [
                        {'name':'UC Berekeley', 'id':'Institution #1', 'state':null},
                        {'name':'Stanford University', 'id':'Institution #2', 'state':null},
                        {'name':'MIT', 'id':'Institution #3', 'state':null},
                        {'name':'UCLA', 'id':'Institution #4', 'state':null},
                        {'name':'UC Davis', 'id':'Institution #5', 'state':null},
                        {'name':'UC San Diego', 'id':'Institution #6', 'state':null},
                        {'name':'UC Santa Clara', 'id':'Institution #6', 'state':null},
                    ]
		};
	}
]);
