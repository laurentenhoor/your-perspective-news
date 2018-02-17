import angular from 'angular';
import angularMeteor from 'angular-meteor';

import DesktopViewerComponent from './desktop-viewer.component'
import DesktopViewerService from './desktop-viewer.service';

export default angular
    .module('desktopViewer', [])
    .component('desktopViewer', DesktopViewerComponent)
    .service('$desktopViewer', DesktopViewerService)
    .name;