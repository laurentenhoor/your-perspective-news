import DesktopViewer from './desktop-viewer/desktop-viewer';

import HeaderMenu from './header-menu/header-menu';
import Topics from './topics/topics.module';

import ArticleActionsButton from './article-actions-button/article-actions-button.module';
import ArticleActionsDialog from './article-actions-dialog/article-actions-dialog.module';

import FirstUseToast from './first-use-toast/fist-use-toast.module';
import FistUseDialog from './first-use-dialog/first-use-dialog.module';

export default angular
    .module('app.common', [
        DesktopViewer,
        
        HeaderMenu,

        Topics,

        ArticleActionsButton,
        ArticleActionsDialog,

        FirstUseToast,
        FistUseDialog,

    ])
    .name;