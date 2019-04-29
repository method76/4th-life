const NodeCache = require('node-cache');
const apiCache = new NodeCache();
apiCache.on( 'expired', function( key, value ) {
});
module.exports = apiCache;
