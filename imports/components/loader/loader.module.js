import angular from 'angular';
import angularMeteor from 'angular-meteor';

import LoaderComponent from './loader.component';

export default
	angular.module('yourpers.loader', [
		angularMeteor
	]).component(
        'yourpersLoader', LoaderComponent
    ).name;