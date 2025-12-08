const i18next = require('i18next');

function initTranslations(req) {
    const languageChain = req.headers['accept-language'] ?? req.headers['Accept-Language'] ?? 'en';

    const sortedLanguage = languageChain
    // en US, en;q=0.9, zh-CN;q=0.8, zh;q=0.7
    .split(/,\s*/)
    // ['en US', 'en;q=0.9', 'zh-CN;q=0.8', 'zh;q=0.7']
    .map(
        (languageItem) => 
            languageItem
             // "en-US" ou "en;q=0.9" ...
             .split(";q=")
             // [ "en-US", "0.9" ] ...
    )
    // [["en-US"], ["en", "0.9"], ["zh-CN", "0.8"], ["zh", "0.7"]]
    .sort((a,b) => {
        a[1] = a[1] !== undefined ? parseFloat(a[1]) : 1;
        b[1] = b[1] !== undefined ? parseFloat(b[1]) : 1;
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return 0;
    });

    const sortedLanguageKeys = sortedLanguage.map
    ((item) => item[0]);

    const [lng, ...fallbackLng] = sortedLanguageKeys;


    i18next.init({
        lng: lng,
        fallbackLng: fallbackLng,
        resources: {
            en: require('../locales/en.json'),
            fr: require('../locales/fr.json'),
        },
    });

    return i18next.t.bind(i18next);

}

module.exports = initTranslations;