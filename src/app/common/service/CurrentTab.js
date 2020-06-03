/**
 * CurrentTab Service
 *
 * Sets the currentTab in role.html
 */

angular.module('service.currenttab', []).service(
  /* Name */
  'CurrentTab',

  /* Dependencies */
  [
    '$document',

    function ($document) {
      var suffix = (currentTab = '')

      this.getSuffix = function () {
        return suffix
      }

      this.setSuffix = function (value) {
        suffix = value
      }

      this.getCurrentTab = function () {
        return $document.prop('currentTab')
      }

      this.setCurrentTab = function (value) {
        if (suffix !== '') {
          currentTab = value + suffix
        } else {
          currentTab = value
        }

        $document.prop('currentTab', currentTab)
      }
    },
  ]
)
