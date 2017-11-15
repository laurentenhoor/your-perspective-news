import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./addArticleModal.less';

import angularBootstrap from 'angular-ui-bootstrap';


class AddArticleModalCtrl {
	
	constructor($scope, $reactive, $uibModalInstance, article) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.article = article;
		
		console.log('Modal data')
		console.log($ctrl.article.description)
		

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
]).controller('AddArticleModalCtrl', ['$scope', '$reactive', '$uibModalInstance','article', AddArticleModalCtrl])