// ---------------------------------------------------------------------------
// Backend Application for Assessment Report HRD PT. Capella Dinamik Nusantara
// Copyright (c)2023
// ---------------------------------------------------------------------------

const app = require('./app.js');
const port = 8081;
// const {serverLogger} = require('../utils/logger.js');

app.listen(port, () => {
    // serverLogger.info("Server is running");
    console.log('running')
});