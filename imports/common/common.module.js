import newsTiles from './news-tiles/news-tiles.module';
import articleMenu from './article-menu/article-menu';
import desktopViewer from './desktop-viewer/desktop-viewer';

export default 
angular.module('app.common', [
    
    newsTiles,
    articleMenu,
    desktopViewer,
    
]).name;