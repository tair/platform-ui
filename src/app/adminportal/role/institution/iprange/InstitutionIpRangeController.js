/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.adminportal.role.institution.iprange').controller(
  /* Name */
  'InstitutionIpRangeController',

  /* Dependencies */
  [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    '$filter',
    'Title',
    'InstitutionIpRangeModel',
    'IpValidator',

    /* Controller Definition */
    function (
      $scope,
      $http,
      $cookies,
      $window,
      $location,
      $state,
      $filter,
      Title,
      InstitutionIpRangeModel,
      IpValidator
    ) {
      //		if(!$scope.credentialId || !$scope.secretKey){
      //			$state.go('ltlogin');
      //		}
      $scope.setCurrentTab(InstitutionIpRangeModel.currentTab)
      $scope.ipranges = InstitutionIpRangeModel.ipranges
      $scope.addGroupShow = 'hidden'
      $scope.adding = false
      $scope.newRange = InstitutionIpRangeModel.newRange
      $scope.removeRange = null
      $scope.editRange = null
      $scope.searchTerm = null
      $scope.sortings = InstitutionIpRangeModel.sortings //List of sorting objects which contain sortField and reverse attributes.
      $scope.reverse = $scope.sortings[0].reverse
      $scope.predicate = $scope.sortings[0].predicate
      $scope.currentTab = InstitutionIpRangeModel.currentTab
      //initializing orderBy function
      $scope.sortIps = function(iprange) {   
        var ip = iprange.start 
        return ip.split('.').map(function(x) {
          return x.padStart(3, "0");
        }).join('');
      }
      var orderBy = $filter('orderBy')
      $scope.order = function (predicate, reverse) {
        if (predicate == 'start'){
          $scope.ipranges = orderBy($scope.ipranges, $scope.sortIps, reverse)
        }else{
          $scope.ipranges = orderBy($scope.ipranges, predicate, reverse)
        }
      }
      $scope.order($scope.predicate, $scope.reverse)

      //Sorting function for ng-click
      $scope.sortByField = function (sorting) {
        if ($scope.predicate != sorting.predicate) {
          $scope.predicate = sorting.predicate
          $scope.reverse = sorting.reverse
        } else {
          sorting.reverse = !sorting.reverse
          $scope.reverse = sorting.reverse
        }
        $scope.order($scope.predicate, $scope.reverse)
      }

      // CSS Logics as response to state changes.
      $scope.groupsListStartCss = function (state) {
        if (state == 'edit') {
          return 'lt-ip-groups-list-start-edit'
        }
        return 'lt-ip-groups-list-start'
      }
      $scope.groupsListEndCss = function (state) {
        if (state == 'edit') {
          return 'lt-ip-groups-list-end-edit'
        }
        return 'lt-ip-groups-list-end'
      }

      // Events that change states
      $scope.groupsMoveOver = function (iprange) {
        if (iprange.state == null && !$scope.adding && isRecordActive(iprange)) {
          iprange.state = 'selected'
        }
      }

      $scope.groupsMoveOut = function (iprange) {
        if (iprange.state == 'selected' && !$scope.adding) {
          iprange.state = null
        }
      }

      $scope.getIpRangeEndTime = function(iprange) {
        if (isRecordActive(iprange)) {
          return "now"
        } else {
          return $scope.getTimeDisplay(iprange.expiredAt)
        }
      }

      $scope.getTimeDisplay = function(timestamp){
        if (!timestamp) return ""
        var dateObj = moment(timestamp, "YYYY-MM-DDTHH:mm:ssZ").toDate()
        var local = moment(dateObj).local().format('YYYY-MM-DD')
        return local
      }

      isRecordActive =function(iprange) {
        return !iprange.expiredAt
      }

      $scope.right = function (iprange) {
        if (iprange.state == 'selected') {
          // this is the trash button at normal state
          iprange.state = 'remove'
        } else if (iprange.state == 'edit') {
          // this is the "x" button at edit state
          if ($scope.editRange) {
            iprange.name = $scope.editRange.name
            iprange.start = $scope.editRange.start
            iprange.end = $scope.editRange.end
            $scope.editRange = null
          }
          iprange.state = null
        } else if (iprange.state == 'remove') {
          // this is the cancel button at remove state.
          iprange.state = null
        }
      }

      $scope.left = function (iprange) {
        if (iprange.state == 'selected') {
          // This is the edit button at normal state.
          $scope.editRange = angular.copy(iprange)
          iprange.state = 'edit'
          $scope.adding = false
        } else if (iprange.state == 'edit') {
          // This is the confirm button at edit state
          if (!IpValidator.ValidateIpAddress(iprange['start'])) {
            alert('Invalid starting IP')
            return
          }
          if (!IpValidator.ValidateIpAddress(iprange['end'])) {
            alert('Invalid ending IP')
            return
          }
          if (
            IpValidator.ValidateIpAddress(iprange['start']) !=
            IpValidator.ValidateIpAddress(iprange['end'])
          ) {
            alert('Invalid IP address')
            return
          }
          if (!IpValidator.CompareIpAddress(iprange['start'], iprange['end'])) {
            alert('Starting IP cannot be greater than ending IP')
            return
          }
          if (!IpValidator.IpRangeLimit(iprange['start'], iprange['end'])) {
            alert(
              'IP range is too large, please enter a smaller IP range.  Please contact us at info@phoenixbioinformatics.org with any questions.'
            )
            return
          }

          data = {
            ipRangeId: iprange['ipRangeId'],
            start: iprange['start'],
            end: iprange['end'],
            partyId: iprange['partyId'],
            label: iprange['name'],
          }
          $http({
            url:
              $scope.apiUri +
              '/parties/ipranges/?partyId=' +
              $scope.institutionId +
              '&credentialId=' +
              $scope.credentialId +
              '&secretKey=' +
              encodeURIComponent($scope.secretKey) +
              '&ipRangeId=' +
              iprange['ipRangeId'],
            data: data,
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          })
            .success(function (data, status, headers, config) {})
            .error(function (data, status, headers, config) {
              alert('ip range request failed')
            })
          iprange.state = null
          $scope.editRange = null
        } else if (iprange.state == 'remove') {
          // this is the remove button at remove state
          $scope.removeConfirm(iprange)
          iprange.state = null
        }
      }

      //adding a new ip range
      $scope.addConfirm = function () {
        if (!IpValidator.ValidateIpAddress($scope.newRange['start'])) {
          alert('Invalid starting IP')
          return
        }
        if (!IpValidator.ValidateIpAddress($scope.newRange['end'])) {
          alert('Invalid ending IP')
          return
        }
        if (
          IpValidator.ValidateIpAddress($scope.newRange['start']) !=
          IpValidator.ValidateIpAddress($scope.newRange['end'])
        ) {
          alert('Invalid IP address')
          return
        }
        if (
          !IpValidator.CompareIpAddress(
            $scope.newRange['start'],
            $scope.newRange['end']
          )
        ) {
          alert('Starting IP cannot be greater than ending IP')
          return
        }
        if (
          !IpValidator.IpRangeLimit(
            $scope.newRange['start'],
            $scope.newRange['end']
          )
        ) {
          alert(
            'IP range is too large, please enter a smaller IP range.  Please contact us at info@phoenixbioinformatics.org with any questions.'
          )
          return
        }
        ///
        //var startIpValid = validateIP($scope.newRange['start']);
        //var endIpValid = validateIP($scope.newRange['end']);

        //TODO above two operations do not work b/c both startIpValid and endIpValid have value 'undefined' here...
        //I tried declaring validateIP function on $scope level [i.e. $scope.validateIP = function(ip) ] but no difference
        //commenting out for now not to prevent biocyc testing...
        //if (startIpValid && endIpValid) {
        //	addRange();
        //}
        //else {
        //	alert("IP range "+$scope.newRange['start']+"-"+$scope.newRange['end']+" invalid and not added...")
        //}

        var startIpStripped = IpValidator.StripLeadingZeros(
          $scope.newRange['start']
        )
        var endIpStripped = IpValidator.StripLeadingZeros(
          $scope.newRange['end']
        )

        if (startIpStripped !== $scope.newRange['start']) {
          alert(
            'leading zeros in start IP deleted: ' +
              $scope.newRange['start'] +
              ' converted into ' +
              startIpStripped
          )
        }
        if (endIpStripped !== $scope.newRange['end']) {
          alert(
            'leading zeros in end IP deleted: ' +
              $scope.newRange['end'] +
              ' converted into ' +
              endIpStripped
          )
        }

        addRange(startIpStripped, endIpStripped)

        $scope.newRange = null
        $scope.adding = false
      }

      //PROMISE
      //		var deferred = $q.defer();
      //		var promise = deffered.promise;
      //
      //		promise.then(
      //				function success(ip){console.log("success from promise:"+ip);},
      //				function error(ip){console.log("error from promise:"+ip);}
      //				);
      //
      //		deffered.resolve('all done');
      //
      //		$timeout(function() {
      //			  deferred.resolve('All done... eventually');
      //			}, 1000);

      //CALLBACK
      //	    function syncFunc (inputIp,callback){
      //	    	validateIP(inputIp, function(result) {callback(result)}; );
      //	    }

      function addRange(startIp, endIp) {
        //$scope.addRange = function () {
        var data = {
          start: startIp,
          end: endIp,
          partyId: $scope.institutionId,
          label: $scope.newRange['name'],
        }
        $http({
          url:
            $scope.apiUri +
            '/parties/ipranges/?partyId=' +
            $scope.institutionId +
            '&credentialId=' +
            $scope.credentialId +
            '&secretKey=' +
            encodeURIComponent($scope.secretKey),
          data: data,
          method: 'POST',
        })
          .success(function (data, status, headers, config) {
            $scope.ipranges.unshift({
              ipRangeId: data['ipRangeId'],
              start: data['start'],
              end: data['end'],
              name: data['label'],
              partyId: data['partyId'],
              createdAt: data['createdAt'],
              expiredAt: data['expiredAt'],
              state: null,
            })
          })
          .error(function (data, status, headers, config) {
            if ('IP Range' in data) {
              alert(data['IP Range'])
            } else {
              alert('add ip range request failed')
            }
          })
      }

      //validateIP
      //$scope.validateIP = function(ip) {
      function validateIP(ip) {
        $http({
          url: $scope.apiUri + '/ipranges/validateip/?ip=' + ip,
          method: 'GET',
        })
          .success(function (data, status, headers, config) {
            if (data['ip version'] === 4 || data['ip version'] === 6) {
              debugMsg = 'IP is valid. version: ' + data['ip version']
              console.log(debugMsg)
              return true
            } else {
              debugMsg = 'IP is invalid. version: ' + data['ip version']
              console.log(debugMsg)
              alert('IP invalid')
              return false
            }
          })
          .error(function (data, status, headers, config) {
            alert('error getting /ipranges/validateip/?ip= for IP')
            return false
          })
      }

      //reset function
      $scope.reset = function () {
        $scope.adding = false
        for (i = 0; i < $scope.ipranges.length; i++) {
          $scope.ipranges[i].state = null
        }
      }

      $scope.removeConfirm = function (iprange) {
        data = {
          ipRangeId: iprange['ipRangeId'],
          start: iprange['start'],
          end: iprange['end'],
          partyId: iprange['partyId'],
          label: iprange['name'],
        }
        $http({
          url:
            $scope.apiUri +
            '/parties/ipranges/?partyId=' +
            $scope.institutionId +
            '&credentialId=' +
            $scope.credentialId +
            '&secretKey=' +
            encodeURIComponent($scope.secretKey) +
            '&ipRangeId=' +
            data['ipRangeId'],
          data: data,
          method: 'DELETE',
        })
          .success(function (data, status, headers, config) {
            var index = $scope.ipranges.indexOf(iprange)
            if (index > -1) {
              var expiredAt = data[0]['expiredAt']
              $scope.ipranges[index].expiredAt = expiredAt
            }
            $scope.removeRange = null
          })
          .error(function (data, status, headers, config) {
            alert('ip range request failed')
          })
      }

      // init
      $http({
        url:
          $scope.apiUri +
          '/parties/ipranges/?partyId=' +
          $scope.institutionId +
          '&credentialId=' +
          $scope.credentialId +
          '&secretKey=' +
          encodeURIComponent($scope.secretKey),
        method: 'GET',
      })
        .success(function(data, status, headers, config) {
          ipranges = []
          for (var i = 0; i < data.length; i++) {
            entry = data[i]
            ipranges.push({
              ipRangeId: entry['ipRangeId'],
              start: entry['start'],
              end: entry['end'],
              name: entry['label'],
              partyId: entry['partyId'],
              createdAt: entry['createdAt'],
              expiredAt: entry['expiredAt'],
              state: null,
            })
          }
          ipranges.sort(function(a,b) {
            if (!a.expiredAt) {
              return -1
            } else if (!b.expiredAt) {
              return 1
            } else {
              if (a.expiredAt > b.expiredAt) return -1
              if (b.expiredAt > a.expiredAt) return 1
              return 0
            }
          })
	        $scope.ipranges = ipranges
        })
        .error(function (data, status, headers, config) {
          alert('ip range request failed')
        })
    },
  ]
)
