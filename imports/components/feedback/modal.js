export default angular.module('allpers.modal', [])
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

	var $ctrl = this;

	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.feedback);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});