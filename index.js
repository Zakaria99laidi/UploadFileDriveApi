const express = require('express');
const uploadRouter = require('./router');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (_, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadRouter);

app.listen(8080, () => {
  console.log('Form running on port 8080');
});

