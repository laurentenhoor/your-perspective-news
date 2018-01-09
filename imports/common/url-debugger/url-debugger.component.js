import UrlDebuggerTemplate from './url-debugger.html'
import UrlDebuggerStyle from './url-debugger.styl';

class UrlDebuggerComponent {

    constructor($loader, $metadata) {
        'ngInject';

        $ctrl = this;
        $loader.databaseInitialized();


        $ctrl.processUrl = function () {
            $metadata.getRawArticleFromUrl($ctrl.url, (error, article) => {
                console.log(article)
                $ctrl.output = article;
            })

            Meteor.call('getTestMetadata', $ctrl.url, (error, result) => {

                if (error) {
                    console.error(error);
                    self.$loader.stop();
                    return callback(error, null);
                }
                self.$loader.stop();
                console.log(result)
                $ctrl.output3 = result;
    
            });
    
        }

        $ctrl.url = 'https://fd.nl/economie-politiek/1210447/overheidsbalans-lagere-gasbaten-maken-nederland-in-een-klap-60-miljard-euro-armer';
        // $ctrl.url = 'https://www.nytimes.com/2018/01/09/sports/alabama-national-championship.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=photo-spot-region&region=top-news&WT.nav=top-news';

        $ctrl.processUrl();

    }

}

export default {
    templateUrl: UrlDebuggerTemplate,
    controller: UrlDebuggerComponent,
    bindings: {

    },
}