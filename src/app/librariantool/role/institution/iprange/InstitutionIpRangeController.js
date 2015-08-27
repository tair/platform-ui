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
	    $scope.removing = false;
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

	    $scope.groupsRemoveCss = function() {
		if ($scope.removing) {
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
		if (state == "selected") {
		    if ($scope.removing) {
			return "lt-ip-groups-list-remove";
		    } else {
			return "lt-ip-groups-list-selected";
		    }
		} else if (state == "edit") {
		    return "lt-ip-groups-list-edit";
		} 
		return "lt-ip-groups-list";
	    }

	    $scope.groupsListLabelCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-label-edit";
		}
		return "lt-ip-groups-list-label";
	    }

	    $scope.groupsListGlyphiconCss = function(state) {
		if (state == "selected" || state == "edit") {
		    return "lt-ip-groups-list-glyphicon-container show";
		}
		return "lt-ip-groups-list-glyphicon-container hidden";
	    }
	    $scope.groupsListGlyphiconRemoveCss = function(state) {
		if (state == "selected") {
		    return "glyphicon-trash lt-ip-glyphicon";
		} else if (state == "edit") {
		    return "glyphicon-remove lt-ip-groups-add-glyphicon";
		}
	    }
	    $scope.groupsListGlyphiconEditCss = function(state) {
		if (state == "selected") {
		    return "glyphicon-pencil lt-ip-glyphicon";
		} else if (state == "edit") {
		    return "glyphicon-ok lt-ip-groups-add-glyphicon";
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
                if (iprange.state == null && !$scope.adding && !$scope.removing) {
                    iprange.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(iprange) {
                if (iprange.state == "selected" && !$scope.adding && !$scope.removing) {
                    iprange.state = null;
                }
            }
	    $scope.remove = function(iprange) {
		if (iprange.state == "edit") {
		    if ($scope.editRange) {
			iprange.name = $scope.editRange.name;
			iprange.start = $scope.editRange.start;
			iprange.end = $scope.editRange.end;
			$scope.editRange = null;
		    }
		    iprange.state = null;
		} else {
		    $scope.removing = true;
		    $scope.removeRange = iprange;
		}
	    }
	    $scope.edit = function(iprange) {
		if (iprange.state == "edit") {
		    //alert("nothing is edited!");
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
			alert("done");
		    }).error(function(data, status, headers, config){
			alert("ip range request failed");
		    });
		    iprange.state = null;
		    $scope.editRange = null;
		} else {
		    $scope.editRange = angular.copy(iprange);
		    iprange.state = "edit";
		    $scope.adding = false;
		    $scope.removing = false;
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
		    alert("done");
		}).error(function(data, status, headers, config){
                    alert("ip range request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		$scope.removing = false;
		for (i=0; i<$scope.ipranges.length; i++) {
		    $scope.ipranges[i].state=null;
		}
	    }
	    $scope.removeConfirm = function() {
		$scope.removing = false;
		//alert("Nothing is changed yet! Need backend call");
		iprange = $scope.removeRange;
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
                    alert("done");
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
