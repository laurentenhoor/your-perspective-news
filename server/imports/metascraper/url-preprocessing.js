var google = require('google')

module.exports = async (url) => {

    var urlParts = url.split("/");
    var searchIndex = -1;
    _.each(urlParts, (part, index) => {
        if (part.indexOf('blendle.com') > -1) {
            searchIndex = index;
        }
    })

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

    if (searchIndex > -1) {

        let query = urlParts[searchIndex + 2] + ' ' + urlParts[searchIndex + 3];
        console.log('search query', query);

        return await googlePromise(query);

    } else {
        return url;
    }

}