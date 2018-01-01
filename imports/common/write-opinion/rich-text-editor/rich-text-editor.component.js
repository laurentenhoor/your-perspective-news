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

        $ctrl.$onChanges = function(changes) {
            if (changes.addArticle && $ctrl.addArticle) {
                console.log($ctrl.addArticle)
                let article = angular.copy($ctrl.addArticle);
                let htmlString = $sanitize('<a href="'+article.url+'"><b>'+ (article.publisher || '') + '</b> ' + (article.title || '') + '</a>&nbsp;');
                console.log(htmlString)
                editor.insertHTML(htmlString);

                // editor.insertHtml('<div>'+$ctrl.addArticle.title +'</div>');
            }
        }

        $ctrl.clear = function() {
            editor = new Squire($element.find('article')[0], {});
            editor.focus();
        }

        $ctrl.undo = function() {
            editor.undo();
        }

        $ctrl.bold = function () {

            if ($ctrl.buttonState.bold) {
                editor.removeBold();
            } else {
                editor.bold();
            }
        }

        $ctrl.italic = function () {
            if ($ctrl.buttonState.italic) {
                editor.removeItalic();
            } else {
                editor.italic();
            }
        }

        $ctrl.underline = function () {
            if ($ctrl.buttonState.underline) {
                editor.removeUnderline();
            } else {
                editor.underline();
            }
        }

        $ctrl.quote = function () {
            if ($ctrl.buttonState.quote) {
                editor.decreaseQuoteLevel();
            } else {
                editor.increaseQuoteLevel();
            }
        }

        $ctrl.numbered = function () {
            if ($ctrl.buttonState.numbered) {
                editor.removeList();
            } else {
                editor.makeOrderedList();
            }
        }

        $ctrl.bullet = function () {
            if ($ctrl.buttonState.bullet) {
                editor.removeList();
            } else {
                editor.makeUnorderedList();
            }
        }

        $ctrl.link = function ($event) {
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
        }

    }

}


export default {
    templateUrl: RichTextEditorTemplate,
    controller: RichTextEditorComponent,
    bindings: {
        addArticle: '<'
    }
}