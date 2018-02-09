var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    //local env
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost/ridertrack';
} else if (env === 'test') {
    //TODO: configure test environment?
    process.env.PORT = 3000;
    process.env.MONGODB_URI = '<test environment url>';
} else if (env === 'production'){
  //need to test this from production -> deploy this to heroku and check response.
  //TODO: check this...later
   //process.env.MONGODB_URI = 'production URI';
}

module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};
