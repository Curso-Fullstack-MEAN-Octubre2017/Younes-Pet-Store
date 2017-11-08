'use strict';

angular.module('appointmentsService', []).factory('appointmentsService', function($http, $q){
	var service = {};
	
	// cache local de los datos de appointments
	service._appointmentsMapByMonth = {};
	
	/**
	 * Devuelve una promesa con el mapa de appointments de este month indexados por [dia][hora]
	 */
	service.getMonthAppointmentsByDate = (month) => {
		var d = $q.defer();
		console.log("month: "+month);
        var startDate = moment(month,'YYYYMM' ).format('YYYYMMDD');
        var endDate = moment(month,'YYYYMM').add(1,'M').format('YYYYMMDD');

		// si ya tenemos los datos los devolvemos
		if(service._appointmentsMapByMonth[startDate]) {
			d.resolve(service._appointmentsMapByMonth[startDate]);
			return d.promise;
		}
		
		// en caso contrario vamos al servidor
		$http.get("api/appointments/" + startDate + "/"+ endDate)
			.success(function(response) {
				service._appointmentsMapByMonth[startDate] = response;
				d.resolve(service._appointmentsMapByMonth[startDate]);
			})
			.error(function(response) {
				d.reject({status: response.status, message: 'TODO'});
			});
		return d.promise;
	}
	
	/**
	 * Devuelve una promesa con el mapa de appointments de esta fecha indexados por [hora]
	 */
	service.getAppointmentsForDate = (date)  => {
		// fechas para calcular su posicion en el cache
		var month = moment(date).startOf('M');
		var monthKey = month.format('YYYYMMDD');
		var dateKey = moment(date).format('YYYYMMDD');
		
		var d = $q.defer();
				
		// si ya tenemos los datos los devolvemos
		if(service._appointmentsMapByMonth[monthKey]) {
			d.resolve(service._appointmentsMapByMonth[monthKey][dateKey]);
			return d.promise;
		}
		
		// en caso contrario llamamos a la carga de datos del mes
		service.getMonthAppointmentsByDate(month).then(
			function() {
				console.log("service._appointmentsMapByMonth[monthKey][dateKey]", service._appointmentsMapByMonth[monthKey][dateKey]);
				d.resolve(service._appointmentsMapByMonth[monthKey][dateKey]);
			},function(err) {
				d.reject(err)
			});
		return d.promise;
	}
	
	service.getAppointment = (id)  => {
		var d = $q.defer();
    	$http.get("/api/appointments/" + id)
    		.success( function(response) {
    			d.resolve(response);
	    	})
	    	.error(function(err) {
				d.reject(err)
			});
    	return d.promise;
	}
	
	service.saveAppointment = (appointment)  => {
		var d = $q.defer();

		var isNew = !appointment._id;
		var saveOrUpdate = isNew? $http.post : $http.put;
		var url = "/api/appointments" + (isNew? "" : "/" + appointment._id);
		saveOrUpdate(url, appointment)
			.success(function(appointment) {
				// guardamos el appointment en cache y lo devolvemos
				var dateTimeStart = moment(appointment.dateTimeStart);
				var monthKey = moment(dateTimeStart).startOf('M').format('YYYYMMDD');
				var dateKey = dateTimeStart.format('YYYYMMDD');;
				var timeKey = dateTimeStart.format('hh:mm');
				if(service._appointmentsMapByMonth[monthKey]) { // guardamos en cache si ya tenemos el mes en cache
					if(service._appointmentsMapByMonth[monthKey][dateKey] == undefined) {
						service._appointmentsMapByMonth[monthKey][dateKey] = {};
					}
					service._appointmentsMapByMonth[monthKey][dateKey][timeKey] = appointment;
				}
				
				d.resolve(appointment);
			})
			.error(function(err) {
				d.reject(err)
			});

		return d.promise;
	}
	
	/*
	service.updateAppointment = (appointment) => {
		
        var q = $q.defer();
        console.log("updating data.....",appointment);
        $http.put("api/appointments/" + appointment._id, appointment).success(
        		function (res) {
        	console.log("updating data.....");
            q.resolve(res);
            self._cache = {}; // Borrar cache para refrescar nuevos datos //
        });
        
       
        return q.promise;
    }
	*/
	service.deleteAppointment = (id)  => {
		var q = $q.defer();
		$http.delete('api/appointments/' + id, {params: {_id: id}})
	        .success(function (res) {
	            q.resolve(res);
	            self._cache = {};
	        }).error(function (err) {
	        q.reject(err);
        });
		return q.promise;
	}

	
	return service;
});