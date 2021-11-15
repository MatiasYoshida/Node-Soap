const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/Header_DOCLIT.xsd', (req, res) => {
    res.sendFile(path.resolve('wsdl/Header_DOCLIT.xsd'));
});

router.get('/MultivasIsMigrated_v1.xsd', (req, res) => {
    res.sendFile(path.resolve('wsdl/MultivasIsMigrated_v1.xsd'));
});

router.get('/MessageFault_DOCLIT.xsd', (req, res) => {
    res.sendFile(path.resolve('wsdl/MessageFault_DOCLIT.xsd'));
});

module.exports = router;

