// Global variables
let dictionary = new Set();
let wordsByLength = {};
let isLoading = true;

// DOM elements
const lettersInput = document.getElementById('lettersInput');
const partialMatchCheckbox = document.getElementById('partialMatchCheckbox');
const findBtn = document.getElementById('findBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsDiv = document.getElementById('results');
const statsDiv = document.getElementById('stats');
const loadingIndicator = document.getElementById('loadingIndicator');
const searchingIndicator = document.getElementById('searchingIndicator');

// Load dictionary on page load
loadDictionary();

// Event listeners
findBtn.addEventListener('click', findAnagrams);
clearBtn.addEventListener('click', clearInput);
lettersInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        findAnagrams();
    }
});

// Only allow letters in input
lettersInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
});

async function loadDictionary() {
    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch('words.txt');
        const text = await response.text();
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0);

        // Store words in set for fast lookup
        words.forEach(word => {
            dictionary.add(word);

            // Also organize by length for optimization
            const len = word.length;
            if (!wordsByLength[len]) {
                wordsByLength[len] = [];
            }
            wordsByLength[len].push(word);
        });

        isLoading = false;
        loadingIndicator.style.display = 'none';
        console.log(`Dictionary loaded: ${dictionary.size} words`);
    } catch (error) {
        loadingIndicator.innerHTML = '<p style="color: red;">Error loading dictionary. Please refresh the page.</p>';
        console.error('Error loading dictionary:', error);
    }
}

function clearInput() {
    lettersInput.value = '';
    partialMatchCheckbox.checked = false;
    resultsDiv.innerHTML = `
        <div class="welcome-message">
            Enter some letters above to find anagrams!
            <div class="example">
                <strong>Example:</strong> "listen" will find "silent", "enlist", and more!
            </div>
        </div>
    `;
    statsDiv.innerHTML = '';
    lettersInput.focus();
}

function findAnagrams() {
    if (isLoading) {
        alert('Please wait for the dictionary to load...');
        return;
    }

    const letters = lettersInput.value.toLowerCase().trim();

    if (letters.length < 2) {
        alert('Please enter at least 2 letters');
        return;
    }

    searchingIndicator.style.display = 'block';
    resultsDiv.innerHTML = '';
    statsDiv.innerHTML = '';

    // Use setTimeout to allow UI to update
    setTimeout(() => {
        const startTime = performance.now();
        const allowPartial = partialMatchCheckbox.checked;

        const oneWordAnagrams = findOneWordAnagrams(letters, allowPartial);
        const twoWordAnagrams = findTwoWordAnagrams(letters, allowPartial);
        const threeWordAnagrams = findThreeWordAnagrams(letters, allowPartial);

        const endTime = performance.now();
        const searchTime = ((endTime - startTime) / 1000).toFixed(2);

        searchingIndicator.style.display = 'none';
        displayResults(oneWordAnagrams, twoWordAnagrams, threeWordAnagrams, searchTime);
    }, 100);
}

function findOneWordAnagrams(letters, allowPartial = false) {
    const results = [];

    if (!allowPartial) {
        // Exact match - all letters must be used
        const sortedLetters = sortString(letters);
        const candidates = wordsByLength[letters.length] || [];

        for (const word of candidates) {
            if (sortString(word) === sortedLetters) {
                results.push(word);
            }
        }
    } else {
        // Partial match - find all words that can be made from available letters
        for (let len = 2; len <= letters.length; len++) {
            const candidates = wordsByLength[len] || [];

            for (const word of candidates) {
                if (canMakeWordFromLetters(word, letters)) {
                    results.push(word);
                }
            }
        }
    }

    return results.sort();
}

function canMakeWordFromLetters(word, availableLetters) {
    const letterCount = {};

    // Count available letters
    for (const letter of availableLetters) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // Check if word can be made
    for (const letter of word) {
        if (!letterCount[letter] || letterCount[letter] === 0) {
            return false;
        }
        letterCount[letter]--;
    }

    return true;
}

