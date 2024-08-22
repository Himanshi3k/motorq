const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const Org = require('../models/org');

// Helper function to validate VIN
const isValidVin = (vin) => /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);

// Create vehicle endpoint
router.post('/', async (req, res) => {
    const { vin, org } = req.body;

    // Validate VIN
    if (!isValidVin(vin)) {
        return res.status(400).send({ error: 'Invalid VIN format' });
    }

    // Validate orgId
    const organization = await Org.findById(org);
    if (!organization) {
        return res.status(400).send({ error: 'Organization not found' });
    }

    try {
        const vehicle = new Vehicle({ vin, org });
        await vehicle.save();
        res.status(201).send(vehicle);
    } catch (error) {
        res.status(400).send({ error: 'Error creating vehicle' });
    }
});

// Get vehicle by VIN
router.get('/:vin', async (req, res) => {
    const { vin } = req.params;
    console.log("hell");

    // Validate VIN
    if (!isValidVin(vin)) {
        return res.status(400).send({ error: 'Invalid VIN format' });
    }

    try {
        const vehicle = await Vehicle.findOne({ vin }).populate('org');
        if (!vehicle) {
            return res.status(404).send({ error: 'Vehicle not found' });
        }
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(400).send({ error: 'Error fetching vehicle' });
    }
});

module.exports = router;






