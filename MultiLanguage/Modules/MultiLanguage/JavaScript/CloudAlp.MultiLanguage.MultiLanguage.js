
define(
	'CloudAlp.MultiLanguage.MultiLanguage'
	, [
		'CloudAlp.MultiLanguage.MultiLanguage.View'
		, 'Backbone.View'
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

	]
	, function (
		MultiLanguageView
		, BackboneView
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

		return {
			mountToApp: function mountToApp(container) {
				// using the 'Layout' component we add a new child view inside the 'Header' existing view
				// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
				// more documentation of the Extensibility API in
				// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

				/** @type {LayoutComponent} */
				var layout = container.getComponent('Layout');
				const PageType = container.getComponent('PageType');
				const profile = ProfileModel.getInstance();
				PageType.registerPageType({
					name: 'TEST',
					routes: ['test'],
					options: {
					},
					view: MultiLanguageView
				});

				// Call the get method to set the lang in customer record
				this.application = container;
				var url = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
						"services/MultiLanguage.Service.ss"
					)
				);
				var promise = $.get(url);
				promise.then(function (res) {
					if (_.has(res, 'Id')) {
						container.setLangId = res.Id;
					}
				});
				this.application.waitForPromise(promise);
				//end

				//MultiLanguage
				_.extend(HeaderView.prototype, {
					getContext: _.wrap(HeaderView.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						const parameters = Utils.parseUrlOptions(location.search);
						const isLoggedIn = ProfileModel.getInstance().get('isLoggedIn') === 'T';
						const hasLan = _.propertyOf(parameters)('lang');
						if (isLoggedIn && _.has(container, 'setLangId') && hasLan != container.setLangId) {
							window.location.search = '?lang=' + container.setLangId;
						}
						const environment = SC.ENVIRONMENT;
						const show_currencies =
							environment.availableCurrencies &&
							environment.availableCurrencies.length > 1 &&
							!Configuration.get('header.notShowCurrencySelector');
						//custom
						const show_languages = !!(
							environment.availableHosts &&
							environment.availableHosts.length > 0 && isLoggedIn
						);
						context.showLanguages = show_languages;
						context.showLanguagesOrCurrencies = show_languages || show_currencies;
						let getLang = environment.currentLanguage.locale.split('_')[0].toUpperCase();
						//end
						$(() => $('.header-menu-settings-icon').next().html(getLang));
						return context;
					})
				});
				_.extend(GlobalViewsHostSelectorView.prototype, {
					events: _.extend({}, GlobalViewsHostSelectorView.prototype.events, {
						'change select[data-toggle="host-selector"]': 'selectHost',
						'click select[data-toggle="host-selector"]': 'selectHostClick'
					})
					// @method selectHostClick @param {HTMLEvent} e
					, selectHostClick: function (e) {
						e.stopPropagation();
					}

					// @method setHost @param {HTMLEvent} e
					, setHost: function (e) {
						const host = jQuery(e.target).val();
						const BackboneHistory = Backbone.History;
						//sessionStorage.setItem("host", host);
						//custom code
						this.setHref(host); // here lang code will pass
						//end
					}
					// @method setHref @param {String} url
					, setHref: function (url) {
						//custom code
						window.location.search = '?lang=' + url;
						//end
					},
					getContext: _.wrap(GlobalViewsHostSelectorView.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						//Custom code
						const current_domian = SC.ENVIRONMENT.currentHostString;
						let current_lang = SC.ENVIRONMENT.currentLanguage.locale;
						const available_hosts = _.map(SC.ENVIRONMENT.availableHosts, function (host) {
							// @class GlobalViews.HostSelector.View.Context.Host
							return {
								// @property {Boolean} hasLanguages
								hasLanguages: host.languages && host.languages.length,
								// @property {String} title
								title: host.title,
								// @property {Array<GlobalViews.HostSelector.View.Context.Host.Language>} languages
								languages: _.map(host.languages, function (language) {
									// @class GlobalViews.HostSelector.View.Context.Host.Language
									return {
										// @property {String} host
										host: language.locale,
										// @property {String} displayName
										displayName: language.title || language.name,
										// @property {Boolean} isSelected
										isSelected: (language.locale === current_lang)
									};
								})
							};
						});
						const showcurrent_domain_list = available_hosts.filter(domn => domn.title === current_domian);
						context.availableHosts = [_.omit(showcurrent_domain_list[0], 'title')];
						//end
						return context;
					})

				});
				//end;
			}
		};
	});
