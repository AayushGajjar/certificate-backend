const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// List of valid certificate names (no extension)
const validNames = ['Alice', 'Bob', 'Charlie'];

app.get('/certificate', (req, res) => {
  const name = req.query.name?.trim();

  if (!name || !validNames.includes(name)) {
    return res.status(404).send('Certificate not found');
  }

  const filePath = path.join(__dirname, 'certificates', `${name}.pdf`);
  res.download(filePath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
