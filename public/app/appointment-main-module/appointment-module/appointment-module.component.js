'use strict';
angular.module('appointmentsList', []);
angular.module('appointmentsList').
	component('appointmentsList', 
			{templateUrl:'/app/appointment-main-module/appointment-module/appointment-module.html',
        controller: function($scope, $http, $routeParams,$location, appointmentsService) {
            console.log("Incializando appointments list", $routeParams);
            var monthParam = $routeParams.month;
            
            
            var currentMonth = moment().startOf('M').format("YYYYMMDD");
            
            if(monthParam){
            	 currentMonth=monthParam;
            }
            	
            $scope.currentMonth= moment(currentMonth, "YYYY MM DD").format("MMMM YYYY");
            
            var nextmonth = moment(currentMonth, 'YYYYMM').add(1, 'month').format('YYYYMM');
            /***************************************************/
            var date = moment().startOf('month');
            $scope.month = moment(date).startOf('month').format('MMMM').toUpperCase();
            $scope.year = moment(date).startOf('month').format('YYYY');
            /********************************************************************/
          //PETICION HTTP A LA API
            //$http.get('api/appointments/' + currentMonth + '/' + nextmonth).then(function (res) {
                //$scope.appointments = res.data;
                
                ///console.log('API GET RESULT \n' + $scope.appointments);
            appointmentsService.getMonthAppointmentsByDate(currentMonth).then(function(res){
                $scope.appointments = res;
                console.log('API GET RESULT '+ res);
                console.log(res);
                
                

                //SCOPE CON MES SIGUIENTE Y MES ANTERIOR AL ACTUAL
                currentMonth = moment(currentMonth, 'YYYYMM');
                $scope.nextmonth = moment(currentMonth).add(1, 'month').format('YYYYMM');
                $scope.lastmonth = moment(currentMonth).subtract(1, 'month').format('YYYYMM');
                
                /************************
                 *  PINTAR CALENDARIO   *
                 ************************/

                
                //PINTAR DIAS DE LAS SEMANA EN IDIOMA LOCAL
                $scope.weeksday = [];
                for (var i = 1; i <= 7; i++) {
                    $scope.weeksday.push(moment().isoWeekday(i).format('dddd').toUpperCase());
                }
                
              //PINTAR DIAS DEL MES EN EL CALENDARIO
                $scope.weeks = [];
                var day = [];
                var currDate = moment(currentMonth).startOf('month');
                var endMonth = moment(currentMonth).endOf('month');
                
                while (currDate < endMonth) {

                    for (var i = 1; i <= 7; i++) {

                        if (moment(currDate).isoWeekday() == i && currDate < endMonth) {

                            if ($scope.appointments[moment(currDate).format('YYYY-MM-DD')]) {
                                var appointmentsofday = {
                                    day: currDate.toDate(),
                                    appointments: Object.keys($scope.appointments[moment(currDate).format('YYYY-MM-DD')]).length
                                }

                            } else {
                                var appointmentsofday = {day: currDate.toDate(), appointments: 0}
                            }
                            day.push(appointmentsofday);
                            currDate = moment(currDate).add(1, 'days');
                        } else {
                            day.push('');
                        }
                    }
                    $scope.weeks.push(day);
                    
                    day = [];
                }
            });
        }
    });