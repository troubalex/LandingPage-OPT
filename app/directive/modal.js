angular.module('PTmodal', [])
    .directive('ptModal', function($modal, $log) {
        return {
            restrict: 'E',
            scope: {
                pt: '='
            },
            templateUrl: "app/directive/modal.html",
            controller: function($scope) {
                console.log($scope.pt);
            }
        }
    });
