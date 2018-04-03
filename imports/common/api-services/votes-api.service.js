import { Votes } from '/imports/api/votes';

export default class VotesApiService {

    constructor($auth, $votableItemsApi) {
        'ngInject';
		this.$auth = $auth;
		this.$votableItemsApi = $votableItemsApi;
    }

    voteById(topicId, itemId, voteValue) {
		
		if (!this.$auth.isLoggedIn()) {
            throw new Meteor.Error('not-logged-in', "Please login first");
            return;
		}
		// robustness for adjusting the javascript value
        voteValue > 0 ? voteValue = 1 : voteValue = -1
    
		// check if a vote already exists for this user and article
        var vote = Votes.findOne({articleId : itemId, ownerId: Meteor.userId()});
		
		if (!vote) {
			
			Votes.insert({
				ownerId: Meteor.userId(),
				value: voteValue,
				articleId : itemId
			},  (error, voteId)=> {
                if (error) {
                    console.error(error);
                }
                console.log('voted!', voteId)
            });
			this.$votableItemsApi.voteItem(topicId, itemId, voteValue)
			
		} else {
			if (vote.value != voteValue || this.$auth.isAdmin()) {
				Votes.update(vote._id, {$set: {value: voteValue}});
				this.$votableItemsApi.voteItem(topicId, itemId, 2*voteValue)
			} 
		}
		
	}

}