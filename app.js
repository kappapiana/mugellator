let conversionFactor = null;

// Translation object
const translations = {
    'en': {
        pageTitle: 'Track Time Converter',
        appTitle: 'Mugellator',
        selectLanguage: 'Select Language:',
        section1Heading: 'Converts Mugello times to any other track',
        section1Text1: 'You need to know the reference times of a reliable rider on both tracks',
        section1Text2: 'Enter the reference times (minutes and seconds) for Mugello and the unknown track to calculate the conversion factor.',
        section1Text3: 'For example: Canepa laps Mugello in 1:50 and Spa in 2:21. Enter 1:50 in Reference Time Mugello and 2:21 in Reference Time New Track and calculate the conversion factor.',
        section1Text4: 'Seconds can be entered as decimals with a dot or comma (e.g.: 7 seconds and two tenths = 7.2)',
        calculateFactorHeading: '1. Calculate Conversion Factor',
        refTimeMugello: 'Reference Time <strong>Mugello</strong>:',
        refTimeNewTrack: 'Reference Time <strong>New Track</strong>:',
        calculateFactorButton: 'Calculate Factor',
        conversionFactorResult: 'Conversion Factor: N/A',
        minLabel: 'Minutes:',
        secLabel: 'Seconds:',
        invalidTimeError: 'Please enter valid minutes and seconds (seconds from 0 to 59.99).',
        mustBePositiveError: 'Reference times must be greater than zero.',
        convertTimesHeading: '2. Convert Times',
        convertTimesIntro: 'After calculating the conversion factor, you can convert times between the two tracks.',
        newToMugelloHeading: 'From <strong>New Track</strong> to <strong>Mugello</strong>',
        inputNewTrackTime: 'New Track Time:',
        convertNewToMugelloButton: 'Convert New Track &rarr; Mugello',
        outputAMugello: 'Mugello Time: N/A',
        mugelloToNewHeading: 'From <strong>Mugello</strong> to <strong>New Track</strong>',
        inputMugelloTime: 'Mugello Time:',
        convertMugelloToNewButton: 'Convert Mugello &rarr; New Track',
        outputBNewTrack: 'New Track Time: N/A',
        calculateFactorFirstError: 'Calculate the conversion factor first.',
        noteText: '<strong>Note:</strong> I used Mugello because Mugello is the rider\'s benchmark. In reality, you can use any pair of times that you consider indicative.',
        githubLink: 'Contribute to improve and mercilessly fork it on <a href="https://github.com/kappapiana/mugellator/tree/main">github</a>',
        clearButton: 'Clear'
    },
    'it': {
        pageTitle: 'Convertitore Tempi Pista',
        appTitle: 'Mugellatore',
        selectLanguage: 'Seleziona lingua:',
        section1Heading: 'Converte i tempi del Mugello in qualsiasi altra pista',
        section1Text1: 'Devi conoscere i tempi di riferimento di un pilota affidabile su entrambe le piste',
        section1Text2: 'Inserisci i tempi di riferimento (minuti e secondi) di un tempo per il <strong>Mugello</strong> e la Pista sconosciuta per calcolare il fattore di conversione.',
        section1Text3: 'Ad esempio: Canepa gira in 1:50 al Mugello e 2:21 a Spa. Inserisci 1:50 in Tempo di Riferimento Mugello e 2:21 in Tempo di riferimento Nuova Pista e calcola il fattore di conversione.',
        section1Text4: 'I secondi possono essere inseriti come decimali con il punto o con la virgola (es: 7 secondi e due decimi = 7.2)',
        calculateFactorHeading: '1. Calcola il Fattore di Conversione',
        refTimeMugello: 'Tempo di Riferimento <strong>Mugello</strong>:',
        refTimeNewTrack: 'Tempo di Riferimento <strong>Nuova Pista</strong>:',
        calculateFactorButton: 'Calcola Fattore',
        conversionFactorResult: 'Fattore di Conversione: N/A',
        minLabel: 'Minuti:',
        secLabel: 'Secondi:',
        invalidTimeError: 'Inserisci minuti e secondi validi (secondi da 0 a 59.99).',
        mustBePositiveError: 'I tempi di riferimento devono essere maggiori di zero.',
        convertTimesHeading: '2. Converti Tempi',
        convertTimesIntro: 'Dopo aver calcolato il fattore di conversione, puoi convertire i tempi tra le due piste.',
        newToMugelloHeading: 'Da <strong>Nuova Pista</strong> a <strong>Mugello</strong>',
        inputNewTrackTime: 'Tempo Nuova Pista:',
        convertNewToMugelloButton: 'Converti Nuova Pista &rarr; Mugello',
        outputAMugello: 'Tempo Mugello: N/A',
        mugelloToNewHeading: 'Da <strong>Mugello</strong> a <strong>Nuova Pista</strong>',
        inputMugelloTime: 'Tempo Mugello:',
        convertMugelloToNewButton: 'Converti Mugello &rarr; Nuova Pista',
        outputBNewTrack: 'Tempo Nuova Pista: N/A',
        calculateFactorFirstError: 'Calcola prima il fattore di conversione.',
        noteText: '<strong>Nota:</strong> Ho usato il Mugello perché il Mugello è il metro del pilota. In realtà, si può usare una qualsiasi coppia di tempi che si ritengono indicativi.',
        githubLink: 'Contribute to improve and mercilessly fork it on <a href="https://github.com/kappapiana/mugellator/tree/main">github</a>',
        clearButton: 'Cancella'
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const text = translations[lang] && translations[lang][key];
        if (text) {
            if (key === 'pageTitle') {
                document.title = text;
            } else if (text.includes('<') || text.includes('&')) {
                element.innerHTML = text;
            } else {
                element.innerText = text;
            }
        }
    });

    const currentLang = document.getElementById('language-select').value;
    if (conversionFactor === null) {
        document.getElementById('fattoreConversion').innerText = translations[currentLang].conversionFactorResult;
    } else {
        document.getElementById('fattoreConversion').innerText = `${translations[currentLang].conversionFactorResult.split(':')[0]}: ${conversionFactor.toFixed(4)}`;
    }
    document.getElementById('outputA').innerText = translations[currentLang].outputAMugello;
    document.getElementById('outputB').innerText = translations[currentLang].outputBNewTrack;

    clearErrors();
}

