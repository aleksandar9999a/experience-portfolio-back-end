const dbConnect = require('./db');

dbConnect.then(() => {
    console.log('Connected to db successfully');
    require('./main');
}).catch(console.error);
