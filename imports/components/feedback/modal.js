import angular from 'angular';
import angularMeteor from 'angular-meteor';

class ModalInstanceCtrl {
	
	constructor($scope, $uibModalInstance) {
		
		var $ctrl = this;

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.feedback);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
	
}


export default angular.module('allpers.modal', [
	angularMeteor,
]).controller('ModalInstanceCtrl', [
	'$scope', '$uibModalInstance', ModalInstanceCtrl]);