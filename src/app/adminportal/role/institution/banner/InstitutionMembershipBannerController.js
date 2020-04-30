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
                    return false;
                }
                //Save image
                if (!$scope.imageFile) {
                    saveDataToDB();
                }
                saveUploadedImageAndData();
                
            }
            $scope.edit = !$scope.edit;
        }

        $scope.cancel = function() {
            resetByCache();
            $scope.edit = false;
        }

        $scope.uploadFile = function(element) {   
            $scope.imageFile = $(element)[0].files[0];
        };

        function validateInfo() {
            if (!$scope.imageInfo.name) {
                alert("Display name cannot be empty.");
                return false;
            } else if (!$scope.imageInfo.imageUrl && !$scope.imageFile) {
                alert("Please upload a logo image.");
                return false;
            }
            return true;
        }

        function saveUploadedImageAndData() {
            var fileName = $scope.imageFile.name;
            var upload = new $scope.AWS.S3.ManagedUpload({
                params: {
                  Bucket: "phx-subscribed-institution-logos",
                  Key: fileName,
                  Body: $scope.imageFile,
                  ACL: "public-read"
                }
            });

            var promise = upload.promise();

            promise.then(
                function(data) {
                    alert("Successfully uploaded the logo.");
                    $scope.imageInfo.imageUrl = "https://phx-subscribed-institution-logos.s3-us-west-2.amazonaws.com/" + fileName;
                    // do not remove old logo for now
                    saveDataToDB();
                    return true;
                },
                function(err) {
                    alert("There was an error uploading the logo: ", err.message);
                    return false;
                }
            );
        }

        function saveDataToDB() {
            //Save info
            put_data = {}
            //put original values from GET
            put_data["partyId"]  = $scope.institutionId;
            put_data["name"]= $scope.imageInfo.name;
            put_data["imageUrl"]= $scope.imageInfo.imageUrl;

            if ($scope.isNew) {
                $http({
                    url: $scope.apiUri+'/parties/imageinfo/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                    data: put_data,
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).success(function(data, status, headers, config){
                    $scope.isNew = false;
                    cacheInfo();
                }).error(function(data, status, headers, config) {
                    bootbox.alert("Failed to create banner info: " + data['error']);
                    $scope.cancel();
                });
            } else {
                if (hasChange()) {
                    $http({
                        url: $scope.apiUri+'/parties/imageinfo/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                        data: put_data,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    }).success(function(data, status, headers, config){
                        cacheInfo();
                    }).error(function(data, status, headers, config) {
                        bootbox.alert("Failed to update banner info: "+ data['error']);
                        $scope.cancel();
                    });
                } 
            }
        }

        function hasChange() {
            return ($scope.imageInfoPrev.name != $scope.imageInfo.name) ||
                ($scope.imageInfoPrev.imageUrl != $scope.imageInfo.imageUrl);
        }

        function init() {
            $scope.setCurrentTab(InstitutionMembershipBannerModel.currentTab);
            $scope.imageInfo = InstitutionMembershipBannerModel.imageInfo;
            // make shallow copy of model
            $scope.imageInfoPrev = Object.assign({}, InstitutionMembershipBannerModel.imageInfo);
            $scope.uiparams = InstitutionMembershipBannerModel.uiparams;
            $scope.imageInfo.partyId = $scope.institutionId;
            $scope.imageInfoPrev.partyId = $scope.imageInfo.partyId;
            $scope.AWS = initAWSInstance();
            $scope.imageFile = undefined;
            $scope.edit = true;
            $scope.isNew = true;
            $http({
                url: $scope.apiUri+'/parties/imageinfo/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
                if (data.length > 0) {
                    $scope.imageInfo.name = data[0].name;
                    $scope.imageInfo.imageUrl = data[0].imageUrl;
                    cacheInfo();
                    $scope.edit = false;
                    $scope.isNew = false;
                }
            }).error(function(data, status, headers, config){
                $("#banner-info").hide();
                $("#error-msg").show();
                $("#error-msg-text").html("Cannot load banner information. Please refresh the page or try again later.");
            });
        }

        function initAWSInstance() {
            var AWS = require("aws-sdk");
            // need to config ~/.aws/credentials
            var credentials = new AWS.SharedIniFileCredentials({profile: 'tairdev'});
            AWS.config.credentials = credentials;
            console.log("Region: ", AWS.config.region);
            return AWS;
        }

        function cacheInfo() {
            $scope.imageInfoPrev.name = $scope.imageInfo.name;
            $scope.imageInfoPrev.imageUrl = $scope.imageInfo.imageUrl;
        }

        function resetByCache() {
            $scope.imageInfo.name = $scope.imageInfoPrev.name;
            $scope.imageInfo.imageUrl = $scope.imageInfoPrev.imageUrl;
        }
    }
]);
