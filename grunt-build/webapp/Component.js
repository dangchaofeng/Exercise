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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/ui/Device',
    'general-ui/model/models',
    'sap/ui/model/json/JSONModel',
    'general-ui/javascript/utils',
    'sap/base/util/uid'
], function (UIComponent, Device, models, JSONModel, utils, uid) {
    'use strict';
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            var _this = this;
            var fnClass = UIComponent.extend('general-ui.Component', {
                metadata: {
                    manifest: 'json',
                    config: {
                        fullwidth: true
                    }
                }
            });
            Component.prototype.getMetadata = fnClass.prototype.getMetadata;
            _this = _super.call(this, 'general-ui.Component') || this;
            return _this;
        }
        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        Component.prototype.init = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var csrfToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // call the base component's init function
                            UIComponent.prototype.init.apply(this, args);
                            // set variable needed
                            this._setVariableFun();
                            return [4 /*yield*/, this._getCSRFToken()];
                        case 1:
                            csrfToken = _a.sent();
                            // set CSRF Token to axios intercetptor
                            this._setAxiosInterceptors({ csrfToken: csrfToken });
                            // set the device model
                            this.setModel(models.createDeviceModel(), 'device');
                            // enable routing
                            this.getRouter().initialize();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @author      Adam Dang
         * @description set variable needed
         */
        Component.prototype._setVariableFun = function () {
            this.i18nResourceBundle = this.getModel('i18n').getResourceBundle();
            this.app = this.byId('app');
        };
        /**
         * @author      Adam Dang
         * @description get I18n Text， fixed bug
         * @param {string} sKey the key within the bundle
         * @param {array} [aArgs] arguments to format the message
         * @param {boolean} [bIgnoreKeyFallback=false] If set, <code>undefined</code> is returned instead of the key string, when the key is not found in any bundle or fallback bundle.
         * @returns {string} The i18n text
         */
        Component.prototype._getI18nTextFun = function (sKey, aArgs, bIgnoreKeyFallback) {
            return this.i18nResourceBundle.getText(sKey, aArgs, bIgnoreKeyFallback);
        };
        /**
         * @author      Adam Dang
         * @description set axios interceptors
         */
        Component.prototype._setAxiosInterceptors = function (_a) {
            var _this = this;
            var csrfToken = _a.csrfToken;
            this.csrfToken = csrfToken;
            // add request interceptors
            this.requestInterceptors = axios.interceptors.request.use(function (config) {
                if (config.method === 'get') {
                    // get method need loading
                    _this.app.setBusy(true);
                }
                else {
                    // get method don't need csrf token
                    config.headers['X-CSRF-Token'] = csrfToken;
                }
                return config;
            }, function (error) {
                console.error('interceptors: request error');
                _this.app.setBusy(false);
                return Promise.reject(error);
            });
            // add response interceptors
            this.responseInterceptors = axios.interceptors.response.use(function (response) {
                var method = response.config.method;
                if (method === 'get') {
                    // get method need to cancel loading, except lifeCycle refresh
                    _this.app.setBusy(false);
                }
                return response;
            }, function (error) {
                console.error('interceptors: response error');
                _this.app.setBusy(false);
                var status = error.response.status;
                if (status === 401) {
                    window.location.reload();
                }
                else {
                    _this._showMessageFun({
                        msg: _this.i18nResourceBundle.getText('REQUEST_FAIL_MESG', status)
                    });
                }
                return Promise.reject(error);
            });
        };
        /**
         * @author: Adam Dang
         * @description: get csrf token
         * @return {String} The csrf token
         */
        Component.prototype._getCSRFToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url, props, headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = window.location.origin +
                                '/ui/selfbilling-customizing-service/v1/odata/v2/SoldToPartyService';
                            props = {
                                headers: {
                                    ContentType: 'application/json',
                                    cache: false,
                                    'X-CSRF-Token': 'Fetch'
                                }
                            };
                            return [4 /*yield*/, axios.get(url, props).catch(function () {
                                    // ! Local fault tolerant processing
                                    return { headers: { 'x-csrf-token': null } };
                                })];
                        case 1:
                            headers = (_a.sent()).headers;
                            return [2 /*return*/, headers['x-csrf-token']];
                    }
                });
            });
        };
        /**
         * @author: Adam Dang
         * @description: error dialog
         */
        Component.prototype._showMessageFun = function (_a) {
            var _b = _a.title, title = _b === void 0 ? 'Error' : _b, _c = _a.state, state = _c === void 0 ? 'Error' : _c, _d = _a.msg, msg = _d === void 0 ? '' : _d, _e = _a.icon, icon = _e === void 0 ? 'Error' : _e, _f = _a.emphasized, emphasized = _f === void 0 ? false : _f, cb = _a.cb;
            var colorParams = {
                Error: '#bb0000',
                Warning: '#e9730c',
                Information: '#6a6d70'
            };
            var numId = uid();
            var oDialog = new sap.m.Dialog({
                type: 'Message',
                title: title,
                state: state,
                titleAlignment: sap.m.TitleAlignment.Center,
                ariaLabelledBy: 'dialogError' + numId,
                content: new sap.m.Text({
                    id: 'dialogError' + numId,
                    text: msg
                }),
                beginButton: new sap.m.Button({
                    type: emphasized ? sap.m.ButtonType.Emphasized : sap.m.ButtonType.Default,
                    text: this._getI18nTextFun('CLOSE'),
                    press: function () {
                        cb && cb();
                        oDialog.close();
                    }
                }),
                customHeader: new sap.m.Bar({
                    contentMiddle: [
                        new sap.ui.core.Icon({
                            color: colorParams[state],
                            src: "sap-icon://message-" + icon.toLowerCase()
                        }),
                        new sap.m.Text({ text: title })
                    ]
                }),
                afterClose: function () {
                    sap.ui
                        .getCore()
                        .byId('dialogError' + numId)
                        .destroy();
                    oDialog.destroy();
                }
            });
            oDialog.open();
        };
        /**
         * @author      Adam Dang
         * @description before destroy
         */
        Component.prototype.destroy = function () {
            // remove interceptors
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
            // call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        };
        return Component;
    }(UIComponent));
    return Component;
});
//# sourceMappingURL=Component.js.map