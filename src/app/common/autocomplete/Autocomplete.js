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
    return function (scope, iElement, iAttrs) {
      iElement.autocomplete({
        source: scope['institutions'],
        minLength: 3,
      })
    }
  }
)

angular.module('autocompletecountries', []).directive(
  /* Name */
  'autocompletecountries',

  function ($timeout) {
    return function (scope, iElement, iAttrs) {
      iElement.autocomplete({
        source: scope['countries'],
        minLength: 2,
      })
    }
  }
)

//generic autocomplete
angular.module('autoComplete', []).directive(
  /* Name */
  'autoComplete',

  function ($timeout) {
    return function (scope, iElement, iAttrs) {
      iElement.autocomplete({
        minLength: 3,
        source: function (request, response) {
          response(
            $.map(scope[iAttrs.uiItems], function (value, key) {
              return {
                label: value.name,
                value: value.partyId,
              }
            })
          )
        },
        select: function (event, ui) {},
      })
    }
  }
)
