import UrlDebuggerTemplate from './url-debugger.html'
import UrlDebuggerStyle from './url-debugger.styl';


class UrlDebuggerComponent {

    constructor($scope, $loader, $metadata, $http, $imagePreloader) {
        'ngInject';

        $ctrl = this;
        $loader.databaseInitialized();
        
        $ctrl.urls = [

            // Does load on local, but not in production
            'https://www.google.nl/amp/s/nos.nl/googleamp/artikel/129340-de-financiele-crisis-in-retroperspectief.html',
            
            // No image due to AMP! - MID PRORITY
            'https://www.nu.nl/brexit/5082617/harde-brexit-kost-britten-bijna-half-miljoen-banen.amp',

            // // Loads nothing at all - LOW PRIORITY
            'https://goo.gl/images/bzni4a',
            
            // // Low resolution logo - LOW PRIORITY
            'https://www.vpro.nl/programmas/tegenlicht/kijk/afleveringen/2013-2014/de-noodzaak-van-een-utopie.html',

            // Not always correct publisher name
            'https://nl.wikipedia.org/wiki/Koninklijke_Philips',
            'https://nl.m.wikipedia.org/wiki/Iraanse_Revolutie',


            // Passed the test!
            'http://www.knack.be/nieuws/wereld/europese-lidstaten-gaan-ook-strafregisters-van-niet-europeanen-uitwisselen/article-normal-955931.html',
            'https://nos.nl/video/2203014-wie-is-grace-mugabe.html',
            'https://www.youtube.com/watch?v=4XDWtU1Zojw',
            'http://www.dumpert.nl/mediabase/7341269/bce179d5/code_rood.html',
            'http://www.dumpert.nl/mediabase/7347615/0e8baec2/meiske_doet_schieten.html',
            'https://fd.nl/economie-politiek/1210447/overheidsbalans-lagere-gasbaten-maken-nederland-in-een-klap-60-miljard-euro-armer',
            'https://www.nytimes.com/2018/01/09/sports/alabama-national-championship.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=photo-spot-region&region=top-news&WT.nav=top-news',
            'https://www.google.nl/amp/s/www.volkskrant.nl/binnenland/uitspraak-college-politie-discrimineert-met-verbod-op-hoofddoek-in-niet-publieke-functie~a4540290/amp',
            'https://www.ad.nl/buitenland/triomf-for-trump-belastingplan-is-erdoor~a8bd0881/',
            'https://dekanttekening.nl/samenleving/poolse-nederlanders-vinden-polen-niet-xenofobisch/',
            'http://www.economist.com/blogs/dailychart/2010/11/cartography?fsrc=scn/fb/te/pe/ed/truesizeafrica',
            'https://www.businessinsider.nl/tesla-heeft-een-nieuwe-versie-van-zijn-roadster-sportwagen-gepresenteerd-en-het-echt-een-game-changer/',
            'https://blendle.com/i/de-standaard/me-too-in-nederland/bnl-destandaard-20180108-eee62560_f250_11e7_bfa5_c2ed917c3dd8?sharer=eyJ2ZXJzaW9uIjoiMSIsInVpZCI6ImJhcnRkaW5namFuIiwiaXRlbV9pZCI6ImJubC1kZXN0YW5kYWFyZC0yMDE4MDEwOC1lZWU2MjU2MF9mMjUwXzExZTdfYmZhNV9jMmVkOTE3YzNkZDgifQ%3D%3D',
            'https://www.economist.com/blogs/graphicdetail/2017/05/daily-chart-22',
            'https://fd.nl/economie-politiek/1092391/alcohol-en-tabak-zijn-winstmachines-maar-hoe-lang-nog',
            'https://www.volkskrant.nl/opinie/hetzelfde-ritueel-zal-zich-na-elke-beving-herhalen-tot-het-gas-echt-op-is~a4555873/',
            'https://www.bnr.nl/podcast/bernard-hammelburg/10336697/opstand-in-iran',
            'https://fd.nl/beurs/1235376/aanpak-corruptie-is-het-grote-thema-in-latijns-amerika'
           
        ]

        console.log('init UrlDebuggerComponent')
        $ctrl.url = $ctrl.urls[0];
        // $ctrl.urls =  [$ctrl.url]; 
        
        $ctrl.articles = [];
        
        _.each($ctrl.urls, (url)=>{
            Meteor.call('metascraper', url, (error, article) => {
                if (error){
                    console.error(error);
                }
                $scope.$apply(() => {
                    $ctrl.articles.push(article)
                })
                
            })
        });

        $ctrl.setBackgroundImage = function(imagepath, article){
            // console.log('setBackgroundImage', article)
            $imagePreloader.preloadImages([imagepath])
            .then(
                function handleResolve( imageLocations ) {
                    // console.log( "Preload Successful" );
                },
                function handleReject( imageLocation ) {
                    console.log('rejected image', imageLocation)
                    Meteor.call('getImage', imageLocation, (error, imageBase64) => {
                        if (error) {
                            console.error(error)
                        }
                        article.imageUrl = imageBase64;
                    })
                }
            );
        }

        $ctrl.compileBackgroundStyle = function(imagepath){
            return {
                'background-image':'url(' + imagepath + ')'
            }
        }
        

        $ctrl.processUrl = function () {

            if (!$ctrl.url) {
                return;
            }
    
            Meteor.call('metascraper', $ctrl.url, (error, article) => {
                $ctrl.output1 = article;
            })

            $http.get("https://opengraph.io/api/1.1/site/" +
                $ctrl.url + "?app_id=5a54ba1ab3c5afd665690b3a&full_render=true")
                .then(function (response) {
                    $ctrl.output2 = response;
                });

        }

        $ctrl.processUrl();

    }

}

export default {
    templateUrl: UrlDebuggerTemplate,
    controller: UrlDebuggerComponent,
    bindings: {
    },
}