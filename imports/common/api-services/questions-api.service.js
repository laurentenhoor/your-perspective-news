import { Questions } from '/imports/api/questions';

export default class QuestionsApiService {

    constructor($auth) {
        'ngInject';
        this.$auth = $auth;
    }

    getById(questionId) {
        return Questions.findOne({_id: questionId});
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

    vote(topicId, itemId, voteValue) {
        Questions.update(itemId, { $inc: { 'stats.score' : voteValue } }, (error, docCount) => {
            if (docCount > 0) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Vote',
                    eventAction: 'Answer',
                    eventLabel: '/answer/'+itemId,
                    eventValue: voteValue
                })    
            }
        });
        
    }

    updateItem(updatedItem) {
        console.log(updatedItem)
        return Questions.update(updatedItem._id, {
            $set : {
                answer: updatedItem.answer,
                question: updatedItem.question,
            }
        }, (error)=> {
            if (error) {
                console.error(error);
            }
            ga('send', {
                hitType: 'event',
                eventCategory: 'Edit',
                eventAction: (updatedItem.answer ? 'Edit Answer' : 'Edit Question'),
                eventLabel: (updatedItem.answer ? '/answer/' + updatedItem.answer._id :  '/question/' + updatedItem.question._id)
            })
        })
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
            ga('send', {
                hitType: 'event',
                eventCategory: 'Post',
                eventAction: 'New question',
                eventLabel: '/question/' + id
            })
            console.log('Successfully inserted question', questionDoc, 'the id is', id)
        })
    }

    deleteById(questionId) {
        if (!this.$auth.isLoggedIn()) {
            return;
        }
        
        Questions.remove({_id:questionId}, (error) => {
            if (error) {
                console.error(error)
            }
            ga('send', {
                hitType: 'event',
                eventCategory: 'Edit',
                eventAction: 'Delete question or answer',
                eventLabel: questionId
            })
            console.log('Successfully removed question', questionId)
        })
    }

    saveAnswer(question, answerContent, callback) {
        if (!this.$auth.isLoggedIn()) {
            return;
        }
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
            ga('send', {
                hitType: 'event',
                eventCategory: 'Post',
                eventAction: 'New answer',
                eventLabel: '/answer/' + id
            })
            console.log('Successfully inserted an answer', answerDoc, 'the id is', id)
        });
    }

    getAnswers(questionId) {
        let answers = Questions.find({parentId: questionId}, { sort: { 'stats.score':  -1 } }).fetch();
        return answers;
    }
    
}