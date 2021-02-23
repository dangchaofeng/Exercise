sap.ui.define(
    ['sap/base/util/deepExtend', 'sap/m/MessageToast', 'sap/ui/core/format/DateFormat'],
    function (deepExtend, MessageToast, DateFormat) {
        'use strict';

        return {
            /**
             * @author      Adam Dang
             * @param {object/array} params The data to be deeply cloned
             * @description deep clone data
             * @returns {object/array} New data
             */
            cloneFun(params) {
                const type = Array.isArray(params) ? [] : {};
                return deepExtend(type, params);
            },

            /**
             * @author      Adam Dang
             * @param {object/array} oldData The data to be deeply cloned
             * @param {object/array} newData The data to be deeply cloned
             * @description deep compare
             * @returns {boolean} true/false
             */
            compareFun(oldData, newData) {
                if (oldData === newData) return true;
                if (
                    this.isObject(oldData) &&
                    this.isObject(newData) &&
                    Object.keys(oldData).length === Object.keys(newData).length
                ) {
                    for (const key in oldData) {
                        if (oldData.hasOwnProperty(key)) {
                            if (!this.compareFun(oldData[key], newData[key])) {
                                return false;
                            }
                        }
                    }
                } else if (
                    this.isArray(oldData) &&
                    this.isArray(oldData) &&
                    oldData.length === newData.length
                ) {
                    for (let i = 0, length = oldData.length; i < length; i++) {
                        if (!this.compareFun(oldData[i], newData[i])) {
                            return false;
                        }
                    }
                } else {
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
            isObject(obj) {
                return Object.prototype.toString.call(obj) === '[object Object]';
            },

            /**
             * @author      Adam Dang
             * @param {*} arr Any data
             * @description determine is isArray?
             * @returns {boolean} true/false
             */
            isArray(arr) {
                return Object.prototype.toString.call(arr) === '[object Array]';
            },

            /**
             * @author: Adam Dang
             * @param {*} response Response results for request files
             * @description: Download the binary stream file
             */
            download(response: { data: Blob; headers: object }) {
                const { data, headers } = response;
                const fileName = headers['content-disposition'].match(/filename=(.*)/)[1];
                // Flow binary to blob
                const blob = new Blob([data], { type: 'application/octet-stream' });

                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // Compatible with ie, window.navigator.msSaveBlob : save files locally
                    window.navigator.msSaveBlob(blob, decodeURI(fileName));
                } else {
                    // Create a new URL and point to the address of the file object or blob object
                    const blobURL = window.URL.createObjectURL(blob);
                    // Create a tag to jump to the download link
                    const tempLink = document.createElement('a');
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
            showMessageToastFun(message: string) {
                MessageToast.show(message, {
                    animationTimingFunction: 'ease-in-out', // default
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
            formatDateFun: function ({ date, enable = true }: { date: Date; enable?: boolean }) {
                const oDateFormat = DateFormat.getDateInstance(); // also getDateTimeInstance() exist

                return date ? oDateFormat.format(new Date(date)) : null;
            }
        };
    }
);
