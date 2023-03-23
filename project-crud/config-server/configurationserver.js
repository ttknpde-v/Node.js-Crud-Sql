
    class ConfigurationServer {

        getExpress() {
            const express = require('express');
            return express;
        }

        getApplication() { /* method for set url */
            const application = this.getExpress();
            return application(); /* return object */
        }

    }

    module.exports = ConfigurationServer;


