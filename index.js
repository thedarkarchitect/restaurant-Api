import express from 'express';

const app = express();
const Port = 4000;

//middleware
app.use(express.json());

app.get('/restaurant', (req, res) => {
    res.send("Hello, web page")
});

app.listen(Port, () => console.log(`Server Running on port: http://localhost:${Port}`));