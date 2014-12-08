/* global angular, mixpanel*/

var landingPage = angular.module('landingPage', ['ui.bootstrap', 'ngResource', 'ngCookies']);
landingPage.controller('landingPageCtrl', function($scope, $window, $timeout, $http, $cookieStore, $location, $modal, $log) {

    $scope.showModal = false;
    $scope.modalInstance = null;
    $scope.showChoosePT = false;

    $scope.init = function() {
        mixpanel.track('User viewed sales page');

        $scope.pts = [
            {
                image: 'app/img/erik.jpg',
                name: 'Erik Flågen',
                path: 'app/text/erik.html',
                PTid: '5433c1cf0779ed12008a1509',
                sideImg: 'app/img/erik_big.jpg',
                hqImg: 'app/img/erik_hq.jpg'
            },
            {
                image: 'app/img/mikael.jpg',
                name: 'Mikael Johansson',
                path: 'app/text/mikael.html',
                PTid: '544a58c93b55751200daafb4',
                sideImg: 'app/img/mikael.jpg',
                hqImg: 'app/img/mikael.jpg'
            },
            {
                image: 'app/img/sondre.jpg',
                name: 'Sondre Krogh-Bjerke',
                path: 'app/text/sondre.html',
                PTid: '5410c5283877801100ced009',
                sideImg: 'app/img/sondre.jpg',
                hqImg: 'app/img/sondre.jpg',
            },
            {
                image: 'app/img/sandra.jpg',
                name: 'Sandra Gavrilov',
                path: 'app/text/sandra.html',
                PTid: '545a04a65d52590a0053ff00',
                sideImg: 'app/img/sandra_side.jpg',
                hqImg: 'app/img/sandra_hq.jpg',
            },
            {
                image: 'app/img/maren_small.jpg',
                name: 'Maren Hovdenakk',
                path: 'app/text/maren.html',
                PTid: '544a34b586d6511200fc8010',
                sideImg: 'app/img/maren_stripe.jpg',
                hqImg: 'app/img/maren_hq.jpg',
            },
            {
                image: 'app/img/shamal.jpg',
                name: 'Shamal Kamal',
                path: 'app/text/shamal.html',
                PTid: '545385172e34da0a008d0041',
                sideImg: 'app/img/shamal_side.jpg',
                hqImg: 'app/img/shamal_hq.jpg',
            },
            {
                image: 'app/img/inga_small.jpg',
                name: 'Inga Aune',
                path: 'app/text/inga.html',
                PTid: '547cc81b94bead09007e3830',
                sideImg: 'app/img/inga_side.jpg',
                hqImg: 'app/img/inga_small.jpg',
            },
            {
                image: 'app/img/tone_small.jpg',
                name: 'Tone Madsen',
                path: 'app/text/tone.html',
                PTid: '547c72190718d40900fc4248',
                sideImg: 'app/img/tone_side.jpg',
                hqImg: 'app/img/tone_small_hq.jpg',
            },
            {
                image: 'app/img/caroline_small.jpg',
                name: 'Caroline Hauge',
                path: 'app/text/caroline.html',
                PTid: '547f74170065ba0900bfbf0d',
                sideImg: 'app/img/caroline_small.jpg',
                hqImg: 'app/img/caroline_hq.jpg',
            },
            {
                image: 'app/img/per.jpg',
                name: 'Per Arnér',
                path: 'app/text/per.html',
                sideImg: 'app/img/per.jpg',
                hqImg: 'app/img/per.jpg',
            },
            {
                image: 'app/img/nikita.jpg',
                name: 'Nikita Murphy',
                path: 'app/text/nikita.html',
                sideImg: 'app/img/nikita.jpg',
                hqImg: 'app/img/nikita.jpg',
            }
        ];
    };

    $scope.goToElement = function(element){
        var targetElement = document.getElementById(element);
        targetElement.scrollIntoView();
    };

    $scope.goToLogIn = function() {
        $window.location.href = 'http://app.online-pt.no/#/';
    };

    $scope.openPtModal = function(ptIndex) {

        $scope.modalInstance = $modal.open({
            templateUrl: 'app/modal/pt_modal_template.html',
            controller: 'PtModalController',
            resolve: {
                currentPT: function() {
                    return $scope.pts[ptIndex];
                },
                ptArray: function() {
                    return $scope.pts;
                },
                currentIndex: function(){
                    return ptIndex;
                }
            }
        });

        $scope.modalInstance.result.then(function() {
            mixpanel.track("User closes modal");
        });
    };

    $scope.openRandomPtModal = function() {

        var randomIndex = Math.floor(Math.random() * ($scope.pts.length - 3)); // -3 since the last 2 pts are unavailable
        $scope.openPtModal(randomIndex);

        mixpanel.track("User clicked 'Velg din trener nå'");
    };

});
