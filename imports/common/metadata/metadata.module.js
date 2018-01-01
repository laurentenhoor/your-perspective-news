import angular from 'angular';

import MetadataService from './metadata.service';

export default angular
    .module('MetadataFetcher', [])
    .service('$metadata', MetadataService)
    .name;