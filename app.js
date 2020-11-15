// ===== App
// import all modules
const express				= require('express');
const cors					= require('cors');
const dotenv				= require('dotenv');

// setup dotenv
dotenv.config({ path: './.env'});

// init app & port
const app						= express();
const port					= process.env.PORT || 3000;

// setup urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup cors 
const clients = [
	'http://localhost:3000'
];

const corsOptions = {
	origin: function(origin, callback) {
		if(clients.indexOf(origin) !== -1 || !origin) 
			callback(null, true);
		else
			callback(new Error('Blocked by cors'));
	}
};

app.use(cors(corsOptions));

app.use('/api', require('./app/routes/pages'));

app.listen(port, () => {
	console.log(`Trivia API running at http://127.0.0.1:${port}/api`);
});
