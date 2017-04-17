/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "port": 8080,
    "files": ["./.tmp/**/*.{html,htm,css,js}"],
    "watchOptions": {
        "usePolling": true
    },
    "server": {
        "baseDir": "./src",
        "routes": {
            '/src': 'src',
            '/.tmp': '.tmp',
            '/tsconfig.json': 'tsconfig.json',
            '/node_modules': 'node_modules',
            '/styles': '.tmp/styles/',
            '/images': '.src/images/',
            '/typings': 'typings',
            '/admin': '../limpid-markets-web-app-admin/dist/',
            '/scripts': './.tmp/scripts'
        }
    },
    ghostMode: false
}
