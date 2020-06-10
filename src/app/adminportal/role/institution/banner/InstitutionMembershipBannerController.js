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
        
        $scope.save_fields = function() {
            if (!validateInfo()) {
                return false;
            }
            if (!$scope.imageFile) {
                // save name only
                saveDataToDB();
            } else {
                // save name and image
                saveUploadedImageAndData();
            }
        }

        $scope.cancel = function() {
            resetInfoByCache();
            clearImageFile();
            if (!$scope.isNew) {
                $scope.edit = false;
            }
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
            var imageType = $scope.imageFile.type;
            // get S3 signed Url
            var postData = {
                "key":fileName,
                "bucket":$scope.S3BucketName,
                "contentType":imageType
            };
            var apiUrl = "https://q0b0t0y6i9.execute-api.us-west-2.amazonaws.com/getsignedurl";
            
            $http({
                url: apiUrl,
                data: JSON.stringify(postData),
                method: "POST",
                headers: {"Content-Type":"application/json"}
            }).success(function(data, status, headers, config){
                var uploadUrl = data.url;
                
                $http({
                    url: uploadUrl,
                    data: $scope.imageFile,
                    method: 'PUT',
                    headers: {"Content-Type":imageType, "x-amz-acl":"public-read"}
                }).success(function(data, status, headers, config){
                    $scope.imageInfo.imageUrl = "https://" + $scope.S3BucketName + ".s3-us-west-2.amazonaws.com/" + fileName;
                    // do not remove old logo for now
                    if (saveDataToDB()) {
                        clearImageFile();
                    }
                }).error(function(data, status, headers, config) {
                    if (data) {
                        bootbox.alert("There was an error uploading the logo: " + data['error']);
                    } else {
                        bootbox.alert("There was an error uploading the logo.");
                    }
                });   
            }).error(function(data, status, headers, config) {
                if (data) {
                    bootbox.alert("There was an error uploading the logo. Failed to get signed url: " + data['error']);
                } else {
                    bootbox.alert("There was an error uploading the logo. Failed to get signed url.");
                }
            });
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
                    cacheInfo();
                    $scope.isNew = false;
                    $scope.edit = false;
                    return true;
                }).error(function(data, status, headers, config) {
                    if (data) {
                        bootbox.alert("Failed to create banner info: " + data['error']);
                    } else {
                        bootbox.alert("Failed to create banner info.");
                    }
                    return false;
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
                        $scope.edit = false;
                        return true;
                    }).error(function(data, status, headers, config) {
                        if (data) {
                            bootbox.alert("Failed to update banner info: "+ data['error']);
                        } else {
                            bootbox.alert("Failed to update banner info.");
                        }
                        return false;
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
            $scope.uiparams = InstitutionMembershipBannerModel.uiparams;
            // make shallow copy of model
            $scope.imageInfo = initDataModel();
            $scope.imageInfoPrev = initDataModel();
            $scope.imageFile = undefined;
            $scope.edit = false;
            $scope.isNew = true;
            $scope.S3BucketName = "phx-subscribed-institution-logos";
            $http({
                url: $scope.apiUri+'/parties/imageinfo/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
                if (data.length > 0) {
                    $scope.imageInfo.name = data[0].name;
                    $scope.imageInfo.imageUrl = data[0].imageUrl;
                    cacheInfo();
                    $scope.isNew = false;
                } else {
                    // show edit mode for no banner info institution
                    $scope.edit = true;
                }
            }).error(function(data, status, headers, config){
                $("#banner-info").hide();
                $("#error-msg").show();
                $("#error-msg-text").html("Cannot load banner information. Please refresh the page or try again later.");
            });
        }

        function initDataModel() {
            var dataModel = Object.assign({}, InstitutionMembershipBannerModel.imageInfo);
            dataModel.partyId = $scope.institutionId;
            return dataModel;
        }

        function cacheInfo() {
            $scope.imageInfoPrev.name = $scope.imageInfo.name;
            $scope.imageInfoPrev.imageUrl = $scope.imageInfo.imageUrl;
        }

        function resetInfoByCache() {
            $scope.imageInfo.name = $scope.imageInfoPrev.name;
            $scope.imageInfo.imageUrl = $scope.imageInfoPrev.imageUrl;
        }

        function clearImageFile() {
            $scope.imageFile = undefined;
            var fileElement = angular.element('#logo-upload');
            angular.element(fileElement).val(null);
        }
    }
]);
