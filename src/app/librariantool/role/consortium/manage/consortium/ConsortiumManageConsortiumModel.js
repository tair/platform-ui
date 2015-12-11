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
//		    consortiums: []
                    institutions: [
                        {'name':'UC Berekeley', 'partyId':'Institution #1', 'state':null},
                        {'name':'Stanford University', 'partyId':'Institution #2', 'state':null},
                        {'name':'MIT', 'partyId':'Institution #3', 'state':null},
                        {'name':'UCLA', 'partyId':'Institution #4', 'state':null},
                        {'name':'UC Davis', 'partyId':'Institution #5', 'state':null},
                        {'name':'UC San Diego', 'partyId':'Institution #6', 'state':null},
                        {'name':'UC Santa Clara', 'partyId':'Institution #6', 'state':null},
                    ],
                    sortings: [
         		              {predicate:'id', reverse:false, text:"ID"},
         		              {predicate:'name', reverse:false, text:"Name"}
         		              ]
		};
	}
]);
