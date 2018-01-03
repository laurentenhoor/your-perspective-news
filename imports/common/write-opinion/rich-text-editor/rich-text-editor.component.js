import RichTextEditorTemplate from './rich-text-editor.html';
import RichTextEditorStyle from './rich-text-editor.styl';

import Squire from './lib/squire';
// http://neilj.github.io/Squire/

class RichTextEditorComponent {

    constructor($timeout, $mdDialog, $element, $sanitize, $document, $scope) {
        'ngInject';

        var $ctrl = this;

        $ctrl.buttonState = {
            bold: false,
            italic: false,
            underline: false,
            bullet: false,
            numbered: false,
            quote: false,
            link: false
        };

        var editor = new Squire($element.find('text-editor')[0], {});
        console.log(editor);

        $ctrl.$onChanges = (changes) => {
            if (changes.addArticle && $ctrl.addArticle) {
                let article = angular.copy($ctrl.addArticle);
                let htmlString = $sanitize('<a class="source-chip" href="' + article.url + '">&nbsp;' + (article.publisher || (article.title.substring(0, 9) + '...') || 'link') + '&nbsp;</a>​');
                editor.insertHTML(htmlString);
            }
        }

        $ctrl.$onInit = () => {
            editor.setHTML($ctrl.initContent);
        }

        $ctrl.$onDestroy = () => {
            // editor.blur();
        }

        function setButtonStates() {
            $ctrl.buttonState.bold = editor.hasFormat('b');
            $ctrl.buttonState.italic = editor.hasFormat('i');
            $ctrl.buttonState.underline = editor.hasFormat('u');
            $ctrl.buttonState.bullet = editor.hasFormat('ul');
            $ctrl.buttonState.numbered = editor.hasFormat('ol');
            $ctrl.buttonState.quote = editor.hasFormat('blockquote');
            $ctrl.buttonState.link = editor.hasFormat('a');
        }

        editor.addEventListener('pathChange', function (e) {
            $timeout(() => setButtonStates());
        });

        editor.addEventListener('select', function (e) {
            $timeout(() => setButtonStates());
        });


        editor.addEventListener('blur', (e) => {
            console.log('blur', e);
        });

        editor.addEventListener('focus', (e) => {
            console.log('focus', e);
        });

        editor.addEventListener('input', function (e) {
            sendContent()
        });

        function sendContent() {
            $ctrl.onInput({
                $event: {
                    htmlContent: editor.getHTML()
                }
            })
        }

        $ctrl.clear = function () {
            editor.setHTML('');
            sendContent()
        }

        $ctrl.undo = function () {
            editor.undo();
        }

        $ctrl.bold = function ($event) {
            if (editor.hasFormat('b')) {
                editor.removeBold();
                $ctrl.buttonState.bold = false;
            } else {
                editor.bold();
                $ctrl.buttonState.bold = true;
            }
        }

        $ctrl.italic = function () {
            if (editor.hasFormat('i')) {
                editor.removeItalic();
                $ctrl.buttonState.italic = false;
            } else {
                editor.italic();
                $ctrl.buttonState.italic = true;
            }
        }


        $ctrl.bullet = function () {
            if (editor.hasFormat('ul')) {
                editor.removeList();
                $ctrl.buttonState.bullet = false;
            } else {
                editor.makeUnorderedList();
                $ctrl.buttonState.bullet = true;
            }
        }


        $ctrl.underline = function () {
        }

        $ctrl.quote = function () {
        }

        $ctrl.numbered = function () {
        }

        $ctrl.link = function ($event) {
        }

    }

}


export default {
    templateUrl: RichTextEditorTemplate,
    controller: RichTextEditorComponent,
    bindings: {
        initContent: '<',
        addArticle: '<',
        onInput: '&',
    }
}