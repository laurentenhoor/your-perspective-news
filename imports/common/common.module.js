import About from './about/about.module';
import DesktopViewer from './desktop-viewer/desktop-viewer';

import HeaderMenu from './header-menu/header-menu';
import Topics from './topics/topics.module';

import ArticleActionsButton from './article-actions-button/article-actions-button.module';
import ArticleActionsDialog from './article-actions-dialog/article-actions-dialog.module';


export default angular
    .module('app.common', [
        About,
        DesktopViewer,
        HeaderMenu,
        Topics,
        ArticleActionsButton,
        ArticleActionsDialog,
    ])
    .name;