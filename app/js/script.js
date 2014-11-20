'use strict';

var landingPage = angular.module('landingPage', ['ui.bootstrap', 'ngResource', 'ngCookies', 'PTmodal']);
landingPage.controller('landingPageCtrl', function($scope, $window, $http, $cookieStore, $location, $anchorScroll, $modal, $log) {
    var counter = 0;
    var slides = $scope.slides = [];
    $scope.showModal = false;
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.modalInstance = null;
    var currentPT = null;
    $scope.showChoosePT = false;

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


    $scope.anchor = function() {
        $location.hash('third-layer');
        $anchorScroll();
    }

    $scope.choosePT = function() {
        var tmp = Math.random() * (slides.length - 0) + 0;
        var random = Math.floor(tmp);
        currentPT = slides[random];
        open(null, true);
        $scope.showModal = true;
        // $window.location.href = " https://online-pt-test.herokuapp.com/#/signup?PtId=" + slides[random].PTid;
    }


    $scope.addSlide = function() {
        slides.push({
            image: 'app/img/erik.jpg',
            name: 'Erik Flågen',
            path: 'app/text/erik.html',
            number: counter,
            id: 'Erik',
            PTid: '5433c1cf0779ed12008a1509'

        });
        counter++;
        slides.push({
            image: 'app/img/mikael.jpg',
            name: 'Mikael Johansson',
            path: 'app/text/mikael.html',
            number: counter,
            id: 'Mikael',
            PTid: '544a58c93b55751200daafb4',

        });
        counter++;
        slides.push({
            image: 'app/img/sondre.jpg',
            name: 'Sondre Krogh-Bjerke',
            path: 'app/text/sondre.html',
            number: counter,
            id: 'Sondre',
            PTid: '5410c5283877801100ced009',

        });
        counter++;
        slides.push({
            image: 'app/img/sandra.jpg',
            name: 'Sandra Gavrilov',
            path: 'app/text/sandra.html',
            number: counter,
            id: 'Sandra',
            PTid: '545a04a65d52590a0053ff00',

        });
        counter++;
        slides.push({
            image: 'app/img/maren.jpg',
            name: 'Maren Hovdenakk',
            path: 'app/text/maren.html',
            number: counter,
            id: 'Maren',
            PTid: '544a34b586d6511200fc8010',

        });
        counter++;
        slides.push({
            image: 'app/img/shamal.jpg',
            name: 'Shamal Kamal',
            path: 'app/text/shamal.html',
            number: counter,
            id: 'Shamal',
            PTid: '545385172e34da0a008d0041',

        });
        counter++;
    };

    $scope.addSlide();





    $scope.showModals = function(pt) {
        currentPT = pt;
        open()
        $scope.showModal = true;
    }

    $scope.login = function(PT) {
        mixpanel.track("User chose PT", {
            'ptIndex': PT.number,
            'Random index': random,
            'screen width': $window.innerWidth,
            'pt-name': PT.name
        });
        $window.location.href = " https://online-pt-test.herokuapp.com/#/login?PtId=" + PT.PTid;
    };

    $scope.loginWithRandomPT = function(PT) {
        mixpanel.track("User chose random PT", {
            'ptIndex': PT.number,
            'Random index': random,
            'screen width': $window.innerWidth,
            'pt-name': PT.name
        });
        $window.location.href = " https://online-pt-test.herokuapp.com/#/login?PtId=" + PT.PTid;
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




    var open = function(size, randomPT) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                },
                currentPT: function() {
                    return currentPT;
                },
                PTarray: function() {
                    return slides;
                }
            }
        });

        $scope.modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});

    };

});

angular.module('landingPage').controller('ModalInstanceCtrl', function($window, $scope, $modalInstance, items, currentPT, PTarray) {
    $scope.currentPT = currentPT;
    var PTarray = PTarray

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.redirect = function(PT) {
        $window.location.href = " https://online-pt-test.herokuapp.com/#/signup?PtId=" + PT.PTid;

    }
    $scope.next = function() {
        $scope.currentPT = PTarray[($scope.currentPT.number + 1) % PTarray.length];

    }

    $scope.prev = function() {
        if($scope.currentPT.number === 0)
            $scope.currentPT = PTarray[PTarray.length-1];
        else {
            $scope.currentPT = PTarray[$scope.currentPT.number-1];
        }

    }

});
