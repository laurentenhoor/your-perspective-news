import HeaderMenu from './header-menu/header-menu.module';
import ArticleActions from './article-actions/article-actions.module';
import Topics from './topics/topics.module';
import WriteOpinion from './write-opinion/write-opinion.module';
import Metadata from './metadata/metadata.module'

export default angular
    .module('app.common', [
        HeaderMenu,
        ArticleActions,
        Topics,
        WriteOpinion,
        Metadata,
    ])
    .name;