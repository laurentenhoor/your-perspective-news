import { Opinions } from '/imports/api/opinions';

export default class OpinionsApiService {

    constructor() {
        'ngInject';
    }

    getAllByTopic(topic) {
        return this.getAllByTopicId(topic._id);
    }

    getAllByTopicId(topicId) {

        let opinions = Opinions.find({
            topicId: topicId,
            draft: false
        }).fetch();

        // console.log('Opinions', topicId, opinions);
        return opinions;
    }

    getUserOpinion(topicId) {
        return Opinions.findOne({
            topicId: topicId,
            ownerId: Meteor.userId(),
        });
    }

}