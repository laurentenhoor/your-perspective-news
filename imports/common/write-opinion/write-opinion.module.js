import SelectSource from './select-source/select-source.module'
import WriteOpinionDialog from './write-opinion-dialog/write-opinion-dialog.module';
import RichTextEditor  from './rich-text-editor/rich-text-editor.module';

export default angular
    .module('WriteOpinion', [
        SelectSource,
        WriteOpinionDialog,
        RichTextEditor,
    ])
    .name;