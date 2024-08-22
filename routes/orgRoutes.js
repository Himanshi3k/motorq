// routes/orgRoutes.js
const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

router.post('/Orgs', orgController.createOrg);

module.exports = router;

