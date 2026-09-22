const fs = require('fs');
const path = require('path');

// Load dictionary
let dictionary = new Set();
let wordsByLength = {};

function loadDictionary() {
    const dictionaryPath = path.join(__dirname, 'words.txt');
    const text = fs.readFileSync(dictionaryPath, 'utf-8');
    const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0);

    words.forEach(word => {
        dictionary.add(word);
        const len = word.length;
        if (!wordsByLength[len]) {
            wordsByLength[len] = [];
        }
        wordsByLength[len].push(word);
    });

    console.log(`Dictionary loaded: ${dictionary.size} words\n`);
}

function sortString(str) {
    return str.split('').sort().join('');
}

function removeLetters(source, toRemove) {
    const sourceArr = source.split('');
    const removeArr = toRemove.split('');

    for (const char of removeArr) {
        const index = sourceArr.indexOf(char);
        if (index === -1) {
            return null;
        }
        sourceArr.splice(index, 1);
    }

    return sourceArr.join('');
}

function canMakeWordFromLetters(word, availableLetters) {
    const letterCount = {};

    for (const letter of availableLetters) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

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
    const maxResults = 5000;

    if (!allowPartial) {
        for (let len1 = 1; len1 < letters.length; len1++) {
            const words1 = wordsByLength[len1] || [];

            for (const word1 of words1) {
                const remaining = removeLetters(letters, word1);
                if (remaining !== null && dictionary.has(remaining)) {
                    const pair = [word1, remaining].sort().join(' ');
                    results.add(pair);

                    if (results.size >= maxResults) {
                        return Array.from(results).sort();
                    }
                }
            }
        }
    } else {
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
    const maxCombinations = allowPartial ? 10000 : 50000;
    let combinations = 0;

    if (!allowPartial) {
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
                            const triple = [word1, word2, remaining2].sort().join(' ');
                            results.add(triple);
                        }
                    }
                }
            }
        }
    } else {
        return [];
    }

    return Array.from(results).sort();
}

// Test framework
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    run() {
        console.log('Running tests...\n');
        console.log('='.repeat(80));

        for (const test of this.tests) {
            try {
                test.fn();
                this.passed++;
                console.log(`✓ ${test.name}`);
            } catch (error) {
                this.failed++;
                console.log(`✗ ${test.name}`);
                console.log(`  Error: ${error.message}`);
            }
            console.log('='.repeat(80));
        }

        const total = this.passed + this.failed;
        console.log(`\nTest Summary:`);
        console.log(`Total: ${total} | Passed: ${this.passed} | Failed: ${this.failed}`);

        if (this.failed > 0) {
            process.exit(1);
        }
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Tests
const runner = new TestRunner();

runner.test('Dictionary should be loaded', () => {
    assert(dictionary.size > 0, 'Dictionary is empty');
    assert(dictionary.size > 100000, `Dictionary too small: ${dictionary.size} words`);
});

runner.test('All two-word anagram results for "fileman" should contain only valid dictionary words', () => {
    const results = findTwoWordAnagrams('fileman', false);
    const invalidWords = [];

    for (const result of results) {
        const words = result.split(' ');
        for (const word of words) {
            if (!dictionary.has(word)) {
                invalidWords.push(`"${word}" in "${result}"`);
            }
        }
    }

    if (invalidWords.length > 0) {
        throw new Error(`Found ${invalidWords.length} invalid words in two-word results:\n  ${invalidWords.slice(0, 10).join('\n  ')}${invalidWords.length > 10 ? '\n  ...' : ''}`);
    }
});

runner.test('All three-word anagram results for "fileman" should contain only valid dictionary words', () => {
    const results = findThreeWordAnagrams('fileman', false);
    const invalidWords = [];

    for (const result of results) {
        const words = result.split(' ');
        for (const word of words) {
            if (!dictionary.has(word)) {
                invalidWords.push(`"${word}" in "${result}"`);
            }
        }
    }

    if (invalidWords.length > 0) {
        throw new Error(`Found ${invalidWords.length} invalid words in three-word results:\n  ${invalidWords.slice(0, 10).join('\n  ')}${invalidWords.length > 10 ? '\n  ...' : ''}`);
    }
});

runner.test('All two-word anagram results for "listen" should contain only valid dictionary words', () => {
    const results = findTwoWordAnagrams('listen', false);
    const invalidWords = [];

    for (const result of results) {
        const words = result.split(' ');
        for (const word of words) {
            if (!dictionary.has(word)) {
                invalidWords.push(`"${word}" in "${result}"`);
            }
        }
    }

    if (invalidWords.length > 0) {
        throw new Error(`Found ${invalidWords.length} invalid words:\n  ${invalidWords.slice(0, 10).join('\n  ')}${invalidWords.length > 10 ? '\n  ...' : ''}`);
    }
});

runner.test('All three-word anagram results for "listen" should contain only valid dictionary words', () => {
    const results = findThreeWordAnagrams('listen', false);
    const invalidWords = [];

    for (const result of results) {
        const words = result.split(' ');
        for (const word of words) {
            if (!dictionary.has(word)) {
                invalidWords.push(`"${word}" in "${result}"`);
            }
        }
    }

    if (invalidWords.length > 0) {
        throw new Error(`Found ${invalidWords.length} invalid words:\n  ${invalidWords.slice(0, 10).join('\n  ')}${invalidWords.length > 10 ? '\n  ...' : ''}`);
    }
});

runner.test('Two-word anagrams should use all letters exactly once', () => {
    const results = findTwoWordAnagrams('fileman', false);

    for (const result of results) {
        const words = result.split(' ');
        const combinedLetters = words.join('').split('').sort().join('');
        const originalLetters = 'fileman'.split('').sort().join('');

        if (combinedLetters !== originalLetters) {
            throw new Error(`Result "${result}" doesn't use all letters exactly once. Expected: ${originalLetters}, Got: ${combinedLetters}`);
        }
    }
});

runner.test('Three-word anagrams should use all letters exactly once', () => {
    const results = findThreeWordAnagrams('fileman', false);

    for (const result of results) {
        const words = result.split(' ');
        const combinedLetters = words.join('').split('').sort().join('');
        const originalLetters = 'fileman'.split('').sort().join('');

        if (combinedLetters !== originalLetters) {
            throw new Error(`Result "${result}" doesn't use all letters exactly once. Expected: ${originalLetters}, Got: ${combinedLetters}`);
        }
    }
});

// Run tests
loadDictionary();
runner.run();
