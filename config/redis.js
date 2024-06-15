// Import the createClient function from the 'redis' library
const { createClient } = require("redis");
// Load environment variables from a .env file
require("dotenv").config();
// Retrieve Redis credentials from environment variables
const userName = process.env.redis_user;
const password = process.env.redis_password;
// Create a Redis client with the specified connection details
const redisClient = createClient({
    // Redis server connection URL with username, password, host, and port
    url: `redis://${userName}:${password}@redis-19748.c264.ap-south-1-1.ec2.redns.redis-cloud.com:19748`
});
// Event handler for Redis client errors
redisClient.on("error", (err) => {
    console.log({'error':'error at redis',err});
});
// Connect to the Redis server asynchronously using an immediately invoked async function
(async () => await redisClient.connect())();
// Event handler for Redis client ready state
redisClient.on("ready", () => {
    console.log("Redis connected");
});
// Export the Redis client for use in other parts of the application
module.exports = {
    redisClient
};