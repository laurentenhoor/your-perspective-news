import RichTextEditorTemplate from './rich-text-editor.html';
import RichTextEditorStyle from './rich-text-editor.styl';

import Squire from './lib/squire';

class RichTextEditorComponent {

    constructor($timeout, $mdDialog, $element, $sanitize) {
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
        console.log(editor)

        editor.addEventListener('pathChange', function (e) {
            $timeout(function () {
                $ctrl.buttonState.bold = editor.hasFormat('b');
                $ctrl.buttonState.italic = editor.hasFormat('i');
                $ctrl.buttonState.underline = editor.hasFormat('u');
                $ctrl.buttonState.bullet = editor.hasFormat('ul');
                $ctrl.buttonState.numbered = editor.hasFormat('ol');
                $ctrl.buttonState.quote = editor.hasFormat('blockquote');
                $ctrl.buttonState.link = editor.hasFormat('a');
            });
        });

        editor.addEventListener('select', function (e) {
            $timeout(function () {
                $ctrl.buttonState.bold = editor.hasFormat('b');
                $ctrl.buttonState.italic = editor.hasFormat('i');
                $ctrl.buttonState.underline = editor.hasFormat('u');
                $ctrl.buttonState.bullet = editor.hasFormat('ul');
                $ctrl.buttonState.numbered = editor.hasFormat('ol');
                $ctrl.buttonState.quote = editor.hasFormat('blockquote');
                $ctrl.buttonState.link = editor.hasFormat('a');
            });
        });

        editor.addEventListener('input', function (e) {
            $ctrl.onInput({
                $event: {
                    htmlContent: editor.getHTML()
                }
            })

        });

        $ctrl.$onChanges = function (changes) {
            if (changes.addArticle && $ctrl.addArticle) {
                let article = angular.copy($ctrl.addArticle);
                let htmlString = $sanitize('<a href="' + article.url + '"><b>' + (article.publisher || '') + '</b> "' + (article.title.substring(0, 8) + '..."' || '') + '</a>&nbsp;');
                editor.insertHTML(htmlString);
                editor.focus();
            }
            if (changes.initContent) {
                $ctrl.clear();
                editor.insertHTML($ctrl.initContent);
            }
        }

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
            editor.focus();
            if ($ctrl.buttonState.underline) {
                editor.removeUnderline();
            } else {
                editor.underline();
            }
            editor.focus();
            editor.insert('');
            editor.focus();
        }

        $ctrl.quote = function () {
            editor.focus();
            if ($ctrl.buttonState.quote) {
                editor.decreaseQuoteLevel();
            } else {
                editor.increaseQuoteLevel();
            }
            editor.focus();
            editor.insert('');
            editor.focus();
        }

        $ctrl.numbered = function () {

            // editor.insert('');

            if ($ctrl.buttonState.numbered) {
                editor.removeList();
            } else {
                editor.makeOrderedList();
            }
            // editor.focus();

        }


        $ctrl.link = function ($event) {
            // editor.focus();
            if ($ctrl.buttonState.link) {
                editor.removeLink();
            } else {
                $mdDialog.show($mdDialog
                    .prompt()
                    .title('New Link')
                    .textContent('What is the URL of the link?')
                    .ok('ok')
                    .cancel('cancel')
                    .targetEvent($event)
                ).then(function (result) {
                    if (result && result !== '') {
                        editor.makeLink(result);
                    }
                });
            }
            // editor.focus();
            // editor.insert('');
        }

    }

}


export default {
    templateUrl: RichTextEditorTemplate,
    controller: RichTextEditorComponent,
    bindings: {
        addArticle: '<',
        onInput: '&',
        initContent: '<',
    }
}