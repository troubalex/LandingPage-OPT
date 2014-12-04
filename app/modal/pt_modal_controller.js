angular.module('landingPage').controller('PtModalController', function($window, $scope, $modalInstance, currentPT, ptArray, currentIndex) {

    $scope.currentPT = currentPT;
    $scope.ptFirstName = $scope.currentPT.name.split(' ')[0];

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.ok = function(PT) {
        mixpanel.track("User redirected to heroku with PT", {
            'PT-Name': $scope.currentPT.name
        });
        $window.location.href = "http://app.online-pt.no/#/signup?PtId=" + $scope.currentPT.PTid;
    };

    $scope.nextPt = function() {
        if (currentIndex + 1 >= ptArray.length) {
            currentIndex = 0;
        }
        else{
            currentIndex += 1;
        }

        $scope.currentPT = ptArray[currentIndex];
        $scope.ptFirstName = $scope.currentPT.name.split(' ')[0];
    };

    $scope.previousPt = function() {

        if (currentIndex - 1 < 0) {
            currentIndex = ptArray.length - 1;
        }
        else{
            currentIndex -= 1;
        }

        $scope.currentPT = ptArray[currentIndex];
        $scope.ptFirstName = $scope.currentPT.name.split(' ')[0];
    };

});