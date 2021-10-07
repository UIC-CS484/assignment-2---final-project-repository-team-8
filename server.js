const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/hello', (req, res) => {
    res.send({express: 'Hello from Express!'});
});