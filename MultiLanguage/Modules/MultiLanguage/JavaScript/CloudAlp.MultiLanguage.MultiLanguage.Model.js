// Model.js
// -----------------------
// @module Case
define("CloudAlp.MultiLanguage.MultiLanguage.Model", ["Backbone", "Utils", "Validator"], function (
    Backbone,
    Utils,
    Validator
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({


        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/MultiLanguage.Service.ss"
            )
        )
        , validation: {
            fileUpload: {
                // required: true,
                // // pattern: 'email',
                // msg: Utils.translate('Valid Email is required')

            },
            upimage: {
                fn: function (val) {
                    console.log("model", val);
                }
            }
        }


    });
});
