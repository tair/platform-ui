angular.module('platform-ui.librariantool.role.phoenix.consortium').controller('PhoenixConsortiumController', [
  '$scope',
  '$http',
  '$cookies',
  '$location',
  '$state',
  '$filter',
  'Title',
  'PhoenixConsortiumModel',
  function ($scope, $http, $cookies, $location, $state, $filter, Title, PhoenixManageConsortiumModel) {
    $scope.setTitle(PhoenixManageConsortiumModel.title);
    $scope.consortiums = PhoenixManageConsortiumModel.consortiums;
    $scope.addGroupShow = 'hidden';
    $scope.adding = false;
    $scope.newConsortium = PhoenixManageConsortiumModel.newConsortium;
    $scope.removeConsortium = null;
    $scope.editConsortium = null;
    $scope.searchTerm = null;
    $scope.sortings = PhoenixManageConsortiumModel.sortings;
    $scope.reverse = $scope.sortings[0].reverse;
    $scope.predicate = $scope.sortings[0].predicate;
    var orderBy = $filter('orderBy');
    $scope.order = function (predicate, reverse) {
      $scope.consortiums = orderBy($scope.consortiums, predicate, reverse);
    };
    $scope.order($scope.predicate, $scope.reverse);
    $scope.sortByField = function (sorting) {
      if ($scope.predicate != sorting.predicate) {
        $scope.predicate = sorting.predicate;
        $scope.reverse = sorting.reverse;
      } else {
        sorting.reverse = !sorting.reverse;
        $scope.reverse = sorting.reverse;
      }
      $scope.order($scope.predicate, $scope.reverse);
    };
    $scope.groupsListStartCss = function (state) {
      if (state == 'edit') {
        return 'lt-ip-groups-list-start-edit';
      }
      return 'lt-ip-groups-list-start';
    };
    $scope.groupsListEndCss = function (state) {
      if (state == 'edit') {
        return 'lt-ip-groups-list-end-edit';
      }
      return 'lt-ip-groups-list-end';
    };
    $scope.groupsMoveOver = function (consortium) {
      if (consortium.state == null && !$scope.adding) {
        consortium.state = 'selected';
      }
    };
    $scope.groupsMoveOut = function (consortium) {
      if (consortium.state == 'selected' && !$scope.adding) {
        consortium.state = null;
      }
    };
    $scope.right = function (consortium) {
      if (consortium.state == 'selected') {
        consortium.state = 'remove';
      } else if (consortium.state == 'edit') {
        if ($scope.editConsortium) {
          consortium.name = $scope.editConsortium.name;
          $scope.editConsortium = null;
        }
        consortium.state = null;
      } else if (consortium.state == 'remove') {
        consortium.state = null;
      }
    };
    $scope.left = function (consortium) {
      if (consortium.state == 'selected') {
        $scope.editConsortium = angular.copy(consortium);
        consortium.state = 'edit';
        $scope.adding = false;
      } else if (consortium.state == 'edit') {
        data = { name: consortium['name'] };
        $http({
          url: $scope.apiUri + '/parties/?credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey) + '&partyId=' + consortium['partyId'],
          data: data,
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
          alert('edit consortium request failed');
        });
        consortium.state = null;
        $scope.editConsortium = null;
      } else if (consortium.state == 'remove') {
        $scope.removeConfirm(consortium);
        consortium.state = null;
      }
    };
    $scope.addConfirm = function () {
      var data = {
          name: $scope.newConsortium['name'],
          partyType: 'consortium',
          username: 'andrvet_cons_ph_manage_cons',
          partnerId: 'phoenix'
        };
      $http({
        url: $scope.apiUri + '/parties/consortiums/?secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
        data: data,
        method: 'POST'
      }).success(function (data, status, headers, config) {
        $scope.createdConsortium = {
          country: data[0].country,
          display: data[0].display,
          name: data[0].name,
          partyId: data[0].partyId,
          partyType: data[0].partyType,
          email: data[1].email,
          institution: data[1].institution,
          partnerId: data[1].partnerId,
          partyId: data[1].partyId,
          userIdentifier: data[1].userIdentifier,
          username: data[1].username
        };
        bootbox.alert('New Consortium created: username=' + data[1].username + ' partyId=' + data[0].partyId + ' partyType=' + data[0].partyType + ' partnerId=' + data[1].partnerId + ' institution=' + data[1].institution + ' name=' + data[0].name);
        $scope.createdConsortium['state'] = null;
        $scope.consortiums.unshift(angular.copy($scope.createdConsortium));
      }).error(function (data, status, headers, config) {
        alert('add consortium request failed');
      });
      $scope.newConsortium = null;
      $scope.adding = false;
    };
    $scope.reset = function () {
      $scope.adding = false;
      for (i = 0; i < $scope.consortiums.length; i++) {
        $scope.consortiums[i].state = null;
      }
    };
    $scope.removeConfirm = function (consortium) {
      data = {};
      $http({
        url: $scope.apiUri + '/parties/credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey) + '&partyId=' + consortium['partyId'],
        data: data,
        method: 'DELETE'
      }).success(function (data, status, headers, config) {
      }).error(function (data, status, headers, config) {
        alert('delete consortium request failed');
      });
      var index = $scope.consortiums.indexOf(consortium);
      if (index > -1) {
        $scope.consortiums.splice(index, 1);
      }
      $scope.removeConsortium = null;
    };
    $scope.enterConsortium = function (consortium) {
      if (!(consortium.state == 'edit')) {
        $state.go('role.consortium', {
          'consortiumId': consortium.partyId,
          'consortiumName': consortium.name
        });
      }
    };
    $http({
      url: $scope.apiUri + '/parties/?partyType=consortium' + '&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
      method: 'GET'
    }).success(function (data, status, headers, config) {
      $scope.consortiums = [];
      for (var i = 0; i < data.length; i++) {
        entry = data[i];
        $scope.consortiums.push({
          partyId: entry['partyId'],
          partyType: entry['partyType'],
          name: entry['name'],
          country: entry['country'],
          display: entry['display'],
          consortium: entry['consortium'],
          state: null
        });
      }
    }).error(function (data, status, headers, config) {
      alert('consortium request failed');
    });
  }
]);