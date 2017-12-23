import angular from 'angular';

import LoaderComponent from './loader.component';
import LoaderService from './loader.service';

export default angular
	.module('loaderModule', [])
	.component('loaderComponent', LoaderComponent)
	.service('loaderService', LoaderService
	).name;