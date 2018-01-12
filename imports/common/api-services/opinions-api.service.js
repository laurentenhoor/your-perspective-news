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
            // draft: false
        }).fetch();
        
        // console.log('Opinions', topicId, opinions);
        
        return opinions;
    }

    userOpinionAvailable(topicId) {
        let opinions = Opinions.find({
            topicId: topicId,
            ownerId: Meteor.userId(),
            draft: false,
        }).fetch();
        if (opinions && opinions.length > 0) {
            return true;
        } 
        return false;
    }

}