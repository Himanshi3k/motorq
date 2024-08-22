// controllers/vehicleController.js
const Vehicle = require('../models/vehicle');
const Org = require('../models/org');

exports.addVehicle = async (req, res) => {
    const { vin, org } = req.body;

    // Validate VIN
    if (!vin || vin.length !== 17 || !/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
        return res.status(400).send({ error: 'Invalid VIN' });
    }

    // Validate organization
    if (!org) {
        return res.status(400).send({ error: 'Organization ID is required' });
    }

    try {
        const organization = await Org.findById(org);
        if (!organization) {
            return res.status(400).send({ error: 'Organization not found' });
        }

        // Create and save the vehicle
        const vehicle = new Vehicle({ vin, org });
        await vehicle.save();

        res.status(201).send(vehicle);
    } catch (error) {
        res.status(400).send({ error: 'Error adding vehicle' });
    }
};