const ALL_INPUT_IDS = ['refMinA', 'refSecA', 'refMinB', 'refSecB', 'inputMinA', 'inputSecA', 'inputMinB', 'inputSecB'];

function clearErrors() {
    document.getElementById('errorRefA').innerText = '';
    document.getElementById('errorRefB').innerText = '';
    document.getElementById('errorFattore').innerText = '';
    document.getElementById('errorInputA').innerText = '';
    document.getElementById('errorInputB').innerText = '';
    ALL_INPUT_IDS.forEach(id => setInputInvalid(id, false));
}

function setInputInvalid(inputId, invalid) {
    const input = document.getElementById(inputId);
    if (input) {
        input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    }
}

function parseSeconds(value) {
    return parseFloat(String(value).replace(',', '.'));
}

function isValidTime(minId, secId, errorId) {
    const minutes = parseInt(document.getElementById(minId).value, 10);
    const seconds = parseSeconds(document.getElementById(secId).value);
    const currentLang = document.getElementById('language-select').value;

    const valid = !(isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60);
    setInputInvalid(minId, !valid);
    setInputInvalid(secId, !valid);

    if (!valid) {
        document.getElementById(errorId).innerText = translations[currentLang].invalidTimeError;
        return false;
    }
    return true;
}

function formatTimeCompact(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toFixed(2).padStart(5, '0')}`;
}

function calcolaFattore() {
    clearErrors();
    const currentLang = document.getElementById('language-select').value;

    if (!isValidTime('refMinA', 'refSecA', 'errorRefA') || !isValidTime('refMinB', 'refSecB', 'errorRefB')) {
        return;
    }

    const refMinA = parseInt(document.getElementById('refMinA').value, 10);
    const refSecA = parseSeconds(document.getElementById('refSecA').value);
    const refMinB = parseInt(document.getElementById('refMinB').value, 10);
    const refSecB = parseSeconds(document.getElementById('refSecB').value);

    const timeA_seconds = refMinA * 60 + refSecA;
    const timeB_seconds = refMinB * 60 + refSecB;

    if (timeA_seconds <= 0 || timeB_seconds <= 0) {
        document.getElementById('errorFattore').innerText = translations[currentLang].mustBePositiveError;
        conversionFactor = null;
        document.getElementById('fattoreConversion').innerText = translations[currentLang].conversionFactorResult;
        saveToStorage();
        return;
    }

    conversionFactor = timeB_seconds / timeA_seconds;
    document.getElementById('fattoreConversion').innerText = `${translations[currentLang].conversionFactorResult.split(':')[0]}: ${conversionFactor.toFixed(4)}`;
    saveToStorage();
}

function convertiBtoA() {
    clearErrors();
    const currentLang = document.getElementById('language-select').value;

    if (conversionFactor === null) {
        document.getElementById('errorInputB').innerText = translations[currentLang].calculateFactorFirstError;
        return;
    }

    if (!isValidTime('inputMinB', 'inputSecB', 'errorInputB')) {
        return;
    }

    const inputMinB = parseInt(document.getElementById('inputMinB').value, 10);
    const inputSecB = parseSeconds(document.getElementById('inputSecB').value);

    const timeB_seconds = inputMinB * 60 + inputSecB;
    const convertedTimeA_seconds = timeB_seconds / conversionFactor;

    document.getElementById('outputA').innerText = `${translations[currentLang].outputAMugello.split(':')[0]}: ${formatTimeCompact(convertedTimeA_seconds)}`;
}

function convertiAtoB() {
    clearErrors();
    const currentLang = document.getElementById('language-select').value;

    if (conversionFactor === null) {
        document.getElementById('errorInputA').innerText = translations[currentLang].calculateFactorFirstError;
        return;
    }

    if (!isValidTime('inputMinA', 'inputSecA', 'errorInputA')) {
        return;
    }

    const inputMinA = parseInt(document.getElementById('inputMinA').value, 10);
    const inputSecA = parseSeconds(document.getElementById('inputSecA').value);

    const timeA_seconds = inputMinA * 60 + inputSecA;
    const convertedTimeB_seconds = timeA_seconds * conversionFactor;

    document.getElementById('outputB').innerText = `${translations[currentLang].outputBNewTrack.split(':')[0]}: ${formatTimeCompact(convertedTimeB_seconds)}`;
}

function clearAll() {
    conversionFactor = null;
    clearErrors();
    document.getElementById('refMinA').value = 0;
    document.getElementById('refSecA').value = 0;
    document.getElementById('refMinB').value = 0;
    document.getElementById('refSecB').value = 0;
    document.getElementById('inputMinA').value = 0;
    document.getElementById('inputSecA').value = 0;
    document.getElementById('inputMinB').value = 0;
    document.getElementById('inputSecB').value = 0;

    const currentLang = document.getElementById('language-select').value;
    document.getElementById('fattoreConversion').innerText = translations[currentLang].conversionFactorResult;
    document.getElementById('outputA').innerText = translations[currentLang].outputAMugello;
    document.getElementById('outputB').innerText = translations[currentLang].outputBNewTrack;

    ALL_INPUT_IDS.forEach(id => setInputInvalid(id, false));

    saveToStorage();
}

const STORAGE_KEY = 'mugellator';
const STORAGE_LANG_KEY = 'mugellator-lang';

function saveToStorage() {
    try {
        const data = {
            conversionFactor,
            refMinA: document.getElementById('refMinA').value,
            refSecA: document.getElementById('refSecA').value,
            refMinB: document.getElementById('refMinB').value,
            refSecB: document.getElementById('refSecB').value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        // Ignore storage errors
    }
}

function loadFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.conversionFactor != null && data.conversionFactor > 0) {
                conversionFactor = data.conversionFactor;
                document.getElementById('refMinA').value = data.refMinA ?? 0;
                document.getElementById('refSecA').value = data.refSecA ?? 0;
                document.getElementById('refMinB').value = data.refMinB ?? 0;
                document.getElementById('refSecB').value = data.refSecB ?? 0;
            }
        }
    } catch (e) {
        // Ignore
    }
}

function setupEnterKeyHandlers() {
    const factorInputs = ['refMinA', 'refSecA', 'refMinB', 'refSecB'];
    const convertBInputs = ['inputMinB', 'inputSecB'];
    const convertAInputs = ['inputMinA', 'inputSecA'];

    factorInputs.forEach(id => {
        document.getElementById(id).addEventListener('keydown', (e) => {
            if (e.key === 'Enter') calcolaFattore();
        });
    });
    convertBInputs.forEach(id => {
        document.getElementById(id).addEventListener('keydown', (e) => {
            if (e.key === 'Enter') convertiBtoA();
        });
    });
    convertAInputs.forEach(id => {
        document.getElementById(id).addEventListener('keydown', (e) => {
            if (e.key === 'Enter') convertiAtoB();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem(STORAGE_LANG_KEY);
    const userLang = navigator.language.split('-')[0];
    const initialLang = storedLang && translations[storedLang]
        ? storedLang
        : (translations[userLang] ? userLang : 'it');

    document.getElementById('language-select').value = initialLang;
    loadFromStorage();
    setLanguage(initialLang);
    setupEnterKeyHandlers();

    document.getElementById('language-select').addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem(STORAGE_LANG_KEY, lang);
        setLanguage(lang);
    });
});