function findTwoWordAnagrams(letters, allowPartial = false) {
    const results = new Set();
    const maxResults = 5000; // Limit results to prevent browser freeze

    if (!allowPartial) {
        // Exact match - all letters must be used
        for (let len1 = 1; len1 < letters.length; len1++) {
            const words1 = wordsByLength[len1] || [];

            for (const word1 of words1) {
                const remaining = removeLetters(letters, word1);
                if (remaining !== null && dictionary.has(remaining)) {
                    // Sort the two words alphabetically for consistent display
                    const pair = [word1, remaining].sort().join(' ');
                    results.add(pair);

                    if (results.size >= maxResults) {
                        return Array.from(results).sort();
                    }
                }
            }
        }
    } else {
        // Partial match - find pairs that use subset of letters
        for (let len1 = 1; len1 <= letters.length - 1; len1++) {
            const words1 = wordsByLength[len1] || [];

            for (const word1 of words1) {
                if (!canMakeWordFromLetters(word1, letters)) continue;

                const remaining = removeLetters(letters, word1);
                if (remaining === null) continue;

                for (let len2 = 1; len2 <= remaining.length; len2++) {
                    const words2 = wordsByLength[len2] || [];

                    for (const word2 of words2) {
                        if (canMakeWordFromLetters(word2, remaining)) {
                            const pair = [word1, word2].sort().join(' ');
                            results.add(pair);

                            if (results.size >= maxResults) {
                                return Array.from(results).sort();
                            }
                        }
                    }
                }
            }
        }
    }

    return Array.from(results).sort();
}

function findThreeWordAnagrams(letters, allowPartial = false) {
    const results = new Set();
    const maxCombinations = allowPartial ? 10000 : 50000; // Lower limit for partial to prevent freeze
    let combinations = 0;

    if (!allowPartial) {
        // Exact match - all letters must be used
        for (let len1 = 1; len1 < letters.length - 1; len1++) {
            const words1 = wordsByLength[len1] || [];

            for (const word1 of words1) {
                const remaining1 = removeLetters(letters, word1);
                if (remaining1 === null) continue;

                for (let len2 = 1; len2 < remaining1.length; len2++) {
                    const words2 = wordsByLength[len2] || [];

                    for (const word2 of words2) {
                        combinations++;
                        if (combinations > maxCombinations) {
                            console.log('Reached max combinations limit for 3-word anagrams');
                            return Array.from(results).sort();
                        }

                        const remaining2 = removeLetters(remaining1, word2);
                        if (remaining2 !== null && dictionary.has(remaining2)) {
                            // Sort the three words alphabetically for consistent display
                            const triple = [word1, word2, remaining2].sort().join(' ');
                            results.add(triple);
                        }
                    }
                }
            }
        }
    } else {
        // Partial match - disabled for performance
        // Three-word partial matching would generate too many results
        console.log('Three-word partial matching disabled for performance');
        return [];
    }

    return Array.from(results).sort();
}

function sortString(str) {
    return str.split('').sort().join('');
}

function removeLetters(source, toRemove) {
    // Try to remove letters of toRemove from source
    // Return remaining letters if successful, null if not possible
    const sourceArr = source.split('');
    const removeArr = toRemove.split('');

    for (const char of removeArr) {
        const index = sourceArr.indexOf(char);
        if (index === -1) {
            return null; // Character not found
        }
        sourceArr.splice(index, 1);
    }

    return sourceArr.join('');
}

function displayResults(oneWord, twoWord, threeWord, searchTime) {
    const totalResults = oneWord.length + twoWord.length + threeWord.length;

    if (totalResults === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                No anagrams found for "${lettersInput.value}"
                <br><br>
                Try different letters or fewer letters.
            </div>
        `;
        statsDiv.innerHTML = `Searched in ${searchTime} seconds`;
        return;
    }

    statsDiv.innerHTML = `
        Found ${totalResults} anagram${totalResults === 1 ? '' : 's'} in ${searchTime} seconds
        (${oneWord.length} single word, ${twoWord.length} two-word, ${threeWord.length} three-word)
    `;

    let html = '';

    if (oneWord.length > 0) {
        html += `
            <div class="anagram-section">
                <h2>Single Words (${oneWord.length})</h2>
                <div class="anagram-list">
                    ${oneWord.map(word => `<div class="anagram-item">${word}</div>`).join('')}
                </div>
            </div>
        `;
    }

    if (twoWord.length > 0) {
        html += `
            <div class="anagram-section">
                <h2>Two Words (${twoWord.length})</h2>
                <div class="anagram-list">
                    ${twoWord.map(words => `<div class="anagram-item">${words}</div>`).join('')}
                </div>
            </div>
        `;
    }

    if (threeWord.length > 0) {
        html += `
            <div class="anagram-section">
                <h2>Three Words (${threeWord.length})</h2>
                <div class="anagram-list">
                    ${threeWord.map(words => `<div class="anagram-item">${words}</div>`).join('')}
                </div>
            </div>
        `;
    }

    resultsDiv.innerHTML = html;
}

// Auto-focus input on load
window.addEventListener('load', () => {
    if (!isLoading) {
        lettersInput.focus();
    }
});
