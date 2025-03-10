/**
 * Metering Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.metering').factory(
  /* Name */
  'MeteringModel',

  /* Dependencies */
  [
    function () {
      return {
        title: 'Metering',
        helpLink: 'https://phoenixbioinformatics.atlassian.net/wiki/spaces/COM/pages/42217802/Individual+Subscription+FAQ'
      }
    },
  ]
)
