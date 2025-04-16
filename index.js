const app = require('./src/app');
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Receipt Processor API running on port ${port}`);
});