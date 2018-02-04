import { Users } from '/imports/api/users'

import { Meteor } from 'meteor/meteor';

export default class UsersApiService {

    constructor($filter) {
        'ngInject';

        this.$filter = $filter;
    }

    getUsername(userId) {
        var user = Meteor.users.findOne({_id:userId});
        return this.$filter('usernameFilter')(user);;
    }

    getUser(userId) {
        return Meteor.users.findOne({_id:userId});
    }

}