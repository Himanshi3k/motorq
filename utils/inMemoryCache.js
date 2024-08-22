const axios = require('axios');
const { checkRateLimit } = require('./rateLimiter');

const decodeCache = {};

const decodeVin = async (vin) => {
    // Check if the VIN is in cache and valid
    if (decodeCache[vin] && Date.now() - decodeCache[vin].timestamp < 60000) {
        return decodeCache[vin].data;
    }

    if (!checkRateLimit()) {
        throw new Error('Rate limit exceeded');
    }

    try {
        // Fetch data from NHTSA API
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
        const { Make, Model, ModelYear } = response.data.Results[0];

        // Cache the result
        const vehicleData = {
            manufacturer: Make,
            model: Model,
            year: ModelYear
        };
        decodeCache[vin] = { data: vehicleData, timestamp: Date.now() };

        return vehicleData;
    } catch (error) {
        throw new Error('Error fetching VIN data from NHTSA');
    }
};

module.exports = { decodeVin, decodeCache };
