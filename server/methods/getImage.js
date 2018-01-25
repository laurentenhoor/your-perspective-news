Meteor.methods({

    getImage: (imageUrl) => {

        try {
            var response = HTTP.call('GET', imageUrl, { npmRequestOptions: { encoding: null } })
            var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(response.content).toString('base64');            
            return data;
        } catch(error) {
            // console.log(error)
            // throw new Meteor.Error(error);
        }
      
    }

})