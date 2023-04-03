<section class="multilanguage-info-card">
  <form class="form" action="#" method="post">
    <div class="" data-validation="control-group">
      <div class="input-group mb-3" data-validation="control">
        <label for="formFile" class="form-label">Upload Damage Item
          <input class="form-control" type="file" name="fileUpload" id="file" data-action="previewImg">
        </label>
      </div>
    </div>

    <div class="form-img row">
      <div class="form-img-col col-lg-3"></div>
    </div>

    <div>
      <button type="submit" class="form-img-sbt" data-action="submit">submit</button>
    </div>
  </form>
  <div id="alert-placeholder">
    <p class="alert-type" data-type="alert-placeholder"></p>
  </div>

</section>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
