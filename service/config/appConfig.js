var env = process.env.NODE_ENV || 'development';
if(env === 'production'){
  process.env.HOST = "http://athlete-tracker-preprod.herokuapp.com"
  process.env.MONGODB_URI = 'mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PWD+'@cluster0-shard-00-00-tjizg.mongodb.net:27017,cluster0-shard-00-01-tjizg.mongodb.net:27017,cluster0-shard-00-02-tjizg.mongodb.net:27017/ridertrack?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
  process.env.REDIS_URI = 'redis://redis-13189.c15.us-east-1-2.ec2.cloud.redislabs.com:13189';
}
else if (env === 'development') {
    //local env
    process.env.PORT = 3000;
    process.env.HOST = "localhost:3000";
    process.env.MONGODB_URI = 'mongodb://localhost/ridertrack';
    process.env.REDIS_URI = 'redis://localhost:6379';
}
module.exports = {
  environment:env,
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};
