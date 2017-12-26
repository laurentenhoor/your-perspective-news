import angular from 'angular';

import MetadataService from './metadata.service';

export default angular
    .module('metadataFetcher', [])
    .service('$metadata', MetadataService)
    .name;