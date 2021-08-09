const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is_auth');


const app = express();
const events = [];
app.use(bodyParser.json());
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);
app.use(
    '/api',
    graphqlHTTP({
      schema: graphQlSchema ,
      rootValue: graphQlResolvers ,
      graphiql: true
    })
  );
  mongoose.connect(
	`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@cluster0.ksj0t.mongodb.net/${process.env.mongo_db}?retryWrites=true&w=majority`
	).then( () =>{
		app.listen(8000,function(){
      console.log("server is running on port 8000");
         })
    }).catch(err => {
		console.log(err);
	});
