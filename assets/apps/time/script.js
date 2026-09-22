// Time query resolver using moment.js

const timeQuery = document.getElementById('timeQuery');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');

// Parse natural language time queries
function parseTimeQuery(query) {
    if (!query.trim()) {
        return null;
    }

    const lowerQuery = query.toLowerCase().trim();
    let result = null;

    // Try to parse with moment.js directly first
    // Handle "X [units] ago" format
    const agoMatch = lowerQuery.match(/(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/);
    if (agoMatch) {
        const amount = parseInt(agoMatch[1]);
        const unit = agoMatch[2] + 's';
        result = moment().subtract(amount, unit);
    }

    // Handle "X [units] from now" or "in X [units]" format
    const fromNowMatch = lowerQuery.match(/(?:in\s+)?(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+(?:from\s+now)?/);
    if (!result && fromNowMatch) {
        const amount = parseInt(fromNowMatch[1]);
        const unit = fromNowMatch[2] + 's';
        result = moment().add(amount, unit);
    }

    // Handle special keywords
    if (!result) {
        switch(lowerQuery) {
            case 'now':
            case 'today':
                result = moment();
                break;
            case 'yesterday':
                result = moment().subtract(1, 'days');
                break;
            case 'tomorrow':
                result = moment().add(1, 'days');
                break;
            case 'last week':
                result = moment().subtract(1, 'weeks');
                break;
            case 'next week':
                result = moment().add(1, 'weeks');
                break;
            case 'last month':
                result = moment().subtract(1, 'months');
                break;
            case 'next month':
                result = moment().add(1, 'months');
                break;
            case 'last year':
                result = moment().subtract(1, 'years');
                break;
            case 'next year':
                result = moment().add(1, 'years');
                break;
        }
    }

    // Handle "tomorrow/yesterday at [time]" format
    if (!result && lowerQuery.includes(' at ')) {
        const parts = lowerQuery.split(' at ');
        const dayPart = parts[0].trim();
        const timePart = parts[1].trim();

        let baseDate = null;
        if (dayPart === 'today') {
            baseDate = moment();
        } else if (dayPart === 'tomorrow') {
            baseDate = moment().add(1, 'days');
        } else if (dayPart === 'yesterday') {
            baseDate = moment().subtract(1, 'days');
        }

        if (baseDate) {
            // Parse time (e.g., "3pm", "15:00", "noon")
            if (timePart === 'noon') {
                result = baseDate.hour(12).minute(0).second(0);
            } else if (timePart === 'midnight') {
                result = baseDate.hour(0).minute(0).second(0);
            } else {
                // Try to parse time with moment
                const timeFormats = ['h:mma', 'H:mm', 'ha', 'H'];
                for (const format of timeFormats) {
                    const parsed = moment(timePart, format, true);
                    if (parsed.isValid()) {
                        result = baseDate.hour(parsed.hour()).minute(parsed.minute()).second(0);
                        break;
                    }
                }
            }
        }
    }

    // Try parsing as an absolute date/time
    if (!result) {
        const attemptParse = moment(query);
        if (attemptParse.isValid()) {
            result = attemptParse;
        }
    }

    return result;
}

// Display the result
function displayResult(momentObj) {
    if (!momentObj || !momentObj.isValid()) {
        resultSection.classList.remove('has-result');
        resultContent.innerHTML = '<p class="result-error">Could not parse that time query. Try something like "3 days ago" or "next week".</p>';
        return;
    }

    resultSection.classList.add('has-result');

    const now = moment();
    const fromNow = momentObj.fromNow();
    const diff = momentObj.diff(now);
    const duration = moment.duration(diff);

    let relativeText = fromNow;

    resultContent.innerHTML = `
        <div class="result-date">${momentObj.format('dddd, MMMM D, YYYY')}</div>
        <div class="result-time">${momentObj.format('h:mm:ss A')}</div>
        <div class="result-details">
            <div class="result-detail">
                <div class="detail-label">Relative</div>
                <div class="detail-value">${relativeText}</div>
            </div>
            <div class="result-detail">
                <div class="detail-label">ISO 8601</div>
                <div class="detail-value">${momentObj.format()}</div>
            </div>
            <div class="result-detail">
                <div class="detail-label">Unix Timestamp</div>
                <div class="detail-value">${momentObj.unix()}</div>
            </div>
            <div class="result-detail">
                <div class="detail-label">Day of Year</div>
                <div class="detail-value">${momentObj.dayOfYear()}</div>
            </div>
        </div>
    `;
}

// Handle input changes
timeQuery.addEventListener('input', (e) => {
    const query = e.target.value;
    const result = parseTimeQuery(query);
    displayResult(result);
});

// Handle example button clicks
document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        timeQuery.value = query;
        const result = parseTimeQuery(query);
        displayResult(result);
        timeQuery.focus();
    });
});

// Handle Enter key
timeQuery.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        const result = parseTimeQuery(query);
        displayResult(result);
    }
});
