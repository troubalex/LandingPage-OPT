angular.module('PTmodal', [])
    .directive('ptModal', function($modal, $log) {
        return {
            restrict: 'E',
            scope: {
                PT: '='
            },
            templateUrl: "app/directive/modal.html",
            controller: function($scope) {

            }
        }
    });


