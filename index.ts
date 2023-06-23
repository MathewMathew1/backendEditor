import express, { Request, Response } from 'express';

// Create an Express application
const app = express();

// Define a route handler for the root path
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
