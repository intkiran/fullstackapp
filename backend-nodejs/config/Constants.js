const path = require("path"),
  merge = require("lodash/merge");

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === "test",
      development: process.env.NODE_ENV === "development",
      production: process.env.NODE_ENV === "production"
    };
  },

  version: require("../package.json").version,
  root: path.normalize(__dirname + "/../../.."),
  port: process.env.PORT || 4000,
  ip: process.env.IP || "0.0.0.0",
  apiPrefix: "", // Could be /api/resource or /api/v2/resource
  userRoles: ["guest", "user", "admin"],

  /**
   * MongoDB configuration options
   */
  mongo: {
    seed: true,
    uri: "mongodb://localhost:27017/tm-es-dev",
    options: {
      db: {
        safe: true
      }
    }
  },

  /**
   * Security configuation options regarding sessions, authentication and hashing
   */
  security: {
    sessionSecret: process.env.SESSION_SECRET || "i-am-the-secret-key",
    sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 7, // 1 week
    saltRounds: process.env.SALT_ROUNDS || 12
  }
};

// Environment specific overrides
const environmentConfigs = {
  development: {
    mongo: {
      seed: false,
      uri: process.env.MONGO_URI || "mongodb://localhost:27017/tm-new-es7"
    },
    security: {
      saltRounds: 4
    },
    seedDB: false
  },
  test: {
    port: 5678,
    mongo: {
      uri: process.env.MONGO_URI || "mongodb://localhost/tm-test-es7"
    },
    security: {
      saltRounds: 4
    }
  },
  production: {
    mongo: {
      seed: false,
      uri: process.env.MONGO_URI
    }
  }
};

// Recursively merge configurations
module.exports = merge(
  defaultConfig,
  environmentConfigs[process.env.NODE_ENV] || {}
);
