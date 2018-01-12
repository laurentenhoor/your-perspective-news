import OpinionControlsTemplate from './opinion-controls.html';
import OpinionControlsStyle from './opinion-controls.styl';

class OpinionControlsComponent {

    constructor($scope, $reactive, $usersApi) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = (changes) => {
            if (changes.opinion) {
                $ctrl.opinion = angular.copy($ctrl.opinion);
            }
        }
        $ctrl.getUsername = function(userId) {
            return $usersApi.getUsername(userId);
        }

    }

}

export default {
    templateUrl: OpinionControlsTemplate,
    controller : OpinionControlsComponent,
    bindings : {
        opinion : '<'
    }
}