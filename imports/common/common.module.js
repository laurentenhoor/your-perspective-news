import headerMenu from './header-menu/header-menu';
import topics from './topics/topics.module';
import articleMenu from './article-menu/article-menu';
import desktopViewer from './desktop-viewer/desktop-viewer';

export default
    angular.module('app.common', [

        desktopViewer,
        headerMenu,
        topics,
        articleMenu,

    ]).name;