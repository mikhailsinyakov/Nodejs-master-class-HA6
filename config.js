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

const environment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV : '';
const environmentToExport = typeof config[environment] == 'object' ? config[environment] : config.staging;

module.exports = environmentToExport;