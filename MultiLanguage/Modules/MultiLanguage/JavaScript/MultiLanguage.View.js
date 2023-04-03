
// @module CloudAlp.MultiLanguage.MultiLanguage
define('CloudAlp.MultiLanguage.MultiLanguage.View'
	, [
		'cloudalp_multilanguage_multilanguage.tpl'

		, 'CloudAlp.MultiLanguage.MultiLanguage.Model'

		, 'Backbone'
		, 'CloudAlp.MultiLanguage.MultiLanguage.Collection'
		, 'Utils'
		, 'ListHeader.View'
		, 'GlobalViews.Message.View'
		, 'Backbone.FormView'
	]
	, function (
		cloudalp_multilanguage_multilanguage_tpl

		, MultiLanguageModel

		, Backbone
		, MultiLanguageCollection
		, Utils
		, ListHeaderView
		, GlobalViewsMessageView
		, BackboneFormView
	) {
		'use strict';

		// @class CloudAlp.MultiLanguage.MultiLanguage.View @extends Backbone.View
		return Backbone.View.extend({

			template: cloudalp_multilanguage_multilanguage_tpl

			, initialize: function (options) {

				/*  Uncomment to test backend communication with an example service
					(you'll need to deploy and activate the extension first)
				*/

				this.model = new MultiLanguageModel();
				// var self = this;
				// this.model.fetch().done(function(result) {
				// 	self.message = result.message;
				// 	self.render();
				// });
				BackboneFormView.add(this);
				this.model.on('save', _.bind(this.showSuccess, this));
				this.model.on('saveCompleted', _.bind(this.resetForm, this));
			}
			, resetForm: function (event) {
				this.model.unset('fileUpload');
				event && event.preventDefault();
			},
			showSuccess: function (msg) {
				console.log("sve", this);
				let message, type = "";

				if (msg) {
					message = "Your's documents is submitted and Thank you for sharing us";
					type = 'success';
				} else {
					message = "Check the document ";
					type = 'error';
				}
				const global_view_message = new GlobalViewsMessageView({
					message: Utils.translate(message),
					type: type,
					closable: true
				});
				this.$('[data-type="alert-placeholder"]').html(global_view_message.render().$el.html());
			}

			, events: {
				'submit form': 'saveForm',
				'click [data-action="submit"]': "submit",
				'change [data-action="previewImg"]': "previewImg",
			}


			, bindings: {
				'[name="fileUpload"]': 'fileUpload'
			}

			, childViews: {
				showMessage: function () {

					return new GlobalViewsMessageView({
						message: "Uploaded success",
						type: 'success',
						closable: true
					});
				}
			}
			, previewImg: function () {
				const preview = $("#upload-img");
				const file = document.querySelector("input[type=file]").files[0];
				const reader = new FileReader();
				reader.addEventListener(
					"load",
					() => {
						// convert image file to base64 string
						let filetype = this.typeImg(file.type);
						let url = reader.result.split(`data:${file.type};base64,`).join("");;
						$('.form-img-col').append(`<img id="upload-img" src=${url} alt=""/>`);
						this.model.set("filename", file.name);
						this.model.set("filetype", filetype);
						this.model.set("img", url);
					},
					false
				);

				(file) ? reader.readAsDataURL(file) : -1;
			}
			, typeImg: function (type) {
				let fileType = "";
				switch (type) {
					case "image/png": (fileType = 'PNGIMAGE', this.ext = 'png');
						break;
					case "image/jpeg": (fileType = 'JPGIMAGE', this.ext = 'jpeg');
						break;
					case "image/jpg": (fileType = 'JPGIMAGE', this.ext = 'jpg');
						break;
					case "application/pdf": (fileType = 'PDF', this.ext = 'pdf');
						break;
					case "text/plain": (fileType = 'PLAINTEXT', this.ext = 'txt');
						break;
					case "application/vnd.ms-excel": (fileType = 'CSV', this.ext = 'txt');
						break;
				}

				return fileType;
			}
			, submit: function (e) {
				e.preventDefault();
				// var model = new MultiLanguageModel();
				this.$savingForm = jQuery(e.target).closest('form');
				let data = this.$savingForm.serializeObject();
				data.filename = this.model.get("filename");
				data.type = this.model.get("filetype");
				data.img = this.model.get("img");

				this.model.save(data).then(res => {
					(res.RecordId) ? (this.showSuccess(true)) : this.showSuccess(false);
				});
			}
			//@method getContext @return CloudAlp.MultiLanguage.MultiLanguage.View.Context
			, getContext: function getContext() {
				//@class CloudAlp.MultiLanguage.MultiLanguage.View.Context
				this.message = this.message || 'Hello World!!';
				return {};
			}
		});
	});
