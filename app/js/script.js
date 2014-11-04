'use strict';
var landingPage = angular.module('landingPage', ['ui.bootstrap', 'ngResource', 'ngCookies']);
landingPage.controller('CarouselDemoCtrl', function($scope, $window, $http, $cookieStore, $location, $anchorScroll) {
    $scope.currentText = '';
    var counter = 1;
    var slides = $scope.slides = [];
    $scope.showTwoSlides = true;
    $scope.currentPersonText = '';
    var PtId;
    var random;


    $scope.$watch(function() {
        if ($window.innerWidth < 560) {
            $scope.showTwoSlides = false;
        } else {
            $scope.showTwoSlides = true;
        }
    });

    $scope.init = function() {
        mixpanel.track('User viewed sales page');
    }

    var QueryString = function() {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    }



    $scope.imgClass = function() {
        if ($scope.showTwoSlides)
            return 'two-slides';
        else
            return 'one-slide';
    };



    $scope.addSlide = function() {
        slides.push({
            image: '/img/erik.jpg',
            name: 'Erik Flågen',
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
            image: '/img/sondre.jpg',
            name: 'Sondre Krogh-Bjerke',
            path: '../text/sondre.html',
            number: counter,
            id: '5410c5283877801100ced009',
        });
        counter++;
        slides.push({
            image: '/img/sandra.jpg',
            name: 'Sandra Gavrilov',
            path: '../text/sandra.html',
            number: counter,
            id: '',
        });
        counter++;
        slides.push({
            image: '/img/maren.jpg',
            name: 'Maren Hovdenakk',
            path: '../text/maren.html',
            number: counter,
            id: '',
        });
        counter++;
        slides.push({
            image: '/img/per.jpg',
            name: 'Per Arnér',
            path: '../text/per.html',
            number: counter,
            id: '',
        });
        counter++;
    };

    $scope.addSlide();

    $scope.random = function() {
        var tmp = Math.random() * (slides.length - 0) + 0;
        random = Math.floor(tmp);
        slides[random].active = true;


    }
    $scope.random();


    $scope.getActiveSlide = function() {
        return slides.filter(function(s) {
            return s.active;
        })[0];


    };
    $scope.goToSale = function() {
        $location.hash('second-layer');
        $anchorScroll();

    }

    $scope.goToPT = function() {
        $location.hash('our-coach-background');
        $anchorScroll();

    }

    $scope.getNextActiveSlide = function() {
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].active) {
                return slides[(i + 1) % slides.length];
            }
        }

    };
    var findPT = function() {
        slides.forEach(function(PT) {
            if (PT.id === PtId) {
                PT.active = true;
            }
        });
    };
    PtId = QueryString().id;
    if (PtId)
        findPT();


    $scope.login = function(PT) {
        mixpanel.track("User chose PT", {
            'ptIndex':PT.number,
            'Random index': random,     
            'screen width': $window.innerWidth,   
            'pt-name':PT.name     
        });
        $window.location.href = " https://online-pt-test.herokuapp.com/#/login?PtId=" + PT.id;
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
