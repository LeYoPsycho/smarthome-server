import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.listen(port, () => {
	console.log('Server is listening at', port);
});

let x:number = 5;