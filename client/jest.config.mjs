// jest.config.js or jest.config.mjs
export default {
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    transformIgnorePatterns: ["/node_modules/(?!some-esm-package).+\\.js$"],
    testEnvironment: 'jsdom',
    preset: '@vue/cli-plugin-unit-jest',
    moduleFileExtensions: ['js', 'vue', 'json', 'mjs'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
        '^.+\\.mjs$': 'babel-jest', // Add this if you need to transform .mjs files
    },
    testMatch: ['**/tests/**/*.spec.mjs']
};
