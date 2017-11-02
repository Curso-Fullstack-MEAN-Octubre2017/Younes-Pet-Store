'use strict';
angular.module('petStore')
    .config(function(
    	
        $locationProvider,
        $routeProvider
    ){
        $locationProvider.html5Mode({ enabled: true });
        $routeProvider
            .when("/",{
                templateUrl: '/app/main-page/main-page.html'
            })
            .when("/customer/:id",{
              	template: "<customer-card></customer-card>"
            })
            
            .when("/customers/card",{
              	template: "<customer-card></customer-card>"
            })
            
            .when("/customers",{
                template: "<customer-list></customer-list>"
            })
            
            .when("/pets/card/:id",{
              	template: "<pet-card></pet-card>"
            })
              .when("/pets/cardNew/:idClient",{
              	template: "<pet-card></pet-card>"
            })
                       
            .when("/appointments/",{
              	template: "<appointments-list></appointments-list>"
            })
            
            .when("/appointments/:month",{
              	template: "<appointments-list></appointments-list>"
            })
            
            .when("/appointmentsof/:date", {
            	template: "<appointment-main></appointment-main>"
            		
            })
            
            .when("/appointment-detail/:id", {
            	template: "<appointment-edit></appointment-edit>"
            })
            
            .when("/appointment-main", {
            	template: "<appointment-main></appointment-main>"
            })
            
            
            .otherwise({
                template: "Other"
            });
    });