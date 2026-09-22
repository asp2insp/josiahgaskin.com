const fs = require('fs');

let dictionary = new Set();
let wordsByLength = {};

function loadDictionary() {
    const text = fs.readFileSync(__dirname + '/words.txt', 'utf-8');
    const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0);
    words.forEach(word => {
        dictionary.add(word);
        const len = word.length;
        if (!wordsByLength[len]) wordsByLength[len] = [];
        wordsByLength[len].push(word);
    });
}

function removeLetters(source, toRemove) {
    const sourceArr = source.split('');
    for (const char of toRemove.split('')) {
        const index = sourceArr.indexOf(char);
        if (index === -1) return null;
        sourceArr.splice(index, 1);
    }
    return sourceArr.join('');
}

function findTwoWordAnagrams(letters) {
    const results = [];
    for (let len1 = 1; len1 < letters.length; len1++) {
        const words1 = wordsByLength[len1] || [];
        for (const word1 of words1) {
            const remaining = removeLetters(letters, word1);
            if (remaining !== null && dictionary.has(remaining)) {
                results.push([word1, remaining].sort().join(' '));
                if (results.length >= 30) return results;
            }
        }
    }
    return results;
}

loadDictionary();
console.log('First 30 two-word anagrams for "fileman":');
console.log('=========================================\n');
const results = findTwoWordAnagrams('fileman');
results.forEach((r, i) => console.log(`  ${i+1}. ${r}`));
