if (Meteor.isClient) {
    Meteor.subscribe('allUsernames');  
}

if (Meteor.isServer) {
    Meteor.publish('allUsernames', function () {
        return Meteor.users.find({}, {
            fields: {
                'profile.firstName': 1,
                'profile.lastName': 1
            }
        });
    });
}