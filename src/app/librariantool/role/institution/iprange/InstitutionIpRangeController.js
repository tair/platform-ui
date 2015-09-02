/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.institution.iprange').controller(
	/* Name */
	'InstitutionIpRangeController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionIpRangeModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionIpRangeModel) {
	    $scope.setTitle(InstitutionIpRangeModel.title);
	    $scope.ipranges = InstitutionIpRangeModel.ipranges;
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.newRange = InstitutionIpRangeModel.newRange;
	    $scope.removeRange = null;
	    $scope.editRange = null;

	    // CSS Logics as response to state changes.
            $scope.groupsAddCss = function() {
                if ($scope.adding) {
                    return "show";
                }
                return "hidden";
            }

            $scope.actionButtonAddCss = function() {
                if ($scope.adding) {
                    return "lt-ip-action-button-selected";
                }
                return "lt-ip-action-button";
            }

            $scope.actionButtonGlyphiconAddCss = function() {
                if ($scope.adding) {
                    return "lt-ip-action-button-glyphicon-selected";
                }
                return "lt-ip-glyphicon";
            }

            $scope.actionButtonLabelAddCss = function() {
                if ($scope.adding) {
                    return "lt-ip-action-button-label-selected";
                }
                return "lt-ip-action-button-label";
            }

	    $scope.groupsListCss = function(state) {
		if (state == null) {
		    return "lt-ip-groups-list";
		}
		else if (state == "selected") {
		    return "lt-ip-groups-list-selected";
		} else if (state == "edit") {
		    return "lt-ip-groups-list-edit";
		} else if (state == "remove") {
		    return "lt-ip-groups-list-remove";
		}

	    }

	    $scope.groupsListLabelCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-label-edit";
		}
		return "lt-ip-groups-list-label";
	    }

	    $scope.groupsListGlyphiconCss = function(state) {
		if (state == null) {
		    return "lt-ip-groups-list-glyphicon-container hidden";
		}
		return "lt-ip-groups-list-glyphicon-container show";
	    }
	    $scope.groupsListGlyphiconRightCss = function(state) {
		if (state == "selected") {
		    return "glyphicon-trash lt-ip-glyphicon";
		} else if (state == "edit") {
		    return "glyphicon-remove lt-ip-groups-add-glyphicon";
		} else if (state == "remove") {
		    return "glyphicon-remove lt-ip-groups-remove-glyphicon";
		}

	    }
	    $scope.groupsListGlyphiconLeftCss = function(state) {
		if (state == "selected") {
		    return "glyphicon-pencil lt-ip-glyphicon";
		} else if (state == "edit") {
		    return "glyphicon-ok lt-ip-groups-add-glyphicon";
		} else if (state == "remove") {
		    return "glyphicon-ok lt-ip-groups-remove-glyphicon";
		}
		return "lt-ip-glyphicon";
	    }
	    $scope.groupsListStartCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-start-edit";
		}
		return "lt-ip-groups-list-start";
	    }
	    $scope.groupsListEndCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-end-edit";
		}
		return "lt-ip-groups-list-end";
	    }


	    // Events that change states
            $scope.groupsMoveOver = function(iprange) {
                if (iprange.state == null && !$scope.adding) {
                    iprange.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(iprange) {
                if (iprange.state == "selected" && !$scope.adding) {
                    iprange.state = null;
                }
            }
	    $scope.right = function(iprange) {
		if (iprange.state == "selected") {
		    // this is the trash button at normal state
                    iprange.state = "remove";
		}
		else if (iprange.state == "edit") {
		    // this is the "x" button at edit state
		    if ($scope.editRange) {
			iprange.name = $scope.editRange.name;
			iprange.start = $scope.editRange.start;
			iprange.end = $scope.editRange.end;
			$scope.editRange = null;
		    }
		    iprange.state = null;
		} else if (iprange.state == "remove") {
		    // this is the cancel button at remove state.
		    iprange.state = null;
		}
	    }
	    $scope.left = function(iprange) {
		if (iprange.state == "selected") {
		    // This is the edit button at normal state.
                    $scope.editRange = angular.copy(iprange);
                    iprange.state = "edit";
                    $scope.adding = false;
		}
		else if (iprange.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			ipRangeId:iprange['ipRangeId'],
			start:iprange['start'],
			end:iprange['end'],
			partyId:iprange['partyId'],
			label:iprange['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key)+'&ipRangeId='+iprange['ipRangeId'],
			data: data,
			method: 'PUT',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).success(function(data, status, headers, config){
		    }).error(function(data, status, headers, config){
			alert("ip range request failed");
		    });
		    iprange.state = null;
		    $scope.editRange = null;
		} else if (iprange.state == "remove") {
		    // this is the remove button at remove state
		    $scope.removeConfirm(iprange);
		    iprange.state = null;
		}
	    }
	    $scope.addConfirm = function() {
		//alert("Nothing is added!");
		var data = {
		    start:$scope.newRange['start'],
		    end:$scope.newRange['end'],
		    partyId:$cookies.partyId,
		    label:$scope.newRange['name'],
		}
		$http({
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
		    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){
                    alert("ip range request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.ipranges.length; i++) {
		    $scope.ipranges[i].state=null;
		}
	    }
	    $scope.removeConfirm = function(iprange) {
                data = {
                    ipRangeId:iprange['ipRangeId'],
                    start:iprange['start'],
                    end:iprange['end'],
                    partyId:iprange['partyId'],
                    label:iprange['name'],
                };
                $http({
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key)+'&ipRangeId='+data['ipRangeId'],
                    data:data,
                    method: 'DELETE',
                }).success(function(data, status, headers, config){
                }).error(function(data, status, headers, config){
                    alert("ip range request failed");
                });
                var index = $scope.ipranges.indexOf(iprange);
                if (index > -1) {
                    $scope.ipranges.splice(index,1);
                }
		$scope.removeRange = null;
	    }
	    
	    // init
            $http({
                url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
                method: 'GET',
            }).success(function(data, status, headers, config){
		$scope.ipranges = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.ipranges.push({
			ipRangeId:entry['ipRangeId'],
			start:entry['start'],
			end:entry['end'],
			name:entry['label'],
			partyId:entry['partyId'],
			state:null
		    });
		}
            }).error(function(data, status, headers, config){
		alert("ip range request failed");
            });
	}
]);
