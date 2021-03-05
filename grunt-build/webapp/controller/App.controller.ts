sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
    'use strict';

    class App extends Controller {
        constructor() {
            const fnClass = Controller.extend('manage-ui.controller.App', {});
            App.prototype.getMetadata = fnClass.prototype.getMetadata;
            super('manage-ui.controller.App');
        }
    }

    return App;
});
