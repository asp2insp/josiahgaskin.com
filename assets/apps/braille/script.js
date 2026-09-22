// Braille patterns mapping (dots 1-6 correspond to positions in the cell)
// Pattern is represented as a 6-character binary string where 1 = raised dot
const brailleMap = {
    '100000': 'A',
    '110000': 'B',
    '100100': 'C',
    '100110': 'D',
    '100010': 'E',
    '110100': 'F',
    '110110': 'G',
    '110010': 'H',
    '010100': 'I',
    '010110': 'J',
    '101000': 'K',
    '111000': 'L',
    '101100': 'M',
    '101110': 'N',
    '101010': 'O',
    '111100': 'P',
    '111110': 'Q',
    '111010': 'R',
    '011100': 'S',
    '011110': 'T',
    '101001': 'U',
    '111001': 'V',
    '010111': 'W',
    '101101': 'X',
    '101111': 'Y',
    '101011': 'Z',
    '000000': ' '
};

// Current state of dots (1-6)
const dotState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
};

// Get DOM elements
const dots = document.querySelectorAll('.dot');
const letterDisplay = document.getElementById('letterDisplay');
const clearBtn = document.getElementById('clearBtn');
const referenceGrid = document.getElementById('referenceGrid');

// Initialize dot click handlers
dots.forEach(dot => {
    const position = parseInt(dot.dataset.position);

    dot.addEventListener('click', () => {
        dotState[position] = !dotState[position];
        dot.classList.toggle('active');
        updateLetterDisplay();
    });
});

// Clear button handler
clearBtn.addEventListener('click', () => {
    Object.keys(dotState).forEach(key => {
        dotState[key] = false;
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    updateLetterDisplay();
});

// Update the letter display based on current dot pattern
function updateLetterDisplay() {
    const pattern = getDotPattern();
    const letter = brailleMap[pattern] || '?';
    letterDisplay.textContent = letter;

    // Add animation
    letterDisplay.style.transform = 'scale(0.9)';
    setTimeout(() => {
        letterDisplay.style.transform = 'scale(1)';
    }, 100);
}

// Get current dot pattern as binary string
function getDotPattern() {
    return Object.keys(dotState)
        .map(key => dotState[key] ? '1' : '0')
        .join('');
}

// Create reference grid
function createReferenceGrid() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    alphabet.split('').forEach(letter => {
        // Find the pattern for this letter
        const pattern = Object.keys(brailleMap).find(
            key => brailleMap[key] === letter
        );

        if (pattern) {
            const item = document.createElement('div');
            item.className = 'reference-item';

            const letterSpan = document.createElement('div');
            letterSpan.className = 'reference-letter';
            letterSpan.textContent = letter;

            const brailleDiv = document.createElement('div');
            brailleDiv.className = 'reference-braille';

            // Create two columns of dots
            for (let col = 0; col < 2; col++) {
                const column = document.createElement('div');
                column.className = 'reference-column';

                for (let row = 0; row < 3; row++) {
                    const dotIndex = col * 3 + row;
                    const refDot = document.createElement('div');
                    refDot.className = 'reference-dot';

                    if (pattern[dotIndex] === '1') {
                        refDot.classList.add('active');
                    }

                    column.appendChild(refDot);
                }

                brailleDiv.appendChild(column);
            }

            item.appendChild(letterSpan);
            item.appendChild(brailleDiv);
            referenceGrid.appendChild(item);
        }
    });
}

// Initialize
updateLetterDisplay();
createReferenceGrid();

// Add smooth transition to letter display
letterDisplay.style.transition = 'transform 0.1s ease';
