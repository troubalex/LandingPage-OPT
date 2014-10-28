'use strict';
angular.module('app', ['ui.bootstrap', 'ngResource', 'ngSanitize']);
angular.module('app').controller('CarouselDemoCtrl', function($scope, $window, $http) {



    $scope.currentText = '';
    var counter = 1;
    var slides = $scope.slides = [];
    $scope.showTwoSlides = true;
    $scope.currentPersonText = '';

    $scope.$watch(function() {
        if ($window.innerWidth < 560) {
            $scope.showTwoSlides = false;
        } else {
            $scope.showTwoSlides = true;
        }
    }, function(value) {
        console.log(value);
    });


    $scope.imgClass = function() {
        if ($scope.showTwoSlides)
            return "two-slides";
        else
            return "one-slide";
    }

    $scope.addSlide = function() {
        slides.push({
            image:  '/img/erik.jpg',
            name:   'Erik Flågen',
            path: '../text/erik.html',
            number: counter,
            id: '5433c1cf0779ed12008a1509'
        });
        counter++;
        slides.push({
            image: '/img/mikael.jpg',
            name: 'Mikael Johansson',
            path: '../text/mikael.html',
            number: counter,
            id: '544a58c93b55751200daafb4',
        });
        counter++;
        slides.push({
            image: '/img/john-ole.jpg',
            name: 'John Ole B. Elvehaug',
            path: '../text/john-ole.html',
            number: counter,
            id: 1337,
        });
        counter++;
        slides.push({
            image: '/img/sondre.jpg',
            name: 'Sondre Krogh-Bjerke',
            path: '../text/sondre.html',
            number: counter,
            id: '5410c5283877801100ced009',
        });
        counter++;
    };
    $scope.addSlide();

    $scope.getActiveSlide = function() {
        return slides.filter(function(s) {
            return s.active;
        })[0];


    };

    $scope.getNextActiveSlide = function() {
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].active) {
                return slides[(i + 1) % slides.length];
            }
        }

    }


    $scope.login = function(PT) {
        console.log(PT);
        FB.login(function(response) {

            $scope.userData = response;


            //get user info from FB:
            FB.api('/me', function(response) {
                var requestData = {
                    firstName: response.first_name,
                    lastName: response.last_name,
                    gender: response.gender,
                    facebookId: response.id,
                    PtId: PT.id

                };

                $http.post('/opt/api/auth', requestData)
                    .success(function(data) {
                        console.log(data);
                        $window.location.href = "http://online-pt-test.herokuapp.com/#/";
                    })
                    .error(function(e) {
                        console.log("err");
                    });
            });
        });
    };

    window.fbAsyncInit = function() {
        FB.init({
            appId: '824591080914567',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.1' // use version 2.1
        });
    };
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


});
