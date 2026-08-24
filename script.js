// ================================
// Sun City Cookie Consent
// ================================

(function () {
    'use strict';

    var CONSENT_KEY = 'suncity_cookie_consent';
    var GA_MEASUREMENT_ID = 'G-DPZ492X1H2';

    function getConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY);
        } catch (e) {
            return null;
        }
    }

    function saveConsent(value) {
        try {
            localStorage.setItem(CONSENT_KEY, value);
        } catch (e) {
            // If localStorage is unavailable, continue without saving.
        }
    }

    function loadGoogleAnalytics() {
        // Don't load Google Analytics more than once.
        if (window.sunCityAnalyticsLoaded) {
            return;
        }

        window.sunCityAnalyticsLoaded = true;

        window.dataLayer = window.dataLayer || [];

        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());

        window.gtag('config', GA_MEASUREMENT_ID, {
            'anonymize_ip': true
        });

        var script = document.createElement('script');
        script.async = true;
        script.src =
            'https://www.googletagmanager.com/gtag/js?id=' +
            GA_MEASUREMENT_ID;

        document.head.appendChild(script);
    }

    function removeAnalyticsCookies() {
        // Remove common Google Analytics cookies that may already exist.
        var cookies = document.cookie.split(';');

        cookies.forEach(function (cookie) {
            var name = cookie.split('=')[0].trim();

            if (
                name === '_ga' ||
                name.indexOf('_ga_') === 0 ||
                name === '_gid' ||
                name === '_gat'
            ) {
                document.cookie =
                    name +
                    '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' +
                    window.location.hostname;

                document.cookie =
                    name +
                    '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            }
        });
    }

    function createConsentBanner() {
        if (document.getElementById('sun-city-cookie-banner')) {
            return;
        }

        var banner = document.createElement('div');
        banner.id = 'sun-city-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <div class="cookie-consent-inner">
                <div class="cookie-consent-text">
                    <h2>We value your privacy</h2>
                    <p>
                        We use cookies to make our website work and to understand
                        how visitors use it. Optional analytics cookies help us
                        improve the site. You can accept or reject optional cookies.
                    </p>
                </div>

                <div class="cookie-consent-actions">
                    <button type="button" id="cookie-reject" class="cookie-button cookie-button-secondary">
                        Reject optional
                    </button>

                    <button type="button" id="cookie-settings" class="cookie-button cookie-button-secondary">
                        Manage preferences
                    </button>

                    <button type="button" id="cookie-accept" class="cookie-button cookie-button-primary">
                        Accept all
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        document
            .getElementById('cookie-accept')
            .addEventListener('click', function () {
                saveConsent('accepted');
                loadGoogleAnalytics();
                closeBanner();
            });

        document
            .getElementById('cookie-reject')
            .addEventListener('click', function () {
                saveConsent('rejected');
                removeAnalyticsCookies();
                closeBanner();
            });

        document
            .getElementById('cookie-settings')
            .addEventListener('click', function () {
                showPreferences();
            });
    }

    function closeBanner() {
        var banner = document.getElementById('sun-city-cookie-banner');

        if (banner) {
            banner.classList.add('cookie-banner-hidden');
        }

        createCookieSettingsButton();
    }

    function showPreferences() {
        var existing = document.getElementById('sun-city-cookie-preferences');

        if (existing) {
            existing.classList.remove('cookie-preferences-hidden');
            return;
        }

        var preferences = document.createElement('div');
        preferences.id = 'sun-city-cookie-preferences';
        preferences.setAttribute('role', 'dialog');
        preferences.setAttribute('aria-modal', 'true');
        preferences.setAttribute('aria-label', 'Cookie preferences');

        preferences.innerHTML = `
            <div class="cookie-preferences-box">
                <button type="button"
                        class="cookie-close"
                        id="cookie-preferences-close"
                        aria-label="Close cookie preferences">
                    &times;
                </button>

                <h2>Cookie preferences</h2>

                <p>
                    Choose which optional cookies you would like to allow.
                    You can change your choice at any time.
                </p>

                <div class="cookie-preference-row">
                    <div>
                        <strong>Necessary cookies</strong>
                        <p>
                            These are required for the website to function and
                            cannot be switched off.
                        </p>
                    </div>

                    <span class="cookie-always-on">Always on</span>
                </div>

                <div class="cookie-preference-row">
                    <div>
                        <strong>Analytics cookies</strong>
                        <p>
                            These allow us to understand how visitors use the
                            website through Google Analytics.
                        </p>
                    </div>

                    <label class="cookie-switch">
                        <input type="checkbox" id="analytics-consent">
                        <span class="cookie-slider"></span>
                    </label>
                </div>

                <div class="cookie-preference-actions">
                    <button type="button"
                            id="cookie-preferences-save"
                            class="cookie-button cookie-button-primary">
                        Save preferences
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(preferences);

        var currentConsent = getConsent();

        if (currentConsent === 'accepted') {
            document.getElementById('analytics-consent').checked = true;
        }

        document
            .getElementById('cookie-preferences-close')
            .addEventListener('click', function () {
                preferences.classList.add('cookie-preferences-hidden');
            });

        document
            .getElementById('cookie-preferences-save')
            .addEventListener('click', function () {
                var analyticsAllowed =
                    document.getElementById('analytics-consent').checked;

                if (analyticsAllowed) {
                    saveConsent('accepted');
                    loadGoogleAnalytics();
                } else {
                    saveConsent('rejected');
                    removeAnalyticsCookies();
                }

                preferences.classList.add('cookie-preferences-hidden');

                var banner = document.getElementById('sun-city-cookie-banner');

                if (banner) {
                    banner.classList.add('cookie-banner-hidden');
                }

                createCookieSettingsButton();
            });
    }

    function createCookieSettingsButton() {
        if (document.getElementById('cookie-settings-floating')) {
            return;
        }

        var button = document.createElement('button');

        button.id = 'cookie-settings-floating';
        button.type = 'button';
        button.textContent = 'Cookie Settings';
        button.setAttribute('aria-label', 'Open cookie settings');

        button.addEventListener('click', function () {
            showPreferences();
        });

        document.body.appendChild(button);
    }

    function initialiseCookieConsent() {
        var consent = getConsent();

        if (consent === 'accepted') {
            loadGoogleAnalytics();
            createCookieSettingsButton();
            return;
        }

        if (consent === 'rejected') {
            removeAnalyticsCookies();
            createCookieSettingsButton();
            return;
        }

        createConsentBanner();
    }

    // ================================
    // Existing Sun City Links Button
    // ================================

    function initialiseLinksButton() {
        var linksButton = document.getElementById('linksButton');

        if (!linksButton) {
            return;
        }

        linksButton.style.display = 'inline-block';
        linksButton.style.fontSize = '20px';
        linksButton.style.fontWeight = '600';
        linksButton.style.padding = '12px 25px';
        linksButton.style.borderRadius = '30px';
        linksButton.style.backgroundColor = '#000';
        linksButton.style.color = '#fff';
        linksButton.style.textDecoration = 'none';
        linksButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        linksButton.addEventListener('mouseenter', function () {
            linksButton.style.backgroundColor = '#333';
            linksButton.style.transform = 'scale(1.05)';
        });

        linksButton.addEventListener('mouseleave', function () {
            linksButton.style.backgroundColor = '#000';
            linksButton.style.transform = 'scale(1)';
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initialiseCookieConsent();
        initialiseLinksButton();
    });

})();
