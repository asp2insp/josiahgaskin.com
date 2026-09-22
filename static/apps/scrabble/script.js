// Dictionary management
let dictionary = new Set();
let dictionaryLoaded = false;

// Scrabble letter scores
const LETTER_SCORES = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'S': 1, 'T': 1, 'R': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
};

// Sort mode
let sortByScore = false;

// UI Elements
const lettersInput = document.getElementById('lettersInput');
const patternInput = document.getElementById('patternInput');
const findBtn = document.getElementById('findBtn');
const clearBtn = document.getElementById('clearBtn');
const sortToggle = document.getElementById('sortToggle');
const loadingIndicator = document.getElementById('loadingIndicator');
const searchingIndicator = document.getElementById('searchingIndicator');
const statsDiv = document.getElementById('stats');
const resultsDiv = document.getElementById('results');

// Load dictionary on page load
loadDictionary();

// Event listeners
findBtn.addEventListener('click', findWords);
clearBtn.addEventListener('click', clearInputs);
sortToggle.addEventListener('click', toggleSort);
lettersInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') findWords();
});
patternInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') findWords();
});

// Auto-uppercase inputs
lettersInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z.]/g, '');
});
patternInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z.*]/g, '');
});

// Calculate Scrabble score for a word
function calculateScore(word) {
    let score = 0;
    for (const letter of word) {
        score += LETTER_SCORES[letter] || 0;
    }
    return score;
}

// Toggle sort mode
function toggleSort() {
    sortByScore = !sortByScore;
    sortToggle.textContent = sortByScore ? 'Sort: By Score' : 'Sort: Alphabetical';

    // Re-run search if we have results
    const letters = lettersInput.value.trim().toUpperCase();
    if (letters && resultsDiv.innerHTML && !resultsDiv.innerHTML.includes('welcome-message')) {
        findWords();
    }
}

async function loadDictionary() {
    loadingIndicator.style.display = 'block';
    resultsDiv.style.display = 'none';

    try {
        const response = await fetch('words.txt');
        const text = await response.text();
        const words = text.split('\n').map(w => w.trim().toUpperCase()).filter(w => w.length > 0);

        dictionary = new Set(words);
        dictionaryLoaded = true;

        loadingIndicator.style.display = 'none';
        resultsDiv.style.display = 'block';
        findBtn.disabled = false;

        console.log(`Dictionary loaded: ${dictionary.size} words`);
    } catch (error) {
        loadingIndicator.style.display = 'none';
        resultsDiv.innerHTML = '<div class="welcome-message" style="color: #e74c3c;">Error loading dictionary. Please refresh the page.</div>';
        console.error('Error loading dictionary:', error);
    }
}

function clearInputs() {
    lettersInput.value = '';
    patternInput.value = '';
    statsDiv.style.display = 'none';
    resultsDiv.innerHTML = `
        <div class="welcome-message">
            Enter your letters and optional pattern to find valid Scrabble words!
            <div class="example">
                <strong>Example 1:</strong> Letters: "AEINRST", Pattern: blank → finds all 7-letter words<br>
                <strong>Example 2:</strong> Letters: "EINR", Pattern: "..T.." → finds words with T in 3rd position<br>
                <strong>Example 3:</strong> Letters: "ART", Pattern: "C*" → finds words starting with C (CAR, CART, CARAT, etc.)<br>
                <strong>Example 4:</strong> Letters: "ABC.." → finds words using ABC and 2 blank tiles
            </div>
        </div>
    `;
    lettersInput.focus();
}

function findWords() {
    if (!dictionaryLoaded) {
        alert('Dictionary is still loading. Please wait...');
        return;
    }

    const letters = lettersInput.value.trim().toUpperCase();
    const typedPattern = patternInput.value.trim().toUpperCase();
    // Bare letters read as "anywhere in the word": ING finds RING and SINGER
    // rather than only the three-letter word. Type a . or a * to pin letters
    // to positions instead.
    const pattern = typedPattern && !/[.*]/.test(typedPattern)
        ? `*${typedPattern}*`
        : typedPattern;

    if (!letters) {
        alert('Please enter some letters');
        lettersInput.focus();
        return;
    }

    // Show searching indicator
    searchingIndicator.style.display = 'block';
    statsDiv.style.display = 'none';
    resultsDiv.style.display = 'none';

    // Use setTimeout to allow UI to update
    setTimeout(() => {
        const results = performSearch(letters, pattern);
        displayResults(results, letters, pattern);
    }, 10);
}

function performSearch(availableLetters, pattern) {
    const startTime = performance.now();
    const validWords = [];

    // If no pattern, find all words using available letters
    if (!pattern) {
        for (const word of dictionary) {
            if (canMakeWord(word, availableLetters)) {
                validWords.push(word);
            }
        }
    } else {
        // Find words matching the pattern using available letters plus fixed letters
        const hasWildcard = pattern.includes('*');

        for (const word of dictionary) {
            if (hasWildcard) {
                // Pattern with wildcard - no length check needed
                if (matchesPattern(word, pattern, availableLetters)) {
                    validWords.push(word);
                }
            } else {
                // Pattern without wildcard - must match exact length
                const patternLength = pattern.length;
                if (word.length === patternLength && matchesPattern(word, pattern, availableLetters)) {
                    validWords.push(word);
                }
            }
        }
    }

    const endTime = performance.now();
    const searchTime = (endTime - startTime).toFixed(2);

    // Create word objects with scores
    const wordsWithScores = validWords.map(word => ({
        word,
        score: calculateScore(word)
    }));

    // Sort based on current mode
    if (sortByScore) {
        // Sort by score (descending) then alphabetically
        wordsWithScores.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.word.localeCompare(b.word);
        });
    } else {
        // Sort by length (descending) then alphabetically
        wordsWithScores.sort((a, b) => {
            if (b.word.length !== a.word.length) {
                return b.word.length - a.word.length;
            }
            return a.word.localeCompare(b.word);
        });
    }

    return { words: wordsWithScores, searchTime };
}

