/**
 * App Model
 */

angular.module('platform-ui').factory(
	/* Name */
	'PlatformModel',

	/* Dependencies */
	[

	'$scope',
	'$http',

	/* Controller */
	function ($scope, $http) {
	    
	    console.log('PlatformModel controller called');

        $http.get('/config/config.json').then(function(res) { 
            config = res.data[0];
            $scope.paywallApiBaseUri = config.paywallApiBaseUri
        });

        console.log('DEBUG2: ' + $scope.paywallApiBaseUri)
        
	    return {
		title: 'PW2 Angular App',
		brand: 'Platform UI',
		author: 'Getexp',
		uiDomain: '.arabidopsis.org',
        //apiUri: config.paywallApiBaseUri,
        apiUri: 'https://demoapi.arabidopsis.org',
		//apiUri: 'http://steveapi.steveatgetexp.com',
	    };
	}
]);
