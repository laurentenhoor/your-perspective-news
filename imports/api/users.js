import SlackAPI from 'node-slack';

if (Meteor.isClient) {
    Meteor.subscribe('allUsernames');
}

if (Meteor.isServer) {

    Slack = new SlackAPI('https://hooks.slack.com/services/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');

    Accounts.onCreateUser((options, user) => {

        let amountOfUsers = Meteor.users.find({}).count() + 1;

        let newUser = Object.assign({}, user, options);

        if (Meteor.isProduction && newUser && newUser.profile && newUser.profile.firstName) {
            let firstName = newUser.profile.firstName;
            let lastName = newUser.profile.lastName;
            let email = newUser.profile.emailAddress;
            let profileImage = newUser.profile.pictureUrl;

            Slack.send({
                username: firstName + ' ' + lastName,
                text: 'Ik heb me zojuist geregistreerd! Jullie hebben nu ' + amountOfUsers + ' leden.',
                icon_url: profileImage
            });
        }

        return newUser;

    })

    Accounts.onLogin((data) => {
        if (data && data.user && data.user.services && data.user.services.linkedin) {
            latestProfile = data.user.services.linkedin;
            Meteor.users.update(data.user._id, {
                $set : {
                    'profile.headline' : latestProfile.headline,
                    'profile.pictureUrl' : latestProfile.pictureUrl,
                    'profile.firstName' : latestProfile.firstName,
                    'profile.lastName' : latestProfile.lastName,
                }
            })
        }

    })

    Meteor.publish('allUsernames', function () {
        return Meteor.users.find({}, {
            fields: {
                'profile.firstName': 1,
                'profile.lastName': 1,
                'profile.headline' : 1,
                'profile.pictureUrl' : 1,
                'anonymous' : 1,
            }
        });
    });
}