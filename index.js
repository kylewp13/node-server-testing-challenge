require('dotenv').config();

const server = require('./server');

const port = process.env.PORT

server.listen(port, () => {
    console.log(`\n ** Server running at http://localhost:${port}`);
});