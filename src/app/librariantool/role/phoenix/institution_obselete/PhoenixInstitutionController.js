angular.module('platform-ui.librariantool.role.phoenix.institution.obselete').controller('PhoenixInstitutionControllerobs', [
  '$scope',
  '$http',
  '$cookies',
  '$location',
  '$state',
  'Title',
  'Dateformat',
  'PhoenixInstitutionModel',
  function ($scope, $http, $cookies, $location, $state, Title, Dateformat, PhoenixInstitutionModel) {
    init();
    $scope.partyId = $location.search()['partyId'];
    $scope.setTitle(PhoenixInstitutionModel.title);
    $scope.institutionName = $location.search()['institutionName'];
    if ($scope.institutionName != null) {
      $scope.setTitle($scope.institutionName);
    }
    $scope.ipranges = PhoenixInstitutionModel.ipranges;
    $scope.institutions = PhoenixInstitutionModel.institutions;
    $scope.institution = null;
    $scope.consortiums = PhoenixInstitutionModel.consortiums;
    $scope.newConsortium = PhoenixInstitutionModel.newConsortium;
    $scope.foundConsortium = PhoenixInstitutionModel.foundConsortium;
    $scope.addGroupShow = 'hidden';
    $scope.newRange = PhoenixInstitutionModel.newRange;
    $scope.removeRange = null;
    $scope.editRange = null;
    $scope.newSubscription = PhoenixInstitutionModel.newSubscription;
    $scope.consSubList = PhoenixInstitutionModel.consSubList;
    $scope.newInstitution = PhoenixInstitutionModel.newInstitution;
    $scope.searchTerm = null;
    $scope.sortings = PhoenixInstitutionModel.sortings;
    $scope.reverseField = $scope.sortings[0].reverse;
    $scope.sortField = $scope.sortings[0].sortField;
    $scope.ipAdding = false;
    $scope.subAdding = false;
    $scope.insAdding = false;
    $scope.consEdit = false;
    $scope.addInstitutionBox = function () {
      bootbox.dialog({
        title: 'Create a new Institution',
        message: '<div ' + 'ng-app=\'platform-ui.librariantool.role.phoenix.institution\' ' + 'ng-controller=\'PhoenixInstitutionController\' style=\'padding:0px\'>' + '<input ng-class=\'groupsListLabelCss(true)\' ' + 'type=\'text\' ' + 'ng-model=\'newInstitution.username\'' + 'placeholder=\'Institution username (required)\'>' + '</input>' + '<input ng-class=\'groupsListLabelCss(true)\' ' + 'type=\'text\' ' + 'ng-model=\'newInstitution.email\'' + 'placeholder=\'Instituion email (optional)\'>' + '</input>' + '<input ng-class=\'groupsListLabelCss(true)\' ' + 'type=\'text\' ' + 'ng-model=\'newInstitution.institution\'' + 'placeholder=\'Instituion (optional)\'>' + '</input>' + '<input ng-class=\'groupsListLabelCss(true)\' ' + 'type=\'text\' ' + 'ng-model=\'newInstitution.name\'' + 'placeholder=\'Institution name (optional)\'>' + '</input>' + '</div>',
        buttons: {
          success: {
            label: 'Create',
            className: 'btn-success',
            callback: function () {
              $scope.createInstitutionPartyAndCredential();
            }
          }
        }
      });
    };
    $scope.createInstitutionPartyAndCredential = function () {
      data = {
        username: 'andrvet_inst_ph_inst',
        partnerId: 'phoenix',
        partyType: 'organization',
        email: $scope.newInstitution['email'],
        institution: $scope.newInstitution['institution'],
        name: $scope.newInstitution['name']
      };
      $http({
        url: $scope.apiUri + '/parties/institutions/?secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
        data: data,
        method: 'POST'
      }).success(function (data, status, headers, config) {
        $scope.partyId = data[0]['partyId'];
        $scope.institution = {
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
        bootbox.alert('New Institution created: username=' + data[1].username + ' partyId=' + data[0].partyId + ' partyType=' + data[0].partyType + ' partnerId=' + data[1].partnerId + ' institution=' + data[1].institution + ' name=' + data[0].name);
      }).error(function (data, status, headers, config) {
        bootbox.alert('institution creation failed with ' + data.non_field_errors);
      });
    };
    $scope.searchstate = 'selected';
    $scope.activeSubscriptions = PhoenixInstitutionModel.activeSubscriptions;
    $scope.consortiumSubscriptions = PhoenixInstitutionModel.consortiumSubscriptions;
    $scope.partners = PhoenixInstitutionModel.partners;
    $scope.uiparams = PhoenixInstitutionModel.uiparams;
    $scope.getExpDate = function (id) {
      if (id in $scope.activeSubscriptions) {
        return $scope.activeSubscriptions[id].endDate;
      }
      return 'Unlicensed';
    };
    $scope.licenseButton = function (id) {
      return 'Edit';
    };
    $scope.sortByField = function (sorting) {
      if ($scope.sortField != sorting.sortField) {
        $scope.sortField = sorting.sortField;
        $scope.reverseField = sorting.reverse;
      } else {
        sorting.reverse = !sorting.reverse;
        $scope.reverseField = sorting.reverse;
      }
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
    $scope.groupsMoveOver = function (iprange) {
      if (iprange.state == null && !$scope.ipAdding) {
        iprange.state = 'selected';
      }
    };
    $scope.groupsMoveOut = function (iprange) {
      if (iprange.state == 'selected' && !$scope.ipAdding) {
        iprange.state = null;
      }
    };
    $scope.right = function (iprange) {
      if (iprange.state == 'selected') {
        iprange.state = 'remove';
      } else if (iprange.state == 'edit') {
        if ($scope.editRange) {
          iprange.name = $scope.editRange.name;
          iprange.start = $scope.editRange.start;
          iprange.end = $scope.editRange.end;
          $scope.editRange = null;
        }
        iprange.state = null;
      } else if (iprange.state == 'remove') {
        iprange.state = null;
      }
    };
    $scope.left = function (iprange) {
      if (iprange.state == 'selected') {
        $scope.editRange = angular.copy(iprange);
        iprange.state = 'edit';
        $scope.adding = false;
      } else if (iprange.state == 'edit') {
        data = {
          ipRangeId: iprange['ipRangeId'],
          start: iprange['start'],
          end: iprange['end'],
          partyId: iprange['partyId'],
          label: iprange['name']
        };
        $http({
          url: $scope.apiUri + '/parties/ipranges/?partyId=' + $cookies.partyId + '&secretKey=' + encodeURIComponent($scope.secretKey) + '&ipRangeId=' + iprange['ipRangeId'],
          data: data,
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
          alert('ip range request failed');
        });
        iprange.state = null;
        $scope.editRange = null;
      } else if (iprange.state == 'remove') {
        $scope.removeConfirm(iprange);
        iprange.state = null;
      }
    };
    $scope.addConfirm = function () {
      var data = {
          start: $scope.newRange['start'],
          end: $scope.newRange['end'],
          partyId: $scope.institution.partyId,
          label: $scope.newRange['name']
        };
      $http({
        url: $scope.apiUri + '/parties/ipranges/?partyId=' + $scope.institution.partyId + '&secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
        data: data,
        method: 'POST'
      }).success(function (data, status, headers, config) {
      }).error(function (data, status, headers, config) {
        alert('ip range request failed');
      });
      $scope.ipranges.unshift(angular.copy($scope.newRange));
      $scope.newRange = null;
      $scope.ipAdding = false;
    };
    $scope.reset = function (adding) {
      adding = false;
      for (i = 0; i < $scope.ipranges.length; i++) {
        $scope.ipranges[i].state = null;
      }
    };
    function reset(adding) {
      adding = false;
      for (i = 0; i < $scope.ipranges.length; i++) {
        $scope.ipranges[i].state = null;
      }
    }
    $scope.removeConfirm = function (iprange) {
      data = {
        ipRangeId: iprange['ipRangeId'],
        start: iprange['start'],
        end: iprange['end'],
        partyId: iprange['partyId'],
        label: iprange['name']
      };
      $http({
        url: $scope.apiUri + '/parties/ipranges/?partyId=' + $cookies.partyId + '&secretKey' + encodeURIComponent($scope.secretKey) + '&ipRangeId=' + data['ipRangeId'],
        data: data,
        method: 'DELETE'
      }).success(function (data, status, headers, config) {
      }).error(function (data, status, headers, config) {
        alert('ip range request failed');
      });
      var index = $scope.ipranges.indexOf(iprange);
      if (index > -1) {
        $scope.ipranges.splice(index, 1);
      }
      $scope.removeRange = null;
    };
    $scope.createSubConfirm = function () {
      var data = {
          partnerId: $scope.newSubscription['partnerId'],
          partyId: $scope.partyId,
          startDate: Dateformat.formatDate($scope.newSubscription['start']),
          endDate: Dateformat.formatDate($scope.newSubscription['end'])
        };
      console.log(JSON.stringify(data));
      $http({
        url: $scope.apiUri + '/subscriptions/?credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
        data: data,
        method: 'POST'
      }).success(function (data, status, headers, config) {
      }).error(function (data, status, headers, config) {
        alert('create subscription request failed');
      });
      $scope.newSubscription = null;
      $scope.subAdding = false;
    };
    $http({
      url: $scope.apiUri + '/partners/',
      method: 'GET'
    }).success(function (data, status, headers, config) {
      $scope.partners = data;
    }).error(function () {
      alert('Cannot get partner information');
    });
    $scope.getSubscriptionEndDate = function () {
      if ($scope.partyId != null) {
        $http({
          url: $scope.apiUri + '/subscriptions/activesubscriptions/' + $scope.partyId + '/',
          method: 'GET'
        }).success(function (data, status, headers, config) {
          $scope.activeSubscriptions = data;
        }).error(function () {
          alert('Cannot get active subscription information');
        });
      }
    };
    $scope.listPartners = function (partners) {
      var ret = [];
      for (var i = 0; i < partners.length; i++) {
        if (partners[i].partnerId != 'phoenix') {
          ret.push(partners[i]);
        }
      }
      for (var i = 0; i < ret.length; i++) {
        console.log(ret[i]);
      }
      return ret;
    };
    $scope.listedPartners = [
      {
        'partnerId': 'phoenix',
        'name': 'Phoenix',
        'logoUri': 'https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png',
        'termOfServiceUri': 'https://www.google.com/intl/en/policies/terms/?fg=1'
      },
      {
        'partnerId': 'tair',
        'name': 'TAIR',
        'logoUri': 'https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif',
        'termOfServiceUri': 'https://www.arabidopsis.org/doc/about/tair_terms_of_use/417'
      },
      {
        'partnerId': 'yfd',
        'name': 'YFD',
        'logoUri': 'https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png',
        'termOfServiceUri': 'https://www.google.com/intl/en/policies/terms/?fg=1'
      }
    ], $scope.consortiums = [
      {
        'partyId': 31767,
        'partyType': 'consortium',
        'name': 'consortium31767',
        'country': 62,
        'display': true,
        'consortiums': []
      },
      {
        'partyId': 32673,
        'partyType': 'consortium',
        'name': 'testcons',
        'country': null,
        'display': false,
        'consortiums': []
      }
    ];
    $scope.consSubList = [];
    for (var i = 0; i < $scope.consortiums.length; i++) {
      $http({
        url: $scope.apiUri + '/subscriptions/activesubscriptions/' + $scope.consortiums[i].partyId + '/',
        method: 'GET'
      }).success(function (data, status, headers, config) {
        $scope.consortiumSubscriptions = data;
        for (var j = 0; j < $scope.listedPartners.length; j++) {
          if ($scope.listedPartners[j].partnerId in $scope.consortiumSubscriptions) {
            var endDate = $scope.consortiumSubscriptions[$scope.listedPartners[j].partnerId].endDate;
            $scope.consSubList.push({
              'consortium': {
                'partyId': 31767,
                'partyType': 'consortium',
                'name': 'consortium31767',
                'country': 62,
                'display': true,
                'consortiums': []
              },
              'endDate': endDate,
              'partnerId': $scope.listedPartners[j].partnerId,
              'name': $scope.listedPartners[j].name,
              'logoUri': $scope.listedPartners[j].logoUri
            });
          } else {
            var endDate = 'Unlicensed';
          }
        }
      }).error(function () {
        alert('Cannot get active subscription information');
      });
    }
    $scope.consright = function (consortium) {
      if (consortium.state == 'selected') {
        consortium.state = 'remove';
      } else if (consortium.state == 'remove') {
        consortium.state = null;
      }
    };
    $scope.consleft = function (consortium) {
      if (consortium.state == 'remove') {
        $scope.consRemoveConfirm(consortium);
        consortium.state = null;
      }
    };
    $scope.consRemoveConfirm = function (consortium) {
      var data = {
          parentPartyId: consortium['partyId'],
          childPartyId: $scope.partyId
        };
      $http({
        url: $scope.apiUri + '/parties/affiliations/?secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
        data: data,
        method: 'DELETE'
      }).success(function (data, status, headers, config) {
      }).error(function (data, status, headers, config) {
        alert('consortium affiliation remove request failed');
      });
      var index = $scope.consortiums.indexOf(consortium);
      if (index > -1) {
        $scope.consortiums.splice(index, 1);
      }
    };
    $scope.consAddConfirm = function () {
      for (var i = 0; i < $scope.allConsortiums.length; i++) {
        if ($scope.allConsortiums[i].name == $scope.newConsortium['name']) {
          $scope.foundConsortium['partyId'] = $scope.allConsortiums[i].partyId;
          $scope.foundConsortium['name'] = $scope.allConsortiums[i].name;
          $scope.consAddConfirm2();
          return;
        }
      }
      $scope.consAddConfirm1();
    };
    $scope.consAddConfirm2 = function () {
      $scope.foundConsortium['state'] = null;
      $scope.consortiums.unshift(angular.copy($scope.foundConsortium));
      var data = {
          parentPartyId: $scope.foundConsortium['partyId'],
          childPartyId: $scope.partyId
        };
      $http({
        url: $scope.apiUri + '/parties/affiliations/?secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
        data: data,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).success(function (data, status, headers, config) {
      }).error(function (data, status, headers, config) {
        alert('add to existing consortium request failed');
      });
      $scope.newConsortium = null;
      $scope.consAdding = false;
    };
    $scope.consAddConfirm1 = function () {
      var data = {
          name: $scope.newConsortium['name'],
          partyType: 'consortium',
          username: 'andrvet_cons_ph_inst',
          partnerId: 'phoenix'
        };
      $http({
        url: $scope.apiUri + '/parties/consortiums/?secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
        data: data,
        method: 'POST'
      }).success(function (data, status, headers, config) {
        $scope.partyId = data[0]['partyId'];
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
        $scope.createdConsortium = data;
        $scope.createdConsortium['state'] = null;
        $scope.consortiums.unshift(angular.copy($scope.createdConsortium));
        var data = {
            parentPartyId: $scope.createdConsortium.partyId,
            childPartyId: $scope.partyId
          };
        $http({
          url: $scope.apiUri + '/parties/affiliations/?secretKey=' + encodeURIComponent($scope.secretKey) + '&credentialId=' + $scope.credentialId,
          data: data,
          method: 'POST'
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
          alert('add to new consortium request failed');
        });
      }).error(function (data, status, headers, config) {
        alert('new consortium request failed with ' + data.non_field_errors);
      });
      $scope.newConsortium = null;
      $scope.consAdding = false;
    };
    $scope.enterConsortium = function (consortium) {
      if (!(consortium.state == 'edit')) {
        window.location.href = '#/librariantool/role/phoenix/manage/institution?consortiumId=31767&consortiumName=consortium31767';
      }
    };
    $scope.getIpRanges = function () {
      if ($scope.partyId != null) {
        $http({
          url: $scope.apiUri + '/parties/ipranges/?partyId=' + $scope.partyId + '&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
          method: 'GET'
        }).success(function (data, status, headers, config) {
          $scope.ipranges = [];
          for (var i = 0; i < data.length; i++) {
            entry = data[i];
            $scope.ipranges.push({
              ipRangeId: entry['ipRangeId'],
              start: entry['start'],
              end: entry['end'],
              name: entry['label'],
              partyId: entry['partyId'],
              state: null
            });
          }
        }).error(function (data, status, headers, config) {
          alert('ip range request failed');
        });
      }
    };
    $scope.$watch(function (scope) {
      return scope.institution;
    }, function (newValue, oldValue) {
      $scope.partyId = newValue.partyId;
      $scope.setTitle(newValue.name);
      $scope.getIpRanges();
      $scope.getSubscriptionEndDate();
      if ($scope.partyId != null) {
        $http({
          url: $scope.apiUri + '/parties/affiliations/?partyId=' + $scope.partyId + '&partyType=organization' + '&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
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
              state: null
            });
          }
        }).error(function (data, status, headers, config) {
          alert('consortium request failed');
        });
      }
    });
    function getIpRanges() {
      if ($scope.partyId != null) {
        $http({
          url: $scope.apiUri + '/parties/ipranges/?partyId=' + $scope.partyId + '&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
          method: 'GET'
        }).success(function (data, status, headers, config) {
          $scope.ipranges = [];
          for (var i = 0; i < data.length; i++) {
            entry = data[i];
            $scope.ipranges.push({
              ipRangeId: entry['ipRangeId'],
              start: entry['start'],
              end: entry['end'],
              name: entry['label'],
              partyId: entry['partyId'],
              state: null
            });
          }
        }).error(function (data, status, headers, config) {
          alert('ip range request failed');
        });
      }
    }
    function init() {
      getIpRanges();
      $http({
        url: $scope.apiUri + '/parties/?partyType=organization&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
        method: 'GET'
      }).success(function (data, status, headers, config) {
        $scope.institutions = [];
        for (var i = 0; i < data.length; i++) {
          entry = data[i];
          $scope.institutions.push({
            partyId: entry['partyId'],
            name: entry['name']
          });
        }
      }).error(function (data, status, headers, config) {
        alert('ip range request failed');
      });
      if ($scope.partyId != null) {
        $http({
          url: $scope.apiUri + '/parties/affiliations/?partyId=' + $scope.partyId + '&patyType=organization' + '&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
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
              state: null
            });
          }
        }).error(function (data, status, headers, config) {
          alert('consortium request failed');
        });
      }
      $http({
        url: $scope.apiUri + '/parties/?partyType=consortium&credentialId=' + $scope.credentialId + '&secretKey=' + encodeURIComponent($scope.secretKey),
        method: 'GET'
      }).success(function (data, status, headers, config) {
        $scope.allConsortiums = [];
        for (var i = 0; i < data.length; i++) {
          entry = data[i];
          $scope.allConsortiums.push({
            partyId: entry['partyId'],
            name: entry['name']
          });
        }
      }).error(function (data, status, headers, config) {
        alert('all consortiums request failed');
      });
      $http({
        url: $scope.apiUri + '/partners/',
        method: 'GET'
      }).success(function (data, status, headers, config) {
        $scope.partners = data;
      }).error(function () {
        alert('Cannot get partner information');
      });
      $(function () {
        $('#createStart').datepicker();
      });
      $(function () {
        $('#createEnd').datepicker();
      });
    }
  }
]);