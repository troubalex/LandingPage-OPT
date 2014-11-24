angular.module('PTmodal', [])
    .directive('ptModal', function($modal, $log) {
        return {
            restrict: 'E',
            scope: {
                pt: '='
            },
            templateUrl: "app/directive/modal.html"
        }
    });


