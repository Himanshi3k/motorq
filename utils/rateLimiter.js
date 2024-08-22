let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 5;
const RESET_INTERVAL = 60000; // 1 minute

const checkRateLimit = () => {
    if (requestCount < MAX_REQUESTS_PER_MINUTE) {
        requestCount++;
        return true;
    }
    return false;
};

const resetRateLimit = () => {
    setInterval(() => {
        requestCount = 0;
    }, RESET_INTERVAL);
};

// Initialize rate limiter
resetRateLimit();

module.exports = { checkRateLimit };

