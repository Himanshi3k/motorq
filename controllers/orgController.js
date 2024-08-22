// controllers/orgController.js
const Org = require('../models/org');

exports.createOrg = async (req, res) => {
    const { name, account, website, fuelReimbursementPolicy, speedLimitPolicy } = req.body;

    // Validation
    if (!name || !account || !website) {
        return res.status(400).send({ error: 'Name, account, and website are required' });
    }

    try {
        const org = new Org({
            name,
            account,
            website,
            fuelReimbursementPolicy: fuelReimbursementPolicy || 1000,
            speedLimitPolicy
        });

        await org.save();
        res.status(201).send(org);
    } catch (error) {
        res.status(400).send({ error: 'Error creating organization' });
    }
};

