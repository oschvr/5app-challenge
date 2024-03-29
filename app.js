const express = require('express');
const figlet = require('figlet');
const app = express();

app.use(express.json() );
app.use(express.urlencoded()); 
app.get('/', (req, res) => {
	res.json({
    success: true,
    msg: "5app Coding Challenge",
    payload: {
      challenge: {
        host: "https://coding-challenge-5app.herokuapp.com/",
        repo: "https://github.com/oschvr/5app-challenge",
        docs: "https://documenter.getpostman.com/view/1720868/SVtPZrjJ"
      },
      author: {
        name: "Oscar Chavez",
        email: "oscarchavezromero@gmail.com",
        cv: "https://drive.google.com/file/d/1KaEG6cj7N-fV6sPOcDc62sqdP17pUSfS/view?usp=sharing",
        website: "https://oschvr.com",
        github: "https://github.com/oschvr"
      }
    }
	})
})

/**
 * POST /users
 * Receives a structured payload Obj
 */
app.post('/users', (req, res) => {
  const { payload } = req.body;
  res.json({
    response: 
      payload
        .map(user => Object.assign({}, {
          name: user.name,
          count: user.count,
          thumbnail:
            user.logos
              .filter(logo => logo.size.match(/^([\d ]{2,3})/)[0] >= 64 && logo.size.match(/^([\d ]{2,5})/)[0] <= 128)
              .map(logo => logo.url)[0]
        })
      ).filter(user => user.count >= 1)
  })
})

app.listen(process.env.PORT || 3000, () => {
  figlet('5app', (err, data) => console.log(data));
	console.log('App listening on port:', process.env.PORT || 3000);
})
