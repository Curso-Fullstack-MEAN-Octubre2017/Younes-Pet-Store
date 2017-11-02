angular.module('formCustomerDirective', [])
.directive('labelInputFormGroup',
        function() {
            return {
                restrict :'E',
                replace :true,
                 scope: {
                        model: '=',
                        idfor: '@',
                        type: '@',
                        label: '@',
                        size: '@'                  
                },
                template :'<div class="form-group row"> \
                            <label for="{{idfor}}" class="col-3 col-form-label"><strong>{{label}}</strong></label>\
                			<div class="col-9">\
                                <input type="text" ng-model="model" class="form-control">\
                           </div>'
            }
        }
)