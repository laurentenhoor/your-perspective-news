import '/imports/app.module';

// Hack to remove iron router error messages.
Router.configure({
    noRoutesTemplate: 'unexistingTemplateName',
});
