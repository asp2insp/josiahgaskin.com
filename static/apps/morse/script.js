// Morse code mappings
const morseToChar = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
    '--..': 'Z',
    '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
    '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
    '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'", '-.-.--': '!',
    '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':',
    '-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_',
    '.-..-.': '"', '...-..-': '$', '.--.-.': '@', '/': ' '
};

const charToMorse = Object.fromEntries(
    Object.entries(morseToChar).map(([morse, char]) => [char, morse])
);

// Audio context for playing morse code
let audioContext;
let isPlaying = false;

// DOM elements
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const clearBtn = document.getElementById('clearBtn');
const playBtn = document.getElementById('playBtn');
const copyBtn = document.getElementById('copyBtn');
const visualIndicator = document.getElementById('visualIndicator');

let currentMode = 'encode'; // 'encode' or 'decode'

// Initialize
updatePlaceholders();
populateReferenceTables();
setupTabs();

// Mode switching
encodeBtn.addEventListener('click', () => {
    currentMode = 'encode';
    encodeBtn.classList.add('active');
    decodeBtn.classList.remove('active');
    updatePlaceholders();
});

decodeBtn.addEventListener('click', () => {
    currentMode = 'decode';
    decodeBtn.classList.add('active');
    encodeBtn.classList.remove('active');
    updatePlaceholders();
});

// Translate button
translateBtn.addEventListener('click', () => {
    const input = inputText.value.trim();
    if (!input) {
        alert('Please enter some text to translate');
        return;
    }

    if (currentMode === 'encode') {
        outputText.value = encodeToMorse(input);
    } else {
        outputText.value = decodeFromMorse(input);
    }
});

// Clear button
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    inputText.focus();
});

// Copy button
copyBtn.addEventListener('click', () => {
    if (!outputText.value) {
        alert('Nothing to copy');
        return;
    }
    outputText.select();
    document.execCommand('copy');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
});

// Play audio button
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        alert('Audio is already playing');
        return;
    }

    let morseCode;
    if (currentMode === 'encode') {
        morseCode = outputText.value;
    } else {
        morseCode = inputText.value;
    }

    if (!morseCode) {
        alert('No morse code to play');
        return;
    }

    playMorseAudio(morseCode);
});

// Enter key to translate
inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        translateBtn.click();
    }
});

function updatePlaceholders() {
    if (currentMode === 'encode') {
        inputText.placeholder = 'Enter text to encode (e.g., Hello World)';
        outputText.placeholder = 'Morse code will appear here...';
    } else {
        inputText.placeholder = 'Enter morse code to decode (e.g., .... . .-.. .-.. ---)';
        outputText.placeholder = 'Decoded text will appear here...';
    }
    inputText.value = '';
    outputText.value = '';
}

function encodeToMorse(text) {
    return text
        .toUpperCase()
        .split('')
        .map(char => {
            if (char === ' ') return '/';
            return charToMorse[char] || '';
        })
        .filter(code => code !== '')
        .join(' ');
}

function decodeFromMorse(morse) {
    return morse
        .split(' ')
        .map(code => morseToChar[code] || '')
        .join('');
}

function playMorseAudio(morseCode) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    isPlaying = true;
    playBtn.disabled = true;
    playBtn.innerHTML = '<span class="play-icon">⏸</span> Playing...';

    const ditDuration = 80; // milliseconds
    const dahDuration = ditDuration * 3;
    const symbolGap = ditDuration;
    const letterGap = ditDuration * 3;
    const wordGap = ditDuration * 7;
    const frequency = 600; // Hz

    let currentTime = audioContext.currentTime;

    for (let i = 0; i < morseCode.length; i++) {
        const symbol = morseCode[i];

        if (symbol === '.') {
            playTone(currentTime, ditDuration / 1000, frequency);
            scheduleVisualFeedback(currentTime, ditDuration / 1000);
            currentTime += (ditDuration + symbolGap) / 1000;
        } else if (symbol === '-') {
            playTone(currentTime, dahDuration / 1000, frequency);
            scheduleVisualFeedback(currentTime, dahDuration / 1000);
            currentTime += (dahDuration + symbolGap) / 1000;
        } else if (symbol === ' ') {
            currentTime += letterGap / 1000;
        } else if (symbol === '/') {
            currentTime += wordGap / 1000;
        }
    }

    // Reset playing state after audio finishes
    const totalDuration = (currentTime - audioContext.currentTime) * 1000;
    setTimeout(() => {
        isPlaying = false;
        playBtn.disabled = false;
        playBtn.innerHTML = '<span class="play-icon">▶</span> Play Audio';
    }, totalDuration);
}

function playTone(startTime, duration, frequency) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gainNode.gain.setValueAtTime(0.3, startTime + duration - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function scheduleVisualFeedback(startTime, duration) {
    const delay = (startTime - audioContext.currentTime) * 1000;

    setTimeout(() => {
        visualIndicator.classList.add('active');
    }, delay);

    setTimeout(() => {
        visualIndicator.classList.remove('active');
    }, delay + duration * 1000);
}

function populateReferenceTables() {
    const lettersGrid = document.getElementById('lettersGrid');
    const numbersGrid = document.getElementById('numbersGrid');
    const specialGrid = document.getElementById('specialGrid');

    // Letters A-Z
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i);
        const morse = charToMorse[char];
        if (morse) {
            lettersGrid.appendChild(createReferenceItem(char, morse));
        }
    }

    // Numbers 0-9
    for (let i = 48; i <= 57; i++) {
        const char = String.fromCharCode(i);
        const morse = charToMorse[char];
        if (morse) {
            numbersGrid.appendChild(createReferenceItem(char, morse));
        }
    }

    // Special characters
    const specialChars = ['.', ',', '?', "'", '!', '/', '(', ')', '&', ':', ';', '=', '+', '-', '_', '"', '$', '@'];
    specialChars.forEach(char => {
        const morse = charToMorse[char];
        if (morse) {
            specialGrid.appendChild(createReferenceItem(char, morse));
        }
    });
}

function createReferenceItem(char, morse) {
    const item = document.createElement('div');
    item.className = 'reference-item';

    const charSpan = document.createElement('div');
    charSpan.className = 'reference-char';
    charSpan.textContent = char;

    const morseSpan = document.createElement('div');
    morseSpan.className = 'reference-morse';
    morseSpan.textContent = morse;

    item.appendChild(charSpan);
    item.appendChild(morseSpan);

    return item;
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding tab
            btn.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });
}
