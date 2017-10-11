'use strict';
angular.module('petStore')
    .config(function(
    	
        $locationProvider,
        $routeProvider
    ){
        $locationProvider.html5Mode({ enabled: true });
        $routeProvider
            .when("/",{
                template: "Pet Store Demo (Hello World) <a ng-href='sample'>Sample Module</a>"
            })
            .when("/customer/ficha/:_id",{
              	//templateUrl: '<pet-card></pet-card>'
              	template: "<customer-card></customer-card>"
            })
            .when("/customers",{
                template: "<customer-list></customer-list>"
            })
            .otherwise({
                template: "Other"
            });
    });