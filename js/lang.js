/* ----------------------------------
Changement de Language du Site web
-------------------------------------*/

function updateContent(langData){
    document.querySelectorAll("[data-i18n]").forEach(Element => {
        const key = Element.getAttribute('data-i18n').split('.').reduce((obj, i) => obj[i],langData);
        //console.log(langData)
        //console.log(Element.getAttribute('data-i18n').split('.'));
        //console.log(key);
        if(key){
            Element.innerHTML = key;
        }
    });
}

function setLanguagePreference(lang){
    localStorage.setItem('language', lang);
}

async function fetchLanguageData(lang){
    console.log('./i18n/'+lang+'.json');
    const reponse = await fetch('./i18n/'+lang+'.json');
    return reponse.json();
}

async function changeLanguage(lang){
    await setLanguagePreference(lang);
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

window.onload = function(){
    const userSavedLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(userSavedLanguage);
    var paths = document.querySelectorAll('.st0');

    [].forEach.call(paths, function(path) {
    var length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
        'none';
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 2s ease-in-out';
    // Go!
    path.style.strokeDashoffset = '0';
    })
};

