// Model.js
// -----------------------
// @module Case
define("CloudAlp.MultiLanguage.MultiLanguage.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/MultiLanguage/SuiteScript2/MultiLanguage.Service.ss"
            ),
            true
        )
});
});
