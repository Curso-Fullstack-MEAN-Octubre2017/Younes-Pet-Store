'use strict';

angular.module('petService', []).factory('petService', function($resource, $q){
    return $resource('/api/pets/:id', {id: '@id'}, {
        update: { method:'PUT'}
    })	
});