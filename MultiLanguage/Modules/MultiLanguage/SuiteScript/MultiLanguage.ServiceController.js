define("CloudAlp.MultiLanguage.MultiLanguage.ServiceController", ["ServiceController", "SC.Models.Init"], function (
  ServiceController,
  ModelsInit
) {
  "use strict";

  return ServiceController.extend({
    name: "CloudAlp.MultiLanguage.MultiLanguage.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {
      var res = {};
      if (ModelsInit.session.isLoggedIn3()) {
        const profile = nlapiSearchRecord('customer', null, ['internalid', 'is', nlapiGetUser()], [new nlobjSearchColumn('language', 'msesubsidiary'), new nlobjSearchColumn('language')]);
        const profile_lang = profile[0].getValue('language');
        const profile_subsidiary_lang = profile[0].getValue('language', 'msesubsidiary');

        const profile_lang_cust = ModelsInit.context.setSessionObject('profile_lang', profile_lang);
        const profile_subsidiary_lang_cust = ModelsInit.context.setSessionObject('profile_subsidiary_lang', profile_subsidiary_lang);

        //const Id = nlapiSubmitField('customer', nlapiGetUser(), 'language', profile_subsidiary_lang, true);
        res.language = profile_subsidiary_lang;
        res.Id = profile_subsidiary_lang;

      }
      if (profile_lang_cust != null && profile_lang_cust === '' && profile_subsidiary_lang_cust != "") {

      }
      return res;
    },

    post: function post() {
      var returnString = {};
      const self = this.data;
      console.warn("self", JSON.stringify(self));
      try {
        var dataFile = nlapiCreateFile(self.filename, self.type, self.img);
        // var dataFile = nlapiCreateFile('ItemData.json','JSON',JSON.stringify(data));
        dataFile.setFolder('2822');
        dataFile.setIsOnline(true);
        var fileId = nlapiSubmitFile(dataFile);
        returnString.RecordId = fileId.toString();
      } catch (e) {
        returnString.error = e;
      }
      return returnString;
    },

    put: function put() {
      // not implemented
    },

    delete: function () {
      // not implemented
    }
  });
});
