import { Articles } from '/imports/api/articles';
import { Questions } from '/imports/api/questions';

export default class VotableItemsApi {

    constructor($articlesApi, $questionsApi) {
        'ngInject';
        this.$articlesApi = $articlesApi;
        this.$questionsApi = $questionsApi;
    }

    getVotableItem(itemId) {
        return Articles.findOne({ _id: itemId }) ||
            Questions.findOne({ _id: itemId })
    }

    getVotableItemScore(itemId) {
        var item = this.getVotableItem(itemId)
        if (item && item.stats && item.stats.score) {
            return item.stats.score;
        } else if (item && item.score) {
            return item.score;
        }
        return 0;
    }

    voteItem(topicId, itemId, voteValue) {
        this.$questionsApi.vote(topicId, itemId, voteValue);
        this.$articlesApi.vote(topicId, itemId, voteValue);
    }
}