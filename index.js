const express = require('express');
const bodyParser = require('body-parser');
const {connection}=require("./config/db");

const { userRouter } = require('./routes/userRouter');
const { courseRouter } = require('./routes/courseRouter');
const { progressRouter } = require('./routes/progressRouter');
const { lessonRouter } = require('./routes/lessonRouter');
const swaggerRouter = require('./swagger');


require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/', userRouter);
app.use("/",courseRouter)
app.use("/",progressRouter)
app.use("/",lessonRouter)
app.use(swaggerRouter)
connection.sync({ force: false })  // Set to true to reset the database on every server restart
  .then(() => {
    console.log('Database & tables created!');
  });

app.listen(process.env.port,async()=>{
    try {
        console.log(`Server is listening on port no ${process.env.port}`)
    } catch (error) {
        console.log("Getting Error while running server")
    }
  
})
