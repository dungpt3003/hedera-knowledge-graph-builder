"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitIgnore = void 0;
const getGitIgnore = () => {
    return `# Graph CLI generated artifacts
build/
generated/

# Dependency directories
node_modules/
jspm_packages/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# dotenv environment variables file
.env

# Testing
coverage
coverage.json

# Typechain
typechain
typechain-types

# Hardhat files
cache
`;
};
exports.getGitIgnore = getGitIgnore;
