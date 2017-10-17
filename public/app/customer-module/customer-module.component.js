'use strict';
angular.module('customerList', []);
angular.module('customerList').
	component('customerList', 
			{templateUrl:'/app/customer-module/customer-module.html',
        controller: function($scope, $http) {
            console.log("Incializando costumer list");
            $scope.customers = [];
            
            $http.get("/api/customers").then(function (response){
                $scope.customers = response.data;
                console.log($scope.customers);
            });
            
       }
    });