/**
 * Parties Model
 */

angular.module('platform-ui.contentaccess.apidoc.parties').factory(
/* Name */
'PartiesModel',

/* Dependencies */
[

function() {
	return {
		currentTab : 'doc',
		tabs : {
			notused : {
				id : 'not used',
				text : 'Not Used',
			},
			tab1 : {
				id : 'doc',
				text : 'Parties API',
			},
		},
		templates : {
			doc : "contentaccess/apidoc/parties/doc/doc.html",
		}
	}
} ]);
