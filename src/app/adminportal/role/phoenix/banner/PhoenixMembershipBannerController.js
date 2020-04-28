/**
 * PhoenixMembershipBannerController
 */

angular.module('platform-ui.adminportal.role.phoenix.banner').controller(
    /* Name */
    'PhoenixMembershipBannerController',

    /* Dependencies */
    [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    'Title',
    'PhoenixMembershipBannerModel',

    /* Controller Definition */
    function ($scope, $http, $cookies, $window, $location, $state, Title, PhoenixMembershipBannerModel) {
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
                put_data["partyId"]  = $scope.user.partyId;
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
            $scope.setCurrentTab(PhoenixMembershipBannerModel.currentTab);
            $scope.imageInfo = PhoenixMembershipBannerModel.imageInfo;
            $http({
                url: $scope.apiUri+'/party/imageInfo/?='+$scope.user.partyId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
                $scope.imageInfo.name = data[0].name;
                $scope.imageInfo.imageUrl = data[0].imageUrl;
            }).error(function(data, status, headers, config){
                errMsg = "GET /parties/institutions/ Failed";
                //bootbox.alert(errMsg);
            });
        }
    }
]);
