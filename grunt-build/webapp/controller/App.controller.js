var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = this;
            var fnClass = Controller.extend('general-ui.controller.App', {});
            App.prototype.getMetadata = fnClass.prototype.getMetadata;
            _this = _super.call(this, 'general-ui.controller.App') || this;
            return _this;
        }
        return App;
    }(Controller));
    return App;
});
//# sourceMappingURL=App.controller.js.map