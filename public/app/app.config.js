'use strict';
angular.module('petStore')
    .config(function(
    	
        $locationProvider,
        $routeProvider
    ){
        $locationProvider.html5Mode({ enabled: true });
        $routeProvider
            .when("/",{
                template: "<h1>Pet Store Oficial</h1><br>" +
                		"<a ng-href='/customers'>Customers List</a><br>" +
                		"<a ng-href='/appointments'>Appointments List</a>"
            })
            .when("/customer/:id",{
              	//templateUrl: '<pet-card></pet-card>'
              	template: "<customer-card></customer-card>"
            })
            
            .when("/newcustomer",{
              	//templateUrl: '<pet-card></pet-card>'
              	template: "<customer-card></customer-card>"
            })
            
            .when("/customers",{
                template: "<customer-list></customer-list>"
            })
            
            .when("/pet/:id",{
              	template: "<pet-card></pet-card>"
            })
            
            .when("/newpet",{
              	template: "<pet-card></pet-card>"
            })
            
            .when("/appointments",{
              	template: "<appointments-list></appointments-list>"
            })
            
            
            .otherwise({
                template: "Other"
            });
    });