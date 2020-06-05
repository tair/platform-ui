/**
 * custom error message for input fields.
 * reference: https://www.grapecity.com/blogs/easy-form-validation-in-angularjs
 */
angular
  .module('customerrmsg', [])
  .directive('customValidationError', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctl) {
        scope.$watch(attrs['customValidationError'], function (errorMsg) {
          elm[0].setCustomValidity(errorMsg)
          ctl.$setValidity('customValidationError', errorMsg ? false : true)
        })
      },
    }
  })
