import { Comments } from '/imports/api/comments';
import { Articles } from '/imports/api/articles';
import { Opinions } from '/imports/api/opinions';
import { Questions } from '/imports/api/questions';

export default class VotableItemsApi {

    constructor($articlesApi) {
        'ngInject';
        this.$articlesApi = $articlesApi;
    }

    getVotableItem(itemId) {
        return Opinions.findOne({ _id: itemId }) ||
            Comments.findOne({ _id: itemId }) ||
            Articles.findOne({ _id: itemId }) ||
            Questions.findOne({ _id: itemId })
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

    voteItem(topicId, itemId, voteValue) {
        Comments.update(itemId, { $inc: { score: voteValue } });
        Opinions.update(itemId, { $inc: { score: voteValue } });
        Questions.update(itemId, { $inc: { score: voteValue } });
        this.$articlesApi.vote(topicId, itemId, voteValue);
    }
}