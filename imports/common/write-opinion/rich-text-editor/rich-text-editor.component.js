import RichTextEditorTemplate from './rich-text-editor.html';
import RichTextEditorStyle from './rich-text-editor.styl';

import Squire from './lib/squire';
// http://neilj.github.io/Squire/

class RichTextEditorComponent {

    constructor($timeout, $mdDialog, $element, $sanitize, $document) {
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

        var editor = new Squire($element.find('article')[0], {});
        console.log(editor);

        $ctrl.$onChanges = (changes) => {
            if (changes.addArticle && $ctrl.addArticle) {
                let article = angular.copy($ctrl.addArticle);
                let htmlString = $sanitize('<a class="source-chip" href="' + article.url + '">&nbsp;' + (article.publisher || (article.title.substring(0, 9) + '...') || 'link') + '&nbsp;</a>​');
                editor.removeLink();
                editor.insertHTML(htmlString);
                editor.removeLink();
                editor.focus();
            }
        }

        $ctrl.$onInit = () => {
            editor.setHTML($ctrl.initContent);
        }

        $ctrl.$onDestroy = () => {
            $ctrl.blurAllInputs();
            editor.blur();
        }

        $ctrl.blurAllInputs = function () {

			var inputs = $document[0].querySelectorAll('input');
			console.log(inputs);

			_.forEach(inputs, (input) => {
                console.log(input)
				input.blur((event) => {
                    console.log(event)
                });
			});
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

        editor.addEventListener('input', function (e) {
            $ctrl.onInput({
                $event: {
                    htmlContent: editor.getHTML()
                }
            })

        });

        $ctrl.clear = function () {
            editor.focus();
            editor.setHTML('');
            editor.moveCursorToStart();
            // editor.focus();
        }

        $ctrl.undo = function () {
            editor.undo();
        }

        $ctrl.bold = function () {

            if (editor.hasFormat('b')) {
                editor.removeBold();
                $ctrl.buttonState.bold = false;
            } else {
                editor.bold();
                $ctrl.buttonState.bold = true;
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

        $ctrl.italic = function () {

            if (editor.hasFormat('i')) {
                editor.removeItalic();
                $ctrl.buttonState.italic = false;
            } else {
                editor.italic();
                $ctrl.buttonState.italic = true;
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