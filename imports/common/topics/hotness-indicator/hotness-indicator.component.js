import HotnessIndicatorTemplate from './hotness-indicator.html'
import HotnessIndicatorStyle from './hotness-indicator.styl'

class HotnessIndicatorComponent {

    constructor($scope, $reactive, $articlesApi, $topicsApi) {
        'ngInject';

        const $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = (changes) => {
            if (changes.itemId) {
                $ctrl.itemId = angular.copy($ctrl.itemId)
            }
        }

        $ctrl.helpers({
            hotness : () => {
                return $articlesApi.getHotness($ctrl.getReactively('itemId')) ||    
                    $topicsApi.getHotness($ctrl.getReactively('itemId'));;
            }
        })

    }

}

export default {
    controller: HotnessIndicatorComponent,
    templateUrl: HotnessIndicatorTemplate,
    bindings : {
        itemId : '<'
    }
}