import SelectSource from './select-source/select-source.module'
import WriteOpinionDialog from './write-opinion-dialog/write-opinion-dialog.module';

export default angular
    .module('WriteOpinion', [
        SelectSource,
        WriteOpinionDialog
    ])
    .name;