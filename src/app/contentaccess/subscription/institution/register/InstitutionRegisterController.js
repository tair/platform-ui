/**
 * Subscription Controller
 */

angular
  .module('platform-ui.contentaccess.subscription.institution.register')
  .controller(
    /* Name */
    'InstitutionRegisterController',

    /* Dependencies */
    [
      '$http',
      '$scope',
      '$stateParams',
      '$location',
      'InstitutionRegisterModel',

      /* Controller Definition */
      function (
        $http,
        $scope,
        $stateParams,
        $location,
        InstitutionRegisterModel
      ) {
        init()

        $scope.reset = function () {
          $scope.formdata = {
            firstName: null,
            lastName: null,
            email: null,
            institution: null,
            country: null,
            librarianName: null,
            librarianEmail: null,
            comments: getDefaultComment(),
            partnerName: $scope.partner.name,
          }
        }

        $scope.validate = function () {
          return (
            $scope.formdata.firstName != null &&
            $scope.formdata.lastName != null &&
            $scope.formdata.email != null &&
            $scope.formdata.institution != null &&
            $scope.formdata.institution.length > 5 &&
            $scope.formdata.country != null
          )
        }

        $scope.validateAndSubmit = function () {
          $scope.errors = null
          if ($scope.formdata.firstName == null) {
            $scope.errors = 'Please provide a firstname.'
            return false
          }
          if ($scope.formdata.lastName == null) {
            $scope.errors = 'Please provide a lastname.'
            return false
          }
          if ($scope.formdata.email == null) {
            $scope.errors = 'Please provide an email.'
            return false
          }
          if ($scope.formdata.institution == null) {
            $scope.errors = 'Please provide an institution.'
            return false
          }
          if ($scope.formdata.institution.length <= 5) {
            $scope.errors = 'Please enter the full name of your institution.'
            return false
          }
          if ($scope.formdata.country == null) {
            $scope.errors = 'Please select country.'
          }
          return true
        }

        $scope.validateCountry = function() {
          if (!$scope.formdata.country) return;
          switch ($scope.formdata.country) {
            case 'China':
              msg = 'Academic users in mainland China are covered by a national subscription through the National Science and Technology Library (NSTL). If you are experiencing access problems, please see our <a href="https://ui.arabidopsis.org/#/contentaccess/guide?partnerId=tair" target="_blank">guide to troubleshooting access issues.</a><br>国家科技图书文献中心（National Science and Technology Library of China, NSTL）为中国大陆地区科研学术机构统一订购了TAIR数据库。如果你无法访问TAIR，比如说看见以下提示："You have exceeded your limit for this month"，在联系我们之前，请参考<a href="https://ui.arabidopsis.org/#/contentaccess/guide?partnerId=tair" target="_blank">此页面</a>排查原因并采取相应措施'
              displayNationalSubscriptionError(msg);
              break;
            case 'Switzerland':
              msg = 'Academic users in Switzerland are covered by a national subscription through the Swiss Institute of Bioinformatics (SIB). If you are experiencing access problems, please see our <a href="https://ui.arabidopsis.org/#/contentaccess/guide?partnerId=tair" target="_blank">guide to troubleshooting access issues.</a>'
              displayNationalSubscriptionError(msg);
              break;
            default:
              resetNationalSubscriptionError();
          }
        }

        $scope.send = function () {
          // sendToAPI();
          sendToSalesForceCampaign()
          // $scope.next('thankyou');
        }

        function init() {
          if ($scope.partnerId == null) {
            $scope.partnerId = $stateParams.partnerId
          }
          $http({
            url: $scope.apiUri + '/partners/?partnerId=' + $scope.partnerId,
            method: 'GET',
          }).success(function (data, status, headers, config) {
            $scope.partner = data[0]
            $scope.formdata.partnerName = $scope.partner.name
            $scope.formdata.comments = getDefaultComment()
          })
          $scope.formdata = InstitutionRegisterModel.formdata
        }

        // sends form data to API; API code will send an email to subscriptions@phoenixbioinformatics.org
        function sendToAPI() {
          $http({
            url: $scope.apiUri + '/subscriptions/institutions/',
            data: $scope.formdata,
            method: 'POST',
          })
            .success(function (data, status, headers, config) {})
            .error(function (data, status, headers, config) {})
        }

        function sendToSalesForceCampaign() {
          var urlComponents = $location.absUrl().split('?')
          var nextPage = urlComponents[0] + '/thankyou'
          if (urlComponents[1] != undefined) nextPage += '?' + urlComponents[1]
          var formData = {
            retURL: nextPage,
            oid: '00Do0000000J6b5',
            Campaign_ID: getCampaignId(),
            member_status: 'Responded',
            first_name: $scope.formdata.firstName,
            last_name: $scope.formdata.lastName,
            email: $scope.formdata.email,
            company: $scope.formdata.institution,
            '00N5c00000FWaet': $scope.formdata.country, // Country 
            '00N1J00000G2kmS': $scope.formdata.librarianName, // Librarian Name
            '00N1J00000G2kmN': $scope.formdata.librarianEmail, // Librarian Email
            '00N1J00000G2kmX': $scope.formdata.comments, // Comments
            '00N5c00000FWaeu': getPartner(), // Product Interest
            '00N1J00000EuVUh': getABTestCode(), // A/B Test random code
          }
          var form = document.createElement('form')
          form.method = 'POST'
          form.action =
            'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'

          for (var field in formData) {
            if (formData.hasOwnProperty(field)) {
              var fieldElement = document.createElement('input')
              fieldElement.name = field
              fieldElement.value = formData[field]
              fieldElement.setAttribute('type', 'hidden')
              form.appendChild(fieldElement)
            }
          }
          document.body.appendChild(form)
          form.submit()
        }

        function getCampaignId() {
          var partnerId = $scope.partnerId
          if (!partnerId) return null
          switch (partnerId.toLowerCase()) {
            case 'tair':
              return '7011J000000xKsn'
            case 'biocyc':
              return '7011J000000xKss'
            case 'agbase':
              return '7011J000000gJD2'
            case 'repbase':
              return '7011J000000gJCx'
            case 'morphobank':
              return '7011J000001dFve'
            default:
              return null
          }
        }

        function getPartner() {
          var partnerId = $scope.partnerId
          if (!partnerId) return null
          switch (partnerId.toLowerCase()) {
            case 'tair':
              return 'TAIR'
            case 'biocyc':
              return 'BioCyc'
            case 'agbase':
              return 'AgBase'
            case 'repbase':
              return 'Repbase'
            case 'morphobank':
              return 'MorphoBank'
            default:
              return null
          }
        }

        function getABTestCode() {
          // 11/08/2018 PWL-610: Matt requested to always set test code to 'A'
          // return Math.random() < 0.5 ? 'A' : 'B';
          return 'A'
        }

        function getDefaultComment() {
          var partnerId = $scope.partnerId
          if (!partnerId) return null
          if (partnerId.toLowerCase() == 'morphobank') {
            return (
              $scope.partner.name +
              ' is essential to my work. I would like my library to consider becoming a member.'
            )
          } else {
            return (
              $scope.partner.name +
              ' is essential to my work. I would like my library to consider a subscription.'
            )
          }
        }

        function displayNationalSubscriptionError(msg) {
          $("#nationalSubError").html(msg);
          $("#submitBtn").prop("disabled",true);
        }

        function resetNationalSubscriptionError() {
          $("#nationalSubError").html();
          $("#submitBtn").prop("disabled",false);
        }
      },
    ]
  )
