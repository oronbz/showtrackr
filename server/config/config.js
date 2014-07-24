var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    // db: 'mongodb://localhost:27017/showtrackr',
    db: 'mongodb://oronbz:trackrshow@ds031319.mongolab.com:31319/showtrackr',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://oronbz:trackrshow@ds031319.mongolab.com:31319/showtrackr',
    port: process.env.PORT || 80
  }
}