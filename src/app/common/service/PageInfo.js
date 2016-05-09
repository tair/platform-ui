/**
 * Different PageInfo Service
 */

angular.module('service.pageinfo', []).service(
	/* Name */
	'PageInfo',

	/* Dependencies */
	[
	function () {
		var  pageInfo = {};

		this.getPageInfo = function () {
			return pageInfo;
		};

		this.setPageInfo = function (value) {
			pageInfo = value;
		};
	}
]);