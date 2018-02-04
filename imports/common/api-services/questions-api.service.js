import { Questions } from '/imports/api/questions';

export default class QuestionsApiService {

    constructor($auth) {
        'ngInject';
        this.$auth = $auth;
    }

    getAllByTopic(topic) {
        if (topic) {
            return this.getAllByTopicId(topic._id);
        }
        return null;
    }

    getAllByTopicId(topicId) {
        return Questions.find({parentId:topicId}).fetch();
    }

    saveQuestion(topic, questionContent, callback){
        if (!this.$auth.isLoggedIn()) {
            return;
        }
        
        var questionDoc = {
            topicId: topic._id,
            parentId: topic._id,
            ownerId: Meteor.userId(),
            question: questionContent
        }

        Questions.insert(questionDoc, (error, id) => {
            callback(error)
            if (error) {
                console.error(error)
            }
            console.log('Successfully inserted question', questionDoc, 'the id is', id)
        })
    }

    deleteById(questionId) {
        Questions.remove({_id:questionId}, (error) => {
            if (error) {
                console.error(error)
            }
            console.log('Successfully removed question', questionId)
        })
    }

    saveAnswer(question, answerContent, callback) {
        var answerDoc = {
            questionId : question._id,
            parentId : question._id,
            ownerId: Meteor.userId(),
            answer: answerContent,
            topicId: question.topicId
        }
        Questions.insert(answerDoc, (error, id)=> {
            callback(error);
            if (error) {
                console.error(error)
            }
            console.log('Successfully inserted an answer', answerDoc, 'the id is', id)
        });
    }

    getAnswers(questionId) {
        let answers = Questions.find({parentId: questionId}).fetch();
        console.log('getAnswers', answers)
        return answers;
    }
    
}