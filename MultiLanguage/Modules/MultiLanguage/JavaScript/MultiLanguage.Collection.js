define('CloudAlp.MultiLanguage.MultiLanguage.Collection'
  , [
    'Backbone.View'
    , 'Backbone'
    , 'Utils'
    , 'underscore'
    , 'Footer.View'
    , 'Configuration'
    , "GlobalViews.HostSelector.View"
    , "Header.View"
    , "Profile.Model"
    , 'CloudAlp.MultiLanguage.MultiLanguage.Model'
    , 'Session'
  ], function (
    BackboneView
    , Backbone
    , Utils
    , _
    , FooterView
    , Configuration
    , GlobalViewsHostSelectorView
    , HeaderView
    , ProfileModel
    , MultiLanguageModel
    , Session
  ) {
  'use strict';
  return Backbone.Collection.extend({
    // @property {MultiLanguageModel} model
    model: MultiLanguageModel,
    // @property {Boolean} cacheSupport enable or disable the support for cache (Backbone.CachedModel)
    cacheSupport: false,
    // @property {String} url
    url: Utils.getAbsoluteUrl('services/MultiLanguage.Service.ss'),

  });

});