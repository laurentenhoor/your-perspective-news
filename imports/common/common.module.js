import headerMenu from './header-menu/header-menu';
import topics from './topics/topics.module';
import articleMenu from './article-menu/article-menu';
import desktopViewer from './desktop-viewer/desktop-viewer';
import firstUseToast from './first-use-toast/fist-use-toast.module';

export default
    angular.module('app.common', [

        desktopViewer,
        headerMenu,
        topics,
        articleMenu,
        firstUseToast,

    ]).name;