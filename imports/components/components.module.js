import Feedback from './feedback/feedback.module';
import Loader from './loader/loader.module';
import Auth from './auth/auth.module';

import ScrollDisabler from './scroll-disabler/scroll-disabler.module';
import Dialog from './dialog/dialog.module';

import DesktopViewer from './desktop-viewer/desktop-viewer.module';
import About from './about/about.module';

export default angular
    .module('app.components', [
        Loader,
        Feedback,
        Auth,
        ScrollDisabler,
        Dialog,
        About,
        DesktopViewer,
    ])
    .name;