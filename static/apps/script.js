// Apps configuration
const apps = [
    {
        title: 'Braille Decoder',
        icon: '⠃',
        description: 'Interactive braille letter decoder with clickable dot patterns',
        url: 'braille/'
    },
    {
        title: 'Anagram Finder',
        icon: '🔤',
        description: 'Find all possible anagrams from any set of letters',
        url: 'anagrams/'
    },
    {
        title: 'Morse Code Translator',
        icon: '📡',
        description: 'Encode and decode morse code with audio playback',
        url: 'morse/'
    },
    {
        title: 'Who\'s On First',
        icon: '🎮',
        description: 'Touch-based turn picker game with score tracking',
        url: 'whosonfirst/'
    },
    {
        title: 'Scrabble Word Finder',
        icon: '🎲',
        description: 'Find valid Scrabble words with pattern matching',
        url: 'scrabble/'
    },
    {
        title: 'Password Generator',
        icon: '🔐',
        description: 'Generate secure passwords and memorable passphrases',
        url: 'pwgen/'
    },
    {
        title: 'Time Query Resolver',
        icon: '⏰',
        description: 'Natural language time queries resolved instantly',
        url: 'time/'
    }
];

// Generate app cards
function generateAppCards() {
    const grid = document.getElementById('appsGrid');

    apps.forEach(app => {
        const card = document.createElement('a');
        card.className = 'app-card';
        card.href = app.url;

        card.innerHTML = `
            <div class="app-icon">${app.icon}</div>
            <h2 class="app-title">${app.title}</h2>
            <p class="app-description">${app.description}</p>
        `;

        grid.appendChild(card);
    });
}

// Initialize
generateAppCards();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const cards = document.querySelectorAll('.app-card');
    const focused = document.activeElement;
    const index = Array.from(cards).indexOf(focused);

    if (index === -1) return;

    let nextIndex = index;

    switch(e.key) {
        case 'ArrowRight':
            nextIndex = (index + 1) % cards.length;
            break;
        case 'ArrowLeft':
            nextIndex = (index - 1 + cards.length) % cards.length;
            break;
        case 'ArrowDown':
            nextIndex = Math.min(index + 3, cards.length - 1);
            break;
        case 'ArrowUp':
            nextIndex = Math.max(index - 3, 0);
            break;
        default:
            return;
    }

    e.preventDefault();
    cards[nextIndex].focus();
});

// Add focus to first card for keyboard navigation
window.addEventListener('load', () => {
    const firstCard = document.querySelector('.app-card');
    if (firstCard) {
        firstCard.setAttribute('tabindex', '0');

        // Add tabindex to all other cards
        document.querySelectorAll('.app-card').forEach((card, index) => {
            if (index > 0) {
                card.setAttribute('tabindex', '0');
            }
        });
    }
});
