import DebateTileTemplate from './debate-tile.html';
import DebateTileStyle from './debate-tile.styl';

class DebateTileComponent {
    constructor($scope, $reactive, $questionsApi, $usersApi, $auth, $timeout, $shareDialog) {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.newQuestion = '';

        $ctrl.topicId = null;

        const initQuestions = () => {
            let questions = $questionsApi.getAllByTopic($ctrl.topic);

            _.each(questions, (question, i) => {
                addAnswersToQuestion(questions[i])
            });

            $ctrl.questions = questions;
            console.log('initQuestions', $ctrl.questions)
        }

        const addAnswersToQuestion = (question) => {
            let answers = $ctrl.answers(question._id);
            question.answers = answers;
            question.calculatedScoreSum = _.sum(_.map(answers, 'stats.score'));
        }

        $ctrl.$onChanges = (changes) => {
            if (changes.topic && $ctrl.topic) {
                initQuestions();
            }
        }

        $ctrl.helpers({
            userId: () => {
                return Meteor.userId()
            }
        })

        $ctrl.saveEditedItem = (editItem, editField) => {
            if (!editField || editField == '') {
                return;
            }
            if (editItem.question) {
                editItem.question = editField;
            } else if (editItem.answer) {
                editItem.answer = editField;
            }
            $questionsApi.updateItem(editItem)
        }

        $ctrl.deleteById = (questionId) => {
            $questionsApi.deleteById(questionId);
            initQuestions();
        }

        $ctrl.saveQuestion = () => {
            if (!$ctrl.newQuestion || $ctrl.newQuestion == "") {
                console.warn('No question input')
                return;
            }
            $questionsApi.saveQuestion($ctrl.topic, $ctrl.newQuestion, (error) => {
                if (error) {
                    console.error(error);
                }
                initQuestions();
                $ctrl.newQuestion = '';
            });
        }

        $ctrl.user = (userId) => {
            return $usersApi.getUser(userId);
        }

        $ctrl.saveAnswer = (question, answer) => {
            if (!answer || answer == '') {
                console.warn('No answer input')
                return;
            }
            $questionsApi.saveAnswer(question, answer, (error) => {
                $timeout(() => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    addAnswersToQuestion(question);
                    question.editField = '';
                    question.answer = '';
                    question.showAllAnswers = true;
                })

            });
        }

        $ctrl.findExpert = ($event) => {
            $shareDialog.show($event, $ctrl.topic._id);
        }

        $ctrl.answers = (questionId) => {
            let answers = $questionsApi.getAnswers(questionId);
            return answers;
        }
    }
}

export default {
    templateUrl: DebateTileTemplate,
    controller: DebateTileComponent,
    bindings: {
        topic: '<'
    }
}