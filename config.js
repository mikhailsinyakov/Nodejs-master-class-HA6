/*
 * Config module
 * 
 */

// Create config object
const config = {
    staging: {
        port: 400,
        envName: 'staging'
    },
    production: {
        port: 450,
        envName: 'production'
    }
};

// Determine which config property to export
const environment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV : '';
const environmentToExport = typeof config[environment] == 'object' ? config[environment] : config.staging;


// Export the module
module.exports = environmentToExport;