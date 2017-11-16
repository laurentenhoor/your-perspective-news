import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./addArticleModal.less';

import angularBootstrap from 'angular-ui-bootstrap';


class AddArticleModalCtrl {
	
	constructor($scope, $reactive, $uibModalInstance, articleData) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.articleData = articleData;
		
		
		if (!$ctrl.articleData) {
			
			$ctrl.headerText = 'Maak een nieuw(s) item.';
			$ctrl.headerSubText = 'Plak een url naar een artikel.';		
			
		} else if ('category' in $ctrl.articleData) {
			
			$ctrl.headerText = 'Voeg een perspectief toe.';
			$ctrl.headerSubText = 'Plak een url naar een artikel.';
			
		} 
		
		console.log('Modal data')
		console.log($ctrl.articleData)
		

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.feedback);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
		
	}
	
}


export default angular.module('yourpers.addArticleModalCtrl', [
	angularMeteor,
	angularBootstrap
]).controller('AddArticleModalCtrl', ['$scope', '$reactive', '$uibModalInstance','articleData', AddArticleModalCtrl])