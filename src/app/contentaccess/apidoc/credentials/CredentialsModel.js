/**
 * Credentials Model
 */

angular.module('platform-ui.contentaccess.apidoc.credentials').factory(
/* Name */
'CredentialsModel',

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
				text : 'Credentials API',
			},
		},
		templates : {
			doc : "contentaccess/apidoc/credentials/doc/doc.html",
		}
	}
} ]);
