var google = require('google')

function googlePromise(query) {
    return new Promise(
        (resolve, reject) => {
            google(query, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.links[0].href);
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
        let query = urlParts[searchIndex + 2] + ' ' + urlParts[searchIndex + 3];
        return await googlePromise(query);
    } else {
        return url;
    }

}