sap.ui.define(['sap/base/util/deepExtend', 'sap/m/MessageToast', 'sap/ui/core/format/DateFormat'], function (deepExtend, MessageToast, DateFormat) {
    'use strict';
    return {
        /**
         * @author      Adam Dang
         * @param {object/array} params The data to be deeply cloned
         * @description deep clone data
         * @returns {object/array} New data
         */
        cloneFun: function (params) {
            var type = Array.isArray(params) ? [] : {};
            return deepExtend(type, params);
        },
        /**
         * @author      Adam Dang
         * @param {object/array} oldData The data to be deeply cloned
         * @param {object/array} newData The data to be deeply cloned
         * @description deep compare
         * @returns {boolean} true/false
         */
        compareFun: function (oldData, newData) {
            if (oldData === newData)
                return true;
            if (this.isObject(oldData) &&
                this.isObject(newData) &&
                Object.keys(oldData).length === Object.keys(newData).length) {
                for (var key in oldData) {
                    if (oldData.hasOwnProperty(key)) {
                        if (!this.compareFun(oldData[key], newData[key])) {
                            return false;
                        }
                    }
                }
            }
            else if (this.isArray(oldData) &&
                this.isArray(oldData) &&
                oldData.length === newData.length) {
                for (var i = 0, length_1 = oldData.length; i < length_1; i++) {
                    if (!this.compareFun(oldData[i], newData[i])) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        },
        /**
         * @author      Adam Dang
         * @param {*} obj Any data
         * @description determine is Object?
         * @returns {boolean} true/false
         */
        isObject: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        },
        /**
         * @author      Adam Dang
         * @param {*} arr Any data
         * @description determine is isArray?
         * @returns {boolean} true/false
         */
        isArray: function (arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        },
        /**
         * @author: Adam Dang
         * @param {*} response Response results for request files
         * @description: Download the binary stream file
         */
        download: function (response) {
            var data = response.data, headers = response.headers;
            var fileName = headers['content-disposition'].match(/filename=(.*)/)[1];
            // Flow binary to blob
            var blob = new Blob([data], { type: 'application/octet-stream' });
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // Compatible with ie, window.navigator.msSaveBlob : save files locally
                window.navigator.msSaveBlob(blob, decodeURI(fileName));
            }
            else {
                // Create a new URL and point to the address of the file object or blob object
                var blobURL = window.URL.createObjectURL(blob);
                // Create a tag to jump to the download link
                var tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = blobURL;
                tempLink.setAttribute('download', decodeURI(fileName));
                // Compatibility: some browsers do not support the download attribute of HTML5
                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank');
                }
                // Mount a tag
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                // Release blob URL address
                window.URL.revokeObjectURL(blobURL);
            }
        },
        /*
         * @author: JinFeng
         * @description: init MessageToast
         */
        showMessageToastFun: function (message) {
            MessageToast.show(message, {
                animationTimingFunction: 'ease-in-out',
                animationDuration: 1200
            });
        },
        /**
         * @author: Adam Dang
         * @param {*} date The date data
         * @param {*} enable default true, need to transform
         * @description: format all Date field, if it is date object ,format it. if it is string, return.
         * @returns {string} The formatted date
         */
        formatDateFun: function (_a) {
            var date = _a.date, _b = _a.enable, enable = _b === void 0 ? true : _b;
            var oDateFormat = DateFormat.getDateInstance(); // also getDateTimeInstance() exist
            return date ? oDateFormat.format(new Date(date)) : null;
        }
    };
});
//# sourceMappingURL=utils.js.map