import angular from 'angular';
import angularMeteor from 'angular-meteor';

var name = "httpPrefix";

export default angular
    .module(name, [
        angularMeteor
    ])
    .directive('httpPrefix', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {

                function ensureHttpPrefix(value) {                    

                    // Google amp to regular string: not very robust!! To be improved!!
                    if (value && value.indexOf('google') > 0 && value.indexOf('amp') > 0) {
                        value = value.replace('https://www.google.nl/amp/s/', '')
                        value = value.replace('https://www.google.com/amp/s/', '')
                        value = value.replace('/amp', '')
                        console.warn('please improve the google amp compatibility!')
                    }
                    // console.log('ensure httpPrefix')

                    // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                    if (value && !/^(https?):\/\//i.test(value)
                        && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0) {
                        controller.$setViewValue('http://' + value);
                        controller.$render();

                        return 'http://' + value;
                    }
                    else
                        return value;
                }
                controller.$formatters.push(ensureHttpPrefix);
                controller.$parsers.splice(0, 0, ensureHttpPrefix);
            }
        }
    })
    .name;