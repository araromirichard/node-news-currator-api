import app from './app';

const PORT = process.env.PORT || 3000; 

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// A simple implementation of Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Closing HTTP server...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process...');
    process.exit(0);
  });
};

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT')); // Ctrl + C
// Termination signal
process.on('SIGTERM', () => shutdown('SIGTERM'));