/**
 * Title Service
 * 
 * Sets the <title> tag
 * Ported to JS from Josh D. Miller's ng-boilerplate example (github.com/joshdmiller/ng-boilerplate)
 */

angular.module('autocomplete', []).directive(
    /* Name */
    'autocomplete',
    
    function ($timeout) {
	return function(scope, iElement, iAttrs) {
	    iElement.autocomplete({
		source: scope['institutions'],
		minLength: 3,
	    });
	};
    }
);

angular.module('autocompletecountries', []).directive(
    /* Name */
    'autocompletecountries',

    function ($timeout) {
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope['countries'],
                minLength: 2,
            });
        };
    }
);
