angular.module('app', ['ui.bootstrap', 'ngResource']);
angular.module('app').controller('CarouselDemoCtrl', function ($scope, $window, $http) {



	$scope.myInterval = 5000;
	$scope.currentText ='';
	var counter = 1;
	var slides = $scope.slides = [];
	$scope.t={
		t:'sapda'
	};
	$scope.sap ='';
	$scope.addSlide = function() {
		slides.push({
			image: '/img/Brynjar.jpg',
			text:"Brynjar McSwaggy",
			name:"Brynjar",
			number:counter,
			id:1337
		});
		counter++;
		slides.push({
			image: '/img/Henrik.jpg',
			text:"Henrik Von Helvete",
			name:"Henrik",
			number:counter,
			id:1337
		});
		counter++;
	};
	$scope.addSlide();

	$scope.getActiveSlide = function () {
		return slides.filter(function (s) { return s.active; })[0];
	};


	$scope.login = function(){


		FB.login(function(response) {

			if (!response.authResponse) {
				return;
			}

			$scope.userData = response;


			//get user info from FB:
			FB.api('/me', function(response){
				var requestData = {
					firstName: response.first_name,
					lastName: response.last_name,
					gender: response.gender,
					facebookId: response.id,
				};

				$http.post('/opt/api/auth',requestData)
				.success(function (data) {
					$window.location.href = "https://online-pt-mvp.app.iterate.no/#/";
				})
				.error(function (e) {
					console.log("err");
				});



				
				

			});
		});
	};

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '824591080914567',
			cookie     : true,  // enable cookies to allow the server to access
			// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.1' // use version 2.1
		});
	};
	// Load the SDK asynchronously
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));


});








