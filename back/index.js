const express = require('express')

const app = express();


app.use(express.json());
app.use(require('cors')());
app.use(require('morgan')('dev'))

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial SSE message
  res.write('data: Connected\n\n');

  // Simulate sending SSE messages every 2 seconds
  const intervalId = setInterval(() => {
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 100);

  // Clean up when the client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
