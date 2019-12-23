module.exports = {
    verbose: true,
    globals: {
        NODE_ENV: 'test'
    },
    setupFiles: ['./setupTests.js'],
    testEnvironment: 'node',
    testMatch: ['**/*.spec.js', '**/*.spec.e2e.js']
};
