import TopicTemplate from './topic.html';
import TopicStyle from './topic.styl';

class TopicComponent {
    constructor($reactive, $scope, $topicsApi, $articlesApi, $timeout, $articleActionsDialog, $auth) {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.amountOfRootArticles = 3;
        $ctrl.amountOfOtherArticles = 3;

        $ctrl.helpers({
            isAdmin:()=>{
                return $auth.isAdmin();
            }
        })

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                getArticles($ctrl.topic);
            }
        }

    
        const getArticles = (topic) => {
            $ctrl.allRootArticles = $articlesApi.getRootArticles(topic)
            $ctrl.rootArticles = _.slice($ctrl.allRootArticles, 0, $ctrl.amountOfRootArticles)
            
            $ctrl.allOtherArticles = $articlesApi.getOtherArticles(topic)
            $ctrl.otherArticles = _.slice($ctrl.allOtherArticles, 0, $ctrl.amountOfOtherArticles)
        }

        $topicsApi.setCallbacks({
            addedArticle: (articleId) => {
                console.log("articleAdded", articleId)
                if ($ctrl.topic) {
                    $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                    Meteor.subscribe('articles', [$ctrl.topic], {
                        onReady: () => {
                            $timeout(() => {
                                getArticles($ctrl.topic)
                            })   
                        }
                    })
                }
            },
            removedArticle: () => {
                console.log('REMOVED ARTICLE', $ctrl.topic)
                if ($ctrl.topic) {
                    $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                    getArticles($ctrl.topic)
                }
            }
        })

        
        $ctrl.moreRootArticlesAvailable = () => {
            return ($ctrl.allRootArticles.length != $ctrl.rootArticles.length)
        }

        var loadMoreDepthRoot = 0;
        var loadMoreDepthOther = 0;

        $ctrl.showMoreRootArticles = () => {
            $ctrl.amountOfRootArticles = $ctrl.amountOfRootArticles + 2;
            
            $ctrl.rootArticles = _.slice($ctrl.allRootArticles, 0, $ctrl.amountOfRootArticles)
            ga('send', {
                hitType: 'event',
                eventCategory: 'Read',
                eventAction: "Load more 'Nieuws'",
                eventLabel: '/topic/'+ $ctrl.topic._id,
                eventValue: ++loadMoreDepthRoot
            })
        }

        $ctrl.moreOtherArticlesAvailable = () => {
            return ($ctrl.allOtherArticles.length != $ctrl.otherArticles.length)
        }

        $ctrl.showMoreOtherArticles = () => {
            $ctrl.amountOfOtherArticles = $ctrl.amountOfOtherArticles+2;

            $ctrl.otherArticles = _.slice($ctrl.allOtherArticles, 0, $ctrl.amountOfOtherArticles)
            ga('send', {
                hitType: 'event',
                eventCategory: 'Read',
                eventAction: "Load more 'Verrijking'",
                eventLabel: '/topic/'+ $ctrl.topic._id,
                eventValue: ++loadMoreDepthOther
            })
        }

        $ctrl.addArticle = ($event) => {
            if (!$auth.isLoggedIn()) {
				return;
			}
            $articleActionsDialog.show(
				$event,
				$ctrl.topic._id
			)
        }

    }

}

export default {
    templateUrl: TopicTemplate,
    controller: TopicComponent,
    bindings: {
        topic: '<',
        openTopicId: '<',
        onOpenTopic: '&'
    }
}