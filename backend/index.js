// import express from 'express';
// import cluster from 'cluster';
// import os from 'os';

// const totalCPUs = os.cpus().length;
// const PORT = process.env.PORT || 3000;

// if (cluster.isPrimary) {
//     // Fork workers.
//     for (let i = 0; i < totalCPUs; i++) {
//         cluster.fork();
//     }
// }
// else {
//     const server = express();
//     server.get('/', (req, res) => {
//         return res.json({ message: `Hello World from worker ${process.pid}` });
//     });

//     server.listen(PORT, () => {
//         console.log(`Worker ${process.pid} is running on port ${PORT}`);
//     });
// }


import crypto from 'crypto';

// Function to generate a secure random token
const generateSecretToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

// Example usage
const secretToken = generateSecretToken();
console.log(`Generated Secret Token: ${secretToken}`);