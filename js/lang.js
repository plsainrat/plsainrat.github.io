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
};