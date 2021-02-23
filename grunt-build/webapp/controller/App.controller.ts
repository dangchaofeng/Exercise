/*
 * @Author: your name
 * @Date: 2020-10-20 14:56:00
 * @LastEditTime: 2020-10-26 16:35:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \com.sap.cf.sales.self.billing.general\webapp\controller\App.controller.js
 */
sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
    'use strict';

    class App extends Controller {
        constructor() {
            const fnClass = Controller.extend('general-ui.controller.App', {});
            App.prototype.getMetadata = fnClass.prototype.getMetadata;
            super('general-ui.controller.App');
        }
    }

    return App;
});
