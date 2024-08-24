const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { db } = require('./models');
const autobotsRoute = require('./routes/mysql/autobot');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import Swagger configuration
const http = require('http'); // Import http module to create a server
const { Server } = require('socket.io'); // Import Socket.io server

const PORT = 3000;

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = new Server(server, {
    cors: {
        origin: '*', // Allow CORS for all origins
        methods: ['GET', 'POST']
    }
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define a rate limiter middleware
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
    message: 'Too many requests from this IP, please try again after a minute',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all API routes
app.use('/api', apiLimiter);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test DB connection
db.sequelize.authenticate()
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((err) => {
        console.error("Error: unable to connect to database", err);
    });

// Sync database: optional
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synced.");
    })
    .catch((err) => {
        console.error("Failed to sync to database: " + err.message);
    });

// Import and run the background process
require('./backgroundprocess')(io); // Pass io to the background process

// Handles autobotsRoute
app.use('/api', autobotsRoute);

// Home
app.get('/', (req, res) => {
    res.send("Hello world");
});

// Listen on the HTTP server instead of app
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// Socket.io connection event
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});
