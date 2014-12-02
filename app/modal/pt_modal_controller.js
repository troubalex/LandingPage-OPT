angular.module('landingPage').controller('PtModalController', function($window, $scope, $modalInstance, currentPT, PTarray) {
    $scope.currentPT = currentPT;
    console.log($scope.currentPT);

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.ok = function(PT) {
        mixpanel.track("User redirected to heroku with PT", {
            'PT-Name': PT.name
        });
        $window.location.href = "http://app.online-pt.no/#/signup?PtId=" + PT.PTid;
    };

    $scope.next = function() {

    };

    $scope.prev = function() {

    };

});