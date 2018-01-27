import { Comments } from '/imports/api/comments';
import { Articles } from '/imports/api/articles';
import { Opinions } from '/imports/api/opinions';

export default class VotableItemsApi {

    constructor($articlesApi) {
        'ngInject';
        this.$articlesApi = $articlesApi;
    }

    getVotableItem(itemId) {
        return Opinions.findOne({ _id: itemId }) ||
            Comments.findOne({ _id: itemId }) ||
            Articles.findOne({ _id: itemId })
    }

    getVotableItemScore(itemId) {
        var item = this.getVotableItem(itemId)
        if (item && item.stats && item.stats.score) {
            return item.stats.score;
        } else if (item && item.score) {
            return item.score;
        }
        return null;
    }

    voteItem(itemId, voteValue) {

        Comments.update(itemId, { $inc: { score: voteValue } });
        Opinions.update(itemId, { $inc: { score: voteValue } });
        this.$articlesApi.vote(itemId, voteValue);

    }
}