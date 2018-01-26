const google = require('google')
const stringSimilarity = require('string-similarity');
const urlTools = require('url');


function googlePromise(query) {
    return new Promise(
        (resolve, reject) => {
            google(query, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.links.slice(0, 3));
                }
            })

        })
}

module.exports = async (url) => {

    var thisIsABlendleUrl = false;
    var searchIndex = -1;
    var urlParts = url.split("/");

    _.each(urlParts, (part, index) => {
        if (part.indexOf('blendle.com') > -1) {
            searchIndex = index;
            thisIsABlendleUrl = true;
        }
    })

    if (thisIsABlendleUrl) {
        let publisher = urlParts[searchIndex + 2];
        let urlDescription = urlParts[searchIndex + 3];
        let query = publisher + ' ' + urlParts[searchIndex + 3];

        let searchWords = urlDescription.split('-');
        console.log('searchWords', searchWords)

        console.log('searchQuery', query)
        let firstGoogleHit = await googlePromise(query);
        // console.log(firstGoogleHit)

        var descriptionSimilarities = [];
        var domainSimilarities = [];
        var summedSimilarities = [];
        var searchWordSimilarities = [];
        var hostIsBlendle = [];

        _.each(firstGoogleHit, (hit) => {
            let descriptionSimilarity = stringSimilarity.findBestMatch(query, [hit.description, hit.title]);

            descriptionSimilarities.push(descriptionSimilarity)

            if (!hit.href) {
                return;
            }

            var hitUrl = urlTools.parse(hit.href);
            let domainSimilarity = stringSimilarity.findBestMatch(publisher, [hitUrl.host]);
            domainSimilarities.push(domainSimilarity);

            if (hitUrl.host.toLowerCase().indexOf('blendle') > -1) {
                hostIsBlendle.push(true);
            } else{
                hostIsBlendle.push(false);
            }

            var searchWordCounter = 0;
            _.each(searchWords, (searchWord)=>{
                if (hit.description.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
                    searchWordCounter++;
                }
            })
            
            searchWordSimilarities.push(searchWordCounter);
            
            if (descriptionSimilarity.bestMatch.rating > 0.5 && domainSimilarity.bestMatch.rating > 0 && searchWordCounter > 2) {
                summedSimilarities.push(descriptionSimilarity.bestMatch.rating * domainSimilarity.bestMatch.rating)
            } else {
                summedSimilarities.push(0);
            }


        })

        console.log('descriptionSimilarity',descriptionSimilarities);
        console.log('domainSimilairty', domainSimilarities);
        console.log('host&title Matches', summedSimilarities);
        console.log('searchWord Matches', searchWordSimilarities);
        console.log('url', url)

        var highestValue = 0;
        var highestIndex = -1;
        
        _.each(summedSimilarities, (value, index) => {
            if (value > highestValue) {
                highestValue = value; 
                highestIndex = index;
            }
        })

        _.each(descriptionSimilarities, (value, index) => {
            if (value.bestMatch.rating > 0.8) {
                highestValue = value.bestMatch.rating; 
                highestIndex = index;
            }
        })

        var highestSearchWordCount = 0;
        var highestSearchWordIndex = -1;
        _.each(searchWordSimilarities, (value, index) => {
            if (value > highestSearchWordCount && !hostIsBlendle[index] && domainSimilarities[index] > 0) {
                highestSearchWordCount = value; 
                highestSearchWordIndex = index;
            }
        })

        console.log('highest Non-blendle searchword-count', highestSearchWordCount)

        if (highestValue > 0) {
            return firstGoogleHit[highestIndex].href
        } else {
            console.log('no value above zero, so sending back original url ', url)
            return url;
        }

    } else {
        return url;
    }

}