import angular from 'angular';
import angularMeteor from 'angular-meteor';

import MetadataService from './metadata.service';

export default angular
    .module('metadataFetcher', [angularMeteor])
    .service('$metadata', MetadataService)
    .name;