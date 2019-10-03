const express = require('express');
const figlet = require('figlet');
const app = express();

app.use(express.json() );
app.use(express.urlencoded()); 
app.get('/', (req, res) => {
	res.json({
    success: true,
    msg: "5app Coding Challenge",
	})
})

/**
 * POST /users
 * Receives a structured payload Obj
 */
app.post('/users', (req, res) => {
  const { payload } = req.body;
  res.json({
    response: payload.map(user => Object.assign({}, {
      name: user.name,
      count: user.count,
      thumbnail: user.logos[0].url
    }))
  })
})

app.listen(process.env.PORT || 3000, () => {
  figlet('5app', (err, data) => console.log(data));
	console.log('App listening on port:', process.env.PORT || 3000);
})
