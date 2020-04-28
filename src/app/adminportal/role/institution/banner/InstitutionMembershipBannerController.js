/**
 * InstitutionMembershipBannerController
 */

angular.module('platform-ui.adminportal.role.institution.banner').controller(
    /* Name */
    'InstitutionMembershipBannerController',

    /* Dependencies */
    [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    'Title',
    'InstitutionMembershipBannerModel',

    /* Controller Definition */
    function ($scope, $http, $cookies, $window, $location, $state, Title, InstitutionMembershipBannerModel) {
        init();
        
        $scope.edit_fields = function() {
            if ($scope.edit==true) {
                if (!validateInfo()) {
                    alert("Information not valid");
                    return false;
                }
                //Save info
                put_data = {}
                //put original values from GET
                put_data["partyId"]  = $scope.institutionId;
                put_data["imageUrl"]= $scope.imageInfo.imageUrl;
                put_data["name"]= $scope.imageInfo.name;
            }
            $scope.edit = !$scope.edit;
        }

        $scope.cancel = function() {
            $scope.edit = false;
        }

        function validateInfo() {
            return true;
        }

        function init() {
            $scope.setCurrentTab(InstitutionMembershipBannerModel.currentTab);
            $scope.imageInfo = InstitutionMembershipBannerModel.imageInfo;
            $scope.uiparams = InstitutionMembershipBannerModel.uiparams;
            $scope.imageInfo.partyId = $scope.institutionId;
            $http({
                url: $scope.apiUri+'/parties/imageinfo/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
                $scope.imageInfo.name = data[0].name;
                $scope.imageInfo.imageUrl = data[0].imageUrl;
            }).error(function(data, status, headers, config){
                // errMsg = "GET /parties/imageinfo/ Failed";
                // bootbox.alert(errMsg);
            });
        }
    }
]);
