sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'sap/ui/Device',
        'general-ui/model/models',
        'sap/ui/model/json/JSONModel',
        'general-ui/javascript/utils',
        'sap/base/util/uid'
    ],
    function (UIComponent, Device, models, JSONModel, utils, uid) {
        'use strict';

        interface StringArray {
            [index: number]: string;
        }

        class Component extends UIComponent {
            constructor() {
                const fnClass = UIComponent.extend('general-ui.Component', {
                    metadata: {
                        manifest: 'json',
                        config: {
                            fullwidth: true
                        }
                    }
                });
                Component.prototype.getMetadata = fnClass.prototype.getMetadata;

                super('general-ui.Component');
            }

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            async init(args) {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, args);

                // set variable needed
                this._setVariableFun();

                // get CSRF Token
                const csrfToken = await this._getCSRFToken();

                // set CSRF Token to axios intercetptor
                this._setAxiosInterceptors({ csrfToken });

                // set the device model
                this.setModel(models.createDeviceModel(), 'device');

                // enable routing
                this.getRouter().initialize();
            }

            /**
             * @author      Adam Dang
             * @description set variable needed
             */
            _setVariableFun() {
                this.i18nResourceBundle = this.getModel('i18n').getResourceBundle();
                this.app = this.byId('app');
            }

            /**
             * @author      Adam Dang
             * @description get I18n Text， fixed bug
             * @param {string} sKey the key within the bundle
             * @param {array} [aArgs] arguments to format the message
             * @param {boolean} [bIgnoreKeyFallback=false] If set, <code>undefined</code> is returned instead of the key string, when the key is not found in any bundle or fallback bundle.
             * @returns {string} The i18n text
             */

            _getI18nTextFun(sKey: string, aArgs?: StringArray, bIgnoreKeyFallback?: boolean) {
                return this.i18nResourceBundle.getText(sKey, aArgs, bIgnoreKeyFallback);
            }

            /**
             * @author      Adam Dang
             * @description set axios interceptors
             */
            _setAxiosInterceptors({ csrfToken }) {
                this.csrfToken = csrfToken;
                // add request interceptors
                this.requestInterceptors = axios.interceptors.request.use(
                    config => {
                        if (config.method === 'get') {
                            // get method need loading
                            this.app.setBusy(true);
                        } else {
                            // get method don't need csrf token
                            config.headers['X-CSRF-Token'] = csrfToken;
                        }
                        return config;
                    },
                    error => {
                        console.error('interceptors: request error');
                        this.app.setBusy(false);
                        return Promise.reject(error);
                    }
                );

                // add response interceptors
                this.responseInterceptors = axios.interceptors.response.use(
                    response => {
                        const { method } = response.config;
                        if (method === 'get') {
                            // get method need to cancel loading, except lifeCycle refresh
                            this.app.setBusy(false);
                        }
                        return response;
                    },
                    error => {
                        console.error('interceptors: response error');
                        this.app.setBusy(false);
                        const status = error.response.status;
                        if (status === 401) {
                            window.location.reload();
                        } else {
                            this._showMessageFun({
                                msg: this.i18nResourceBundle.getText('REQUEST_FAIL_MESG', status)
                            });
                        }
                        return Promise.reject(error);
                    }
                );
            }

            /**
             * @author: Adam Dang
             * @description: get csrf token
             * @return {String} The csrf token
             */
            async _getCSRFToken() {
                const url =
                    window.location.origin +
                    '/ui/selfbilling-customizing-service/v1/odata/v2/SoldToPartyService';
                const props = {
                    headers: {
                        ContentType: 'application/json',
                        cache: false,
                        'X-CSRF-Token': 'Fetch'
                    }
                };
                const { headers } = await axios.get(url, props).catch(() => {
                    // ! Local fault tolerant processing
                    return { headers: { 'x-csrf-token': null } };
                });
                return headers['x-csrf-token'];
            }

            /**
             * @author: Adam Dang
             * @description: error dialog
             */
            _showMessageFun({
                title = 'Error',
                state = 'Error',
                msg = '',
                icon = 'Error',
                emphasized = false,
                cb
            }: {
                msg: string;
                title?: string;
                state?: string;
                icon?: string;
                emphasized?: boolean;
                cb?;
            }) {
                const colorParams = {
                    Error: '#bb0000',
                    Warning: '#e9730c',
                    Information: '#6a6d70'
                };
                const numId = uid();
                const oDialog = new sap.m.Dialog({
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
                        press: () => {
                            cb && cb();
                            oDialog.close();
                        }
                    }),
                    customHeader: new sap.m.Bar({
                        contentMiddle: [
                            new sap.ui.core.Icon({
                                color: colorParams[state],
                                src: `sap-icon://message-${icon.toLowerCase()}`
                            }),
                            new sap.m.Text({ text: title })
                        ]
                    }),
                    afterClose: () => {
                        sap.ui
                            .getCore()
                            .byId('dialogError' + numId)
                            .destroy();
                        oDialog.destroy();
                    }
                });

                oDialog.open();
            }

            /**
             * @author      Adam Dang
             * @description before destroy
             */
            destroy() {
                // remove interceptors
                axios.interceptors.request.eject(this.requestInterceptors);
                axios.interceptors.response.eject(this.responseInterceptors);
                // call the base component's destroy function
                UIComponent.prototype.destroy.apply(this, arguments);
            }
        }

        return Component;
    }
);
