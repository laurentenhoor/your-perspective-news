import { Opinions } from '/imports/api/opinions';

export default class OpinionsApiService {

    constructor() {
        'ngInject';
    }

    getAllByTopic(topic) {
        if (topic) {
            return this.getAllByTopicId(topic._id);
        }
        return null;
    }

    getAllByTopicId(topicId) {
        return Opinions.find({
            topicId: topicId,
            draft: false
        }).fetch();;
    }

    getUserOpinion(topicId) {
        return Opinions.findOne({
            topicId: topicId,
            ownerId: Meteor.userId(),
        });
    }

}