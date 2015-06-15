angular.module('service.title', []).service('Title', [
  '$document',
  function ($document) {
    var suffix = title = '';
    this.getSuffix = function () {
      return suffix;
    };
    this.setSuffix = function (value) {
      suffix = value;
    };
    this.getTitle = function () {
      return $document.prop('title');
    };
    this.setTitle = function (value) {
      if (suffix !== '') {
        title = value + suffix;
      } else {
        title = value;
      }
      $document.prop('title', title);
    };
  }
]);