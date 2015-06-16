/**
 * boilerplate - v - 2015-06-16
 * 
 *
 * Copyright (c) 2015 Getexp, Inc.
 */
angular.module("boilerplate",["templates-app","ui.bootstrap","ui.router","ngResource","ngRoute","service.title","boilerplate.home","boilerplate.metering","boilerplate.subscription"]).config(["$routeProvider","$httpProvider","$urlRouterProvider",function(a,b,c){delete b.defaults.headers.common["X-Requested-With"],b.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8",b.defaults.transformRequest=[function(a){return angular.isObject(a)&&"[object File]"!==String(a)?jQuery.param(a):a}],c.otherwise("/home")}]).run(["$rootScope","Title","BoilerplateModel",function(a,b,c){b.setSuffix(" | "+c.brand)}]),angular.module("boilerplate").controller("BoilerplateController",["$scope","BoilerplateModel",function(a,b){a.title=b.title,a.brand=b.brand,a.author=b.author,a.menu=b.menu}]),angular.module("boilerplate").factory("BoilerplateModel",[function(){return{title:"Sample Angular App",brand:"Boilerplate",author:"Getexp",menu:[{label:"Home",target:"#home"},{label:"About",target:"",dropdown:[{label:"About",icon:"fa-info-circle",target:"#about"},{label:"Contact",icon:"fa-phone",target:"#contact"}]}]}}]),angular.module("service.title",[]).service("Title",["$document",function(a){var b=title="";this.getSuffix=function(){return b},this.setSuffix=function(a){b=a},this.getTitle=function(){return a.prop("title")},this.setTitle=function(c){""!==b?title=c+b:title=c,a.prop("title",title)}}]),angular.module("boilerplate.home",["ui.router","service.title"]).config(["$stateProvider",function(a){a.state("home",{url:"/home",views:{main:{controller:"HomeController",templateUrl:"home/home.html"}}})}]),angular.module("boilerplate.home").controller("HomeController",["$scope","Title","HomeModel",function(a,b,c){b.setTitle(c.title)}]),angular.module("boilerplate.home").factory("HomeModel",[function(){return{title:"Home"}}]),angular.module("boilerplate.metering",["ui.router","service.title"]).config(["$stateProvider",function(a){a.state("metering",{url:"/metering",views:{main:{controller:"MeteringController",templateUrl:"metering/metering.html"}}})}]),angular.module("boilerplate.metering").controller("MeteringController",["$scope","Title","MeteringModel",function(a,b,c){b.setTitle(c.title)}]),angular.module("boilerplate.metering").factory("MeteringModel",[function(){return{title:"Metering"}}]),angular.module("boilerplate.subscription",["ui.router","service.title","boilerplate.subscription.info.individual","boilerplate.subscription.info.institution"]).config(["$stateProvider",function(a){a.state("subscription",{url:"/subscription",views:{main:{controller:"SubscriptionController",templateUrl:"subscription/subscription.html"}}})}]),angular.module("boilerplate.subscription").controller("SubscriptionController",["$scope","Title","SubscriptionModel",function(a,b,c){function d(){b.setTitle(c.title),a.initialheading=c.initialheading,a.license=c.license,a.licenses=c.licenses,a.currentTab=c.currentTab,a.tabs=c.tabs,a.templates=c.templates}d(),a.next=function(){switch(a.currentTab){case"chooseTab":"def"!=a.license&&(a.currentTab="infoTab");break;case"infoTab":a.currentTab="paymentConfirmationTab";break;case"paymentConfirmationTab":}},a.back=function(){switch(a.currentTab){case"infoTab":a.currentTab="chooseTab";break;case"paymentConfirmationTab":a.currentTab="infoTab"}},a.set_license=function(b){a.license=b}}]),angular.module("boilerplate.subscription").factory("SubscriptionModel",[function(){return{title:"Subscription",license:"def",currentTab:"chooseTab",licenses:{individual:{id:"individual",heading:"Individual benefits",benefits:[{text:"Who should choose this"},{text:"What they get"}]},institution:{id:"institution",heading:"Institutional Benefits",benefits:[{text:"Who should choose this"},{text:"What they get"}]},commercial:{id:"commercial",heading:"Commercial Benefits",benefits:[{text:"Who should choose this"},{text:"What they get"}]},def:{id:"default",heading:"Subscription Benefits",benefits:[{text:"Unlimited Access to the TAIR pages"},{text:"More wonderful benefits and features"},{text:"Some other option"}]}},tabs:{tab1:{id:"chooseTab",text:"Choose License"},tab2:{id:"infoTab",text:"Your Info"},tab3:{id:"paymentConfirmationTab",text:"Payment/Confirmation"}},templates:{chooseTab:"subscription/choose/choose.html",infoTab:{individual:"subscription/info/individual/individualInfo.html",institution:"subscription/info/institution/institutionInfo.html",commercial:"subscription/info/commercial/commercialInfo.html"},paymentConfirmationTab:{individual:"subscription/paymentConfirmation/individual/individualPay.html",institution:"subscription/paymentConfirmation/institution/institutionPay.html",commercial:"subscription/paymentConfirmation/commercial/commercialPay.html"}}}}]),angular.module("boilerplate.subscription.info.individual",["ui.router","service.title"]).config(["$stateProvider",function(a){}]),angular.module("boilerplate.subscription.info.individual").controller("IndividualInfoController",["$scope","$rootScope","IndividualInfoModel",function(a,b,c){function d(){a.formdata=c.formdata}d(),a.resetIndividualForm=function(){a.formdata={firstname:"",lastname:"",email:"",individual:"",librarianName:"",librarianEmail:"",comments:""}}}]),angular.module("boilerplate.subscription.info.individual").factory("IndividualInfoModel",[function(){return{formdata:{firstname:"",lastname:"",email:"",individual:"",librarianName:"",librarianEmail:"",comments:""}}}]),angular.module("boilerplate.subscription.info.institution",["ui.router","service.title"]).config(["$stateProvider",function(a){}]),angular.module("boilerplate.subscription.info.institution").controller("InstitutionInfoController",["$scope","$rootScope","InstitutionInfoModel",function(a,b,c){function d(){a.formdata=c.formdata}d(),a.resetInstitutionForm=function(){a.formdata={firstname:"",lastname:"",email:"",institution:"",librarianName:"",librarianEmail:"",comments:""}}}]),angular.module("boilerplate.subscription.info.institution").factory("InstitutionInfoModel",[function(){return{formdata:{firstname:"",lastname:"",email:"",institution:"",librarianName:"",librarianEmail:"",comments:""}}}]),angular.module("boilerplate.subscription.paymentConfirmation.individual",["ui.router","service.title"]).config(["$stateProvider",function(a){}]),angular.module("boilerplate.subscription.paymentConfirmation.individual").controller("IndividualPayController",["$scope","$rootScope","IndividualPayModel",function(a,b,c){function d(){a.formdata=c.formdata}d(),a.resetIndividualPayForm=function(){a.formdata={firstname:"",lastname:"",email:"",institution:"",street:"",city:"",state:"",zip:"",creditcard:"",expdate:"",cvc:""}}}]),angular.module("boilerplate.subscription.paymentConfirmation.individual").factory("IndividualPayModel",[function(){return{formdata:{firstname:"",lastname:"",email:"",institution:"",street:"",city:"",state:"",zip:"",creditcard:"",expdate:"",cvc:""}}}]),angular.module("templates-app",["home/home.html","metering/metering.html","subscription/choose/choose.html","subscription/info/individual/individualInfo.html","subscription/info/institution/institutionInfo.html","subscription/paymentConfirmation/individual/individualPay.html","subscription/subscription.html"]),angular.module("home/home.html",[]).run(["$templateCache",function(a){a.put("home/home.html",'<div class="container">\n	<!-- <div class="jumbotron">\n		<h1>Boilerplate</h1>\n		<p>A sample AngularJS app.</p>\n	</div> --!>\n	<div class="row">\n		<div class="col-md-offset-2 col-md-8">\n			<div class="row"><div class="col-md-12">\n				<div class="panel panel-default metering-panel">\n					<div class="panel-heading metering-panel-heading">\n						<div class="row">\n							<div class="col-md-offset-2 col-md-2">\n								<i class="fa fa-exclamation-triangle fa-4x text-danger text-center"></i>\n							</div>\n							<div class="col-md-6">\n								You are about to exceed your limit of free available page views this month.\n							</div>\n						</div>\n					</div>\n					<div class="panel-body">\n						<div class="row">\n							<div class="col-md-6">\n								<div class="metering-body-heading">Subscription Benefits</div>\n								<ul>\n									<li>Unlimited Access to the TAIR pages</li>\n									<li>More wonderful benefits and features</li>\n									<li>Some other option</li>\n								</ul>\n							</div>\n							<div class="col-md-6">\n								<div style="margin-top: 56px;" class="metering-body-text">To gain unlimited access, please</div>\n								<div class="metering-subscribe-button"><button class="btn btn-success">SUBSCRIBE</button></div>\n								<div class="metering-body-text">Already have a subscription</div>\n								<div class="metering-login-button"><button class="btn btn-success metering-login-button">LOG IN</button></div>\n								<div class="metering-keepbrowsing-button"><button class="btn btn-default metering-keepbrowsing-button">KEEP BROWSING</button></div>\n							</div>\n						</div>\n					</div>\n				</div>\n			</div></div>\n			<div class="row"><div class="col-md-offset-8 col-md-4">\n				<div class="metering-powered-by-text">Powered by</div>\n			</div></div>\n		</div>\n	</div>\n</div>\n')}]),angular.module("metering/metering.html",[]).run(["$templateCache",function(a){a.put("metering/metering.html",'<div class="container">\n	<div class="row"><div class="col-md-12">\n		<div style="margin-left: auto; margin-right: auto;" class="panel panel-default metering-panel">\n			<div class="panel-heading metering-panel-heading" style="padding-left: 100px; padding-right: 100px;">\n				<div style="height: 20px;" class="row"></div>\n				<div class="row">\n					<div class="col-md-3 text-center">\n						<i class="fa fa-exclamation-triangle fa-4x text-danger"></i>\n					</div>\n					<div class="col-md-9 text-left">\n						<div class="row" style="height: 10px;"></div>\n						You are about to exceed your limit of free available page views this month.\n					</div>\n				</div>\n			</div>\n			<div class="panel-body" style="padding-top: 0px;">\n				<div class="row" style="height: 56px;"></div>\n				<div class="row">\n					<div class="col-md-6">\n						<div class="row" style="height: 34px;"></div>\n						<div class="row">\n							<div class="metering-body-heading text-center">Subscription Benefits</div>\n						</div>\n						<div class="row">\n							<ul class="col-md-offset-2 col-md-10">\n								<li>Unlimited Access to the TAIR pages</li>\n								<li>More wonderful benefits and features</li>\n								<li>Some other option</li>\n							</ul>\n						</div>\n					</div>\n					<div class="col-md-6" style="padding-left: 73px;">\n						<div class="row"><div class="col-md-12">\n							<div class="metering-body-text">To gain unlimited access, please</div>\n						</div></div>\n						<div class="row" style="height: 15px;"></div>\n						<div class="row"><div class="col-md-12">\n							<button class="btn btn-success btn-success-tair">SUBSCRIBE</button>\n						</div></div>\n						<div class="row" style="height: 32px;"></div>\n						<div class="row"><div class="col-md-12">\n							<div class="metering-body-text">Already have a subscription</div>\n						</div></div>\n						<div class="row" style="height: 14px;"></div>\n						<div class="row"><div class="col-md-12">\n							<button class="btn btn-success btn-primary-tair">LOG IN</button>\n						</div></div>\n						<div class="row" style="height: 10px;"></div>\n						<div class="row"><div class="col-md-12">\n							<button class="btn btn-default btn-default-tair">KEEP BROWSING</button>\n						</div></div>\n					</div>\n				</div>\n				<div class="row" style="height: 41px;"></div>\n			</div>\n		</div>\n	</div></div>\n	<div class="row"><div class="col-md-12">\n		<div style="width: 697px; display: block; margin-left: auto; margin-right: auto;">\n			<div class="row"><div class="col-md-12 text-right">\n				Powered by <img src="assets/Phoenix.png">\n			</div></div>\n		</div>\n	</div></div>\n</div>\n')}]),angular.module("subscription/choose/choose.html",[]).run(["$templateCache",function(a){a.put("subscription/choose/choose.html",'<div style="height: 45px;" class="row"></div>\n<div class="row">\n	<div class="col-md-6">\n		<div style="height: 60px;" class="row"></div>\n		<div class="row">\n			<div class="text-center subscription-body-heading">{{licenses[license].heading}}</div>\n		</div>\n		<div class="row">\n			<ul class="col-md-offset-2 col-md-10 subscription-benefits">\n				<li ng-repeat="b in licenses[license].benefits">\n					{{ b.text }}\n				</li>\n			</ul>\n		</div>\n	</div>\n	<div class="col-md-6">\n		<div class="row"><div class="subscription-licence-text text-center">Choose License Type</div></div>\n		<div style="height: 40px;" class="row"></div>\n		<div class="row">\n			<a href=""><div class="col-md-6" ng-click="set_license(\'individual\')">\n				<div class="row text-center"><img class="img-to-inline-block" src="assets/Individual.png"></div>\n				<div style="height: 20px;" class="row"></div>\n				<div class="row">\n					<div class="col-md-offset-2 col-md-8 text-center subscription-img-tags">Individual Academic</div>\n				</div>\n			</div></a>\n			<a href=""><div class="col-md-6" ng-click="set_license(\'institution\')">\n				<div class="row text-center"><img class="img-to-inline-block" src="assets/Institutional.png"></div>\n				<div style="height: 20px;" class="row"></div>\n				<div class="row">\n					<div class="col-md-offset-2 col-md-8 text-center subscription-img-tags">Institutional (recommended)</div>\n				</div>\n			</div></a>\n		</div>\n		<div style="height: 35px;" class="row"></div>\n		<div class="row">\n			<a href=""><div class="col-md-6" ng-click="set_license(\'commercial\')">\n				<div class="row text-center"><img class="img-to-inline-block" src="assets/Tag.png"></div>\n				<div style="height: 20px;" class="row"></div>\n				<div class="row">\n					<div class="col-md-offset-2 col-md-8 text-center subscription-img-tags">Commercial</div>\n				</div>\n			</div></a>\n		</div>\n	</div>\n</div>\n<!--<div style="height: 45px;" class="row"></div>--!>\n<div class="row"><button type="button" class="btn btn-default text-center" ng-click="next()">NEXT</button></div>\n')}]),angular.module("subscription/info/individual/individualInfo.html",[]).run(["$templateCache",function(a){a.put("subscription/info/individual/individualInfo.html",'<div ng-controller="IndividualInfoController">\n	<form>\n		<div class="row"><div class="col-md-12">\n			Purchase academic license for individual use\n		</div></div>\n		<div class="row"><div class="col-md-12">\n			Check <a href="">this list</a> to see if you already have access to Tair through your library.\n			If your institution is subscribed and you are unable to access a page, please contact us at\n			<a href="">info@phoenixbioinformatics.org</a>\n		</div></div>\n		<div class="row">\n			<div class="col-md-6">\n				Tair academic license for individual user\n			</div>\n			<div class="col-md-6">\n				<div class="radio" ng-repeat="sub in subscriptions">\n					<label>\n						<input type="radio" name="licenseoptions" id="sub.id" value="sub.id" checked>\n						{{ sub.period }} (${{ sub.price }})\n					</label>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-6">\n				*Number of subscribers<br>\n				<input type="text" required/>\n			</div>\n			<div class="col-md-6">\n				Recieve a 10% discount if you purchase 2 or more individual licenses together\n			</div>\n		</div>\n		<div class="row"><div class="col-md-12">\n			<div class="checkbox">\n				<label>\n					<input type="checkbox" value="">\n					I confirm that I am an academic or non-profit user. \n				</label>\n			</div>\n			<div class="checkbox">\n				<label>\n					<input type="checkbox" value="">\n					I agree to <a href="">Terms of Use</a>\n				</label>\n			</div>\n		</div></div>\n		<div class="row"><div class="col-md-12">\n			Subtotal: {{ ng-model-var }}\n		</div></div>\n		<div class="row"><div class="col-md-12">\n			<button type="button" class="btn btn-default" ng-click="back()">BACK</button>\n			<button type="button" class="btn btn-default">RESET FORM</button>\n			<button type="submit" class="btn btn-success" ng-click="next()">NEXT</button>\n		</div>\n	</form>\n</div>\n')}]),angular.module("subscription/info/institution/institutionInfo.html",[]).run(["$templateCache",function(a){a.put("subscription/info/institution/institutionInfo.html",'<div ng-controller="InstitutionInfoController">\n	<div class="row">\n		Have TAIR contact you about an academic institutional subscription\n	</div>\n	<form ng-submit="next()">\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="firstname">*First Name</label>\n					<input type="text" class="form-control" id="firstname" ng-model="formdata.firstname" required>\n				</div>	\n			</div>\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="lastname">*Last Name</label>\n					<input type="text" class="form-control" id="lastname" ng-model="formdata.lastname" required>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="email">*Email</label>\n					<input type="email" class="form-control" id="email" ng-model="formdata.email" required>\n				</div>\n			</div>\n			<div class="col-md-6">\n				<div class="row"><div class="col-md-12">\n					<div class="form-group">\n						<label for="institution">*Institution Name</label>\n						<input type="text" class="form-control" id="institution" ng-model="formdata.institution" required>\n					</div>\n				</div></div>\n				<div class="row"><div class="col-md-12">\n					<a>Check to see if your institution has already subscribed</a>\n				</div></div>\n			</div>\n		</div>\n		<div class="row"><div class="col-md-12">\n			We recommed providing your librarian\'s contact info to expedite the process.\n		</div></div>\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="librarianName">Librarian Contact Name</label>\n					<input type="text" class="form-control" id="librarianName" ng-model="formdata.librarianName">\n				</div>\n			</div>\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="librarianEmail">Librarian Email</label>\n					<input type="email" class="form-control" id="librarianEmail" ng-model="formdata.librarianEmail">\n				</div>\n			</div>\n		</div>\n		<div class="row"><div class="col-md-12">\n			<div class="form-group">\n				<label for="comments">Comments:</label>\n				<textarea type="text" class="form-control" id="comments" ng-model="formdata.comments" placeholder="TAIR is essential for my work. I would like to consider a subscription."></textarea>\n			</div>\n		</div></div>\n		<div class="row">\n			<div class="col-md-4 text-center">\n				<button type="button" class="btn btn-default" ng-click="back()">BACK</button>\n			</div>\n			<div class="col-md-4 text-center">\n				<button type="button" class="btn btn-default" ng-click="resetInstitutionForm()">RESET FORM</button>\n			</div>\n			<div class="col-md-4 text-center">\n				<button type="submit" class="btn btn-success">SUBMIT</button>\n			</div>\n		</div>\n	</form>\n</div>\n')}]),angular.module("subscription/paymentConfirmation/individual/individualPay.html",[]).run(["$templateCache",function(a){a.put("subscription/paymentConfirmation/individual/individualPay.html",'<div ng-controller="IndividualPayController">\n	<div class="row">Checkout</div>\n	<form ng-submit="next()">\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n	    					<label for="firstname">*First Name</label>\n	    					<input type="text" class="form-control" id="firstname" ng-model="payment.firstname" required>\n				</div>\n			</div>\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="lastname">*Last Name</label>\n					<input type="text" class="form-control" id="lastname" ng-model="payment.lastname" required>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="email">*Email(for reciepts/activation codes)</label>\n					<input type="email" class="form-control" id="email" ng-model="payment.email" required>\n				</div>\n			</div>\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="institution">*Institution</label>\n					<input type="text" class="form-control" id="institution" ng-model="payment.institution" required>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-12">\n				<div class="form-group">\n					<label for="street">*Billing Address Street</label>\n					<input type="text" class="form-control" id="street" ng-model="payment.street" required>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="city">*City</label>\n					<input type="text" class="form-control" id="city" ng-model="payment.city" required>\n				</div>\n			</div>\n			<div class="col-md-3">\n				<div class="form-group">\n					<label for="state">*State</label>\n					<input type="text" class="form-control" id="state" ng-model="payment.state" required>\n				</div>\n			</div>\n			<div class="col-md-3">\n				<div class="form-group">\n					<label for="zip">*Zip</label>\n					<input type="text" class="form-control" id="zip" ng-model="payment.zip" required>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-6">\n				<div class="form-group">\n					<label for="creditcard">*Credit Card Number</label>\n					<input type="text" class="form-control" id="creditcard" ng-model="payment.creditcard" required>\n				</div>\n			</div>\n			<div class="col-md-3">\n				<div class="form-group">\n					<label for="expdate">*Exp Date</label>\n					<input type="text" class="form-control" id="expdate" ng-model="payment.expdate" required>\n				</div>\n			</div>\n			<div class="col-md-3">\n				<div class="form-group">\n					<label for="cvc">*CVC</label>\n					<input type="text" class="form-control" id="cvc" ng-model="payment.cvc" required>\n				</div>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-md-4 text-center"><button type="button" class="btn btn-default" ng-click="back()">BACK</button></div>\n			<div class="col-md-4 text-center"><button type="button" class="btn btn-default" ng-click="reset()">RESET</button></div>\n			<div class="col-md-4 text-center"><button type="submit" class="btn btn-success">BUY</button></div>\n		</div>\n	</form>\n</div>\n')}]),angular.module("subscription/subscription.html",[]).run(["$templateCache",function(a){a.put("subscription/subscription.html",'<div class="container">\n	<!-- Subscription Panel --!>\n	<div class="row">\n		<div class="col-md-12">\n			<div style="margin-left: auto; margin-right: auto;" class="panel panel-default subscription-panel">\n				<!-- Heading --!>\n				<div class="panel-heading subscription-panel-heading">\n					<div style="height: 20px;" class="row"></div>\n					<div class="row text-center">\n						Subscribe\n					</div>\n				</div>\n				<!-- Body --!>\n				<div style="padding-top: 0px;" class="panel-body">\n					<!-- Tabs --!>\n					<div class="row">\n						<div class="col-md-4" ng-repeat="tab in tabs">\n							<div class="row subscription-tab" ng-class="{ active: currentTab == tab.id }"></div>\n							<div class="row subscription-tab-tag text-center">{{ $index + 1 }}.&nbsp;&nbsp;{{ tab.text }}</div>\n						</div>\n					</div>\n\n					<!-- Tab pages --!>\n					<div class="tab-page" ng-include="templates.chooseTab" ng-if="currentTab == \'chooseTab\'"></div>\n					<div class="tab-page" ng-if="currentTab == \'infoTab\'">\n						<div class="paymentTab" ng-repeat="(key, value) in templates.infoTab" ng-include="value" ng-if"license == key"></div>\n					</div>\n					<div class="tab-page" ng-if="currentTab == \'paymentConfirmationTab\'">\n						<div class="confirmationTab" ng-repeat="(key, value) in templates.paymentConfirmationTab" ng-include="value" ng-if="license == key"></div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	<!-- Powered By --!>\n	<div class="row"><div class="col-md-offset-8 col-md-4">\n		<div class="subscription-powered-by-text">Powered by <img src="assets/Phoenix.png"></div>\n	</div></div>\n</div>\n')}]);