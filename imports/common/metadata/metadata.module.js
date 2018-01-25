import angular from 'angular';

import MetadataService from './metadata.service';

import ImagePreloader from './image-preloader.service'

export default angular
    .module('MetadataFetcher', [ImagePreloader])
    .service('$metadata', MetadataService)
    .name;