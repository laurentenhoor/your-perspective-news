import angular from 'angular';

import MetadataService from './metadata.service';

import ImagePreloader from './image-preloader'

export default angular
    .module('MetadataFetcher', [ImagePreloader])
    .service('$metadata', MetadataService)
    .name;