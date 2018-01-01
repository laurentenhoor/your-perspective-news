import { Opinions } from '/imports/api/opinions';

export default class OpinionsApiService {

    constructor() {
        'ngInject';
    }

    getByTopicId(topicId) {
        
        let opinions = Opinions.find({
            topicId: topicId,
            draft: false
        }).fetch();
        
        console.log('Opinions', opinions);
        
        return opinions;
    }

}