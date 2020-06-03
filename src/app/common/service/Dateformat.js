/**
 * Dateformat Service
 *
 */

angular.module('service.dateformat', []).service(
  /* Name */
  'Dateformat',

  /* Dependencies */
  function () {
    this.formatDate = function (date) {
      var year = date.split('/')[2]
      var month = date.split('/')[0]
      var day = date.split('/')[1]
      var formatedDate = year + '-' + month + '-' + day + ' ' + '12:00:00.0'
      return formatedDate
    }
  }
)
