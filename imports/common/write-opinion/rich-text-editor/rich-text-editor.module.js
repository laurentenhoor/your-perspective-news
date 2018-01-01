import angular from 'angular';

import RichTextEditorComponent from './rich-text-editor.component';

export default angular
    .module('RichTextEditor', [])
    .component('richTextEditor', RichTextEditorComponent)
    .name;