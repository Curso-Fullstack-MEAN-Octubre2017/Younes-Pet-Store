'use strict';

angular.module('sampleModule')
    .component('sampleModule', {
        templateUrl:'/app/sample-module/sample-module.html',
        controller: function($scope, $http) {
            console.log("Incializando sample-module")
            $scope.appointments = [];
            $http.get("tests/customer_crud_tests.js").then(function (response) {
                $scope.appointments = response.data;
                console.log($scope.customer);
            });
        }
    });

    