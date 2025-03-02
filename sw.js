const FILES_TO_CACHE = [
    "/",
    "pwa.webmanifest",
    "manifest.json",
    "TIVarsLib.wasm",
    "index.html",
    "latealways_patch.js",
    "TIVarsLib.js",
    "templates/loading-mask.html",
    "templates/commtest.html",
    "templates/screen-captures-slideshow.html",
    "templates/dialog-commtest-config.html",
    "templates/dialog-developer-options.html",
    "templates/dialog-delete-files.html",
    "templates/dialog-long-message.html",
    "templates/dialog-duplicate-filenames.html",
    "templates/toolbar-app.html",
    "templates/dialog-send-os.html",
    "templates/dialog-send-files.html",
    "templates/toolbar-device-explorer.html",
    "templates/dialog-commtest.html",
    "templates/dialog-custom-filename.html",
    "templates/device-explorer.html",
    "templates/dialog-message.html",
    "templates/screen-captures.html",
    "templates/dialog-local-storage.html",
    "templates/dialog-about.html",
    "templates/animations.html",
    "templates/no-device.html",
    "templates/toolbar-screen-capture.html",
    "templates/dialog-calc-info.html",
    "images/toolbar_capture.svg",
    "images/filetype_image.svg",
    "images/TI-84 Plus Silver Edition @2x.png",
    "images/filetype_program.svg",
    "images/filetype_app.svg",
    "images/animation_files.svg",
    "images/dialog_warning.svg",
    "images/icon_checkmark_green_hover.svg",
    "images/toolbar_send_to_comp.svg",
    "images/toolbar_send_to_hh.svg",
    "images/icon48.png",
    "images/toolbar_slide_show.svg",
    "images/TI-84 Plus C Silver Edition @2x.png",
    "images/icon_checkmark_green.svg",
    "images/filetype_equation.svg",
    "images/toolbar_calc.svg",
    "images/animation_delete.svg",
    "images/ScreenCapture.png",
    "images/animation_os.svg",
    "images/filetype_certificate.svg",
    "images/animation_capture.svg",
    "images/filetype_os.svg",
    "images/animation_calculator.svg",
    "images/menu.svg",
    "images/file_list_background.png",
    "images/filetype_graphdb.svg",
    "images/icon_close.svg",
    "images/filetype_list.svg",
    "images/toolbar_styles.svg",
    "images/toolbar_add_from_comp.svg",
    "images/animation_sync.svg",
    "images/splitter_chevron.svg",
    "images/ToolbarLogo.svg",
    "images/TI logo @2x.png",
    "images/toolbar_border.svg",
    "images/ticonnect-icon-128.png",
    "images/toolbar_copy.svg",
    "images/icon_checkmark.svg",
    "images/TI-83 Premium CE @2x.png",
    "images/filetype_range.svg",
    "images/filetype_group.svg",
    "images/TI-84 Plus CE @2x.png",
    "images/icon128.png",
    "images/filetype_matrix.svg",
    "images/toolbar_refresh.svg",
    "images/TI-84 Plus @2x.png",
    "images/icon16.png",
    "images/toolbar_missing.svg",
    "images/icon_select.svg",
    "images/no hh connected.svg",
    "images/ticonnect-icon-16.png",
    "images/toolbar_save.svg",
    "images/TI-83 Plus fr @2x.png",
    "images/ticonnect-icon-48.png",
    "images/filetype_real.svg",
    "images/animation_fail.svg",
    "images/no hh connected 2.svg",
    "images/toolbar_settings.svg",
    "images/animation_arrow.svg",
    "images/toolbar_delete.svg",
    "images/lock.svg",
    "images/filetype_string.svg",
    "css/animations.css",
    "css/no-device.css",
    "css/dialog-about.css",
    "css/dialog-duplicates.css",
    "css/commtest.css",
    "css/app.css",
    "css/screen-captures.css",
    "css/dialog-calc-info.css",
    "css/toolbar.css",
    "css/dialog-custom-filename.css",
    "css/dialog-send-files.css",
    "css/loading-mask.css",
    "css/ngDialog-theme.css",
    "css/device-explorer.css",
    "js/image-utilities.js",
    "js/device-views-screencapture-slideshow.js",
    "js/app.js",
    "js/device-views-developer-options.js",
    "js/app-utilities.js",
    "js/developer-options.js",
    "js/background.js",
    "js/device-views.js",
    "js/toolbar-app.js",
    "js/device-views-screencapture.js",
    "js/screencapture.js",
    "js/commtest.js",
    "lib/ngDialog/css/ngDialog.css",
    "lib/ngDialog/css/ngDialog-theme-default.css",
    "lib/ngDialog/js/ngDialog.js",
    "lib/jsZip/jszip.js",
    "lib/angular/angular-touch.js",
    "lib/angular/angular.js",
    "lib/angular/angular-csp.css",
    "lib/angular/angular-animate.js",
    "lib/angular/angular-sanitize.js",
    "lib/jquery/jquery-1.11.3.js",
    "lib/analytics/google-analytics-bundle.js",
    "cars/src/css/main.css",
    "cars/src/js/obfuscatedcars.js",
    "cars/src/js/utilities/ti-logger.js",
    "cars/src/js/utilities/array-extension.js",
    "cars/src/js/utilities/string-extension.js",
    "cars/src/js/utilities/common-utils.js",
];

    self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        })
    );
    })

    self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1')
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );
    });

    self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(async response => {
        let response2;
        if(navigator.onLine) {
            response2 = fetch(event.request).then(response => {
            let statuscode = response.status;
            if(statuscode == 200) {
                caches.open('v1').then(cache => {
                    cache.put(event.request, response.clone());
                });
            }
            return response.clone();
            });
        }
        if(response) {
            return response;
        } else {
            return await response2;
        }
        })
    );
    });

    