function canMakeWord(word, availableLetters) {
    const letterCount = {};
    let blankCount = 0;

    // Count available letters and blanks
    for (const letter of availableLetters) {
        if (letter === '.') {
            blankCount++;
        } else {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
    }

    // Check if word can be made
    for (const letter of word) {
        if (letterCount[letter] && letterCount[letter] > 0) {
            letterCount[letter]--;
        } else if (blankCount > 0) {
            blankCount--;
        } else {
            return false;
        }
    }

    return true;
}

function matchesPattern(word, pattern, availableLetters) {
    // Check if pattern contains wildcards (*)
    if (pattern.includes('*')) {
        return matchesPatternWithWildcard(word, pattern, availableLetters);
    }

    if (word.length !== pattern.length) {
        return false;
    }

    const letterCount = {};
    let blankCount = 0;

    // Count available letters and blanks
    for (const letter of availableLetters) {
        if (letter === '.') {
            blankCount++;
        } else {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
    }

    // Check each position
    for (let i = 0; i < pattern.length; i++) {
        const patternChar = pattern[i];
        const wordChar = word[i];

        if (patternChar === '.') {
            // This position needs to be filled from available letters or blanks
            if (letterCount[wordChar] && letterCount[wordChar] > 0) {
                letterCount[wordChar]--;
            } else if (blankCount > 0) {
                blankCount--;
            } else {
                return false;
            }
        } else {
            // This position has a fixed letter
            if (wordChar !== patternChar) {
                return false;
            }
        }
    }

    return true;
}

function matchesPatternWithWildcard(word, pattern, availableLetters) {
    // Convert pattern to regex: . becomes any char, * becomes zero or more chars
    // Escape special regex chars except . and *
    let regexPattern = pattern.replace(/[[\]{}()+?\\^$|]/g, '\\$&');
    // . matches exactly one character
    regexPattern = regexPattern.replace(/\./g, '.');
    // * matches zero or more characters
    regexPattern = regexPattern.replace(/\*/g, '.*');
    regexPattern = '^' + regexPattern + '$';

    const regex = new RegExp(regexPattern);
    if (!regex.test(word)) {
        return false;
    }

    // Now check if we can make the word with available letters + fixed letters + blanks
    const letterCount = {};
    let blankCount = 0;

    for (const letter of availableLetters) {
        if (letter === '.') {
            blankCount++;
        } else {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
    }

    // Extract fixed letters from pattern (non-. and non-*)
    const fixedLetters = pattern.replace(/[.*]/g, '');

    // Count fixed letters
    const fixedCount = {};
    for (const letter of fixedLetters) {
        fixedCount[letter] = (fixedCount[letter] || 0) + 1;
    }

    // Check if word uses only available + fixed letters + blanks
    const wordCount = {};
    for (const letter of word) {
        wordCount[letter] = (wordCount[letter] || 0) + 1;
    }

    for (const letter in wordCount) {
        const needed = wordCount[letter];
        const available = (letterCount[letter] || 0) + (fixedCount[letter] || 0);
        if (needed > available) {
            // Try to use blanks for the shortfall
            const shortfall = needed - available;
            if (shortfall > blankCount) {
                return false;
            }
            blankCount -= shortfall;
        }
    }

    return true;
}

function displayResults(results, letters, pattern) {
    searchingIndicator.style.display = 'none';
    statsDiv.style.display = 'block';
    resultsDiv.style.display = 'block';

    const { words, searchTime } = results;

    if (words.length === 0) {
        statsDiv.textContent = `No words found in ${searchTime}ms`;
        resultsDiv.innerHTML = `
            <div class="welcome-message" style="color: #e74c3c;">
                No valid words found with the given letters${pattern ? ' and pattern' : ''}.
                <div class="example">
                    Try different letters or adjust your pattern.
                </div>
            </div>
        `;
        return;
    }

    // Display stats
    const patternText = pattern ? ` matching pattern "${pattern}"` : '';
    statsDiv.textContent = `Found ${words.length} word${words.length !== 1 ? 's' : ''}${patternText} in ${searchTime}ms`;

    // Group words by length or score
    let groupedWords = {};
    if (sortByScore) {
        // Group by score
        for (const wordObj of words) {
            const score = wordObj.score;
            if (!groupedWords[score]) {
                groupedWords[score] = [];
            }
            groupedWords[score].push(wordObj);
        }
    } else {
        // Group by length
        for (const wordObj of words) {
            const len = wordObj.word.length;
            if (!groupedWords[len]) {
                groupedWords[len] = [];
            }
            groupedWords[len].push(wordObj);
        }
    }

    // Build results HTML
    let html = '';
    const keys = Object.keys(groupedWords).map(Number).sort((a, b) => b - a);

    for (const key of keys) {
        const wordsInGroup = groupedWords[key];
        const groupLabel = sortByScore ? `${key} Points` : `${key}-Letter Words`;
        html += `
            <div class="word-group">
                <h3>${groupLabel} (${wordsInGroup.length})</h3>
                <div class="word-list">
                    ${wordsInGroup.map(wordObj => `<span class="word-item">${wordObj.word} <span class="word-score">(${wordObj.score})</span></span>`).join('')}
                </div>
            </div>
        `;
    }

    resultsDiv.innerHTML = html;
}

// Focus on input when page loads
window.addEventListener('load', () => {
    lettersInput.focus();
});
