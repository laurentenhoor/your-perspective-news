import DaySelector from './day-selector/day-selector.module';
import HeaderMenu from './header-menu/header-menu.module';
import Topics from './topics/topics.module';
import WriteOpinion from './write-opinion/write-opinion.module';
import Metadata from './metadata/metadata.module'
import ApiServices from './api-services/api-services.module';
import UrlDebugger from './url-debugger/url-debugger.module';

export default angular
    .module('app.common', [
        DaySelector,
        HeaderMenu,
        Topics,
        WriteOpinion,
        Metadata,
        ApiServices,
        UrlDebugger,
    ])
    .name;