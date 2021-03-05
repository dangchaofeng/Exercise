sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'sap/ui/Device',
        'manage-ui/model/models',
        'sap/ui/model/json/JSONModel',
        'manage-ui/javascript/utils',
        'sap/base/util/uid'
    ],
    function (UIComponent, Device, models, JSONModel, utils, uid) {
        'use strict';

        class Component extends UIComponent {
            constructor() {
                const fnClass = UIComponent.extend('manage-ui.Component', {
                    metadata: {
                        manifest: 'json',
                        config: {
                            fullwidth: true
                        }
                    }
                });
                Component.prototype.getMetadata = fnClass.prototype.getMetadata;

                super('manage-ui.Component');
            }

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            async init(args) {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, args);
            }

            /**
             * @author      Adam Dang
             * @description before destroy
             */
            destroy() {
                // call the base component's destroy function
                UIComponent.prototype.destroy.apply(this, arguments);
            }
        }

        return Component;
    }
);
