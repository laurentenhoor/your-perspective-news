Meteor.methods({

    getImage: (imageUrl) => {

        console.log('loading image via backend', imageUrl);

        var response = HTTP.call('GET', imageUrl, { npmRequestOptions: { encoding: null } })

        var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(response.content).toString('base64');

        // console.log('image data', response);

        return data;

    }

})