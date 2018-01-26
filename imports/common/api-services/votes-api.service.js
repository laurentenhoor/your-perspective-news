import { Votes } from '/imports/api/votes';

export default class VotesApiService {

    constructor($auth, $votableItemsApi) {
        'ngInject';
		this.$auth = $auth;
		this.$votableItemsApi = $votableItemsApi;
    }

    voteById(id, voteValue) {
		
		if (!this.$auth.isLoggedIn()) {
            throw new Meteor.Error('not-logged-in', "Please login first");
            return;
		}
		// robustness for adjusting the javascript value
        voteValue > 0 ? voteValue = 1 : voteValue = -1
        
        console.log('vote for user', Meteor.userId())

		// check if a vote already exists for this user and article
        var vote = Votes.findOne({articleId : id, ownerId: Meteor.userId()});
        console.log(vote)
		
		if (!vote) {
			
			Votes.insert({
				ownerId: Meteor.userId(),
				value: voteValue,
				articleId : id
			},  (error, voteId)=> {
                if (error) {
                    console.error(error);
                }
                console.log('voted!', voteId)
            });
			this.$votableItemsApi.voteItem(id, voteValue)
			
		} else {
			
			if (vote.value != voteValue) {
				Votes.update(vote._id, {$set: {value: voteValue}});
				this.$votableItemsApi.voteItem(id, 2*voteValue)
			}
			
		}
		
	}

}