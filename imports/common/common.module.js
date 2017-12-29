import HeaderMenu from './header-menu/header-menu';
import Topics from './topics/topics.module';
import ArticleMenu from './article-menu/article-menu';
import DesktopViewer from './desktop-viewer/desktop-viewer';
import FirstUseToast from './first-use-toast/fist-use-toast.module';
import FistUseDialog from './first-use-dialog/first-use-dialog.module';

export default angular
    .module('app.common', [
        DesktopViewer,
        HeaderMenu,
        Topics,
        ArticleMenu,
        FirstUseToast,
        FistUseDialog,
    ])
    .name;