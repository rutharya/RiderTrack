// /usr/local/etc/redis.conf
const redis = require('redis');
const client = redis.createClient(
  process.env.REDIS_URI,
  {
    'auth_pass': process.env.REDIS_KEY,
    'return_buffers': true
  }
).on('error', (err) => console.error('ERR:REDIS:', err));



module.exports = client
