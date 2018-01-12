import { Meteor } from 'meteor/meteor';

export default class UsersApiService {

    constructor($filter) {
        'ngInject';

        this.$filter = $filter;
        Meteor.subscribe('allUsernames');

    }

    getUsername(userId) {
        var user = Meteor.users.findOne({_id:userId});
        return this.$filter('usernameFilter')(user);;
    }

}