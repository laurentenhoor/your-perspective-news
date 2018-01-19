import UrlDebuggerTemplate from './url-debugger.html'
import UrlDebuggerStyle from './url-debugger.styl';

class UrlDebuggerComponent {

    constructor($loader, $metadata, $http) {
        'ngInject';

        // ngMeta.setMetaTags({
        //     title: 'Open Graph voor Jouwpers',
        //     name : [
        //       {property: 'og:title', content: 'Open Graph voor Jouwpers'},
        //       {property: 'og:image', content: 'http://beta.jouwpers.nl/i/jouwpers%20debug%20open%20graph.png'}
        //     ]
        //   });


        $ctrl = this;
        $loader.databaseInitialized();

        $ctrl.processUrl = function () {

            if (!$ctrl.url) {
                return;
            }

            $metadata.getRawArticleFromUrl($ctrl.url, (error, article) => {
                if (error) {
                    return console.error(error);
                }
                console.log(article)
                $ctrl.output = article;
            })

            Meteor.call('getTestMetadata', $ctrl.url, (error, result) => {

                if (error) {
                    self.$loader.stop();
                    return console.error(error);
                }
                self.$loader.stop();
                console.log(result)
                $ctrl.output3 = result;

            });

            extractMeta($ctrl.url, function (err, res) {
                console.log(res);
                $ctrl.output2 = res;
            });

            $http.get("https://opengraph.io/api/1.1/site/" +
                $ctrl.url + "?app_id=5a54ba1ab3c5afd665690b3a&full_render=true")
                .then(function (response) {
                    $ctrl.output1 = response;
                });

        }

        // $ctrl.url = 'https://fd.nl/economie-politiek/1210447/overheidsbalans-lagere-gasbaten-maken-nederland-in-een-klap-60-miljard-euro-armer';
        // $ctrl.url = 'https://www.nytimes.com/2018/01/09/sports/alabama-national-championship.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=photo-spot-region&region=top-news&WT.nav=top-news';
        // $ctrl.url = 'https://www.google.nl/amp/s/www.volkskrant.nl/binnenland/uitspraak-college-politie-discrimineert-met-verbod-op-hoofddoek-in-niet-publieke-functie~a4540290/amp';
        // $ctrl.url = 'https://www.ad.nl/buitenland/triomf-for-trump-belastingplan-is-erdoor~a8bd0881/';
        // $ctrl.url = 'https://dekanttekening.nl/samenleving/poolse-nederlanders-vinden-polen-niet-xenofobisch/'
        // $ctrl.url = 'http://www.economist.com/blogs/dailychart/2010/11/cartography?fsrc=scn/fb/te/pe/ed/truesizeafrica';
        $ctrl.url = 'http://localhost:3000/'

        $ctrl.processUrl();

    }

}

export default {
    templateUrl: UrlDebuggerTemplate,
    controller: UrlDebuggerComponent,
    bindings: {

    },
}