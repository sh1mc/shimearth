import express from 'express';
import helmet from 'helmet';

const yaml = require('js-yaml');
const fs = require('fs');

try {
	const domains = yaml.load(fs.readFileSync('src/data/domains.yml', 'utf8'));
	console.log((domains as any)[0]['name'])

	const app = express();
	app.use(helmet());
	const port = 3000;
	const server = app.listen(port, () => {
		console.log('Listning to PORT:' + port);
	});

	app.set('view engine', 'pug');

	const secondLevelDomain = /\.?localhost/g;
	app.get("/", (req, res) => {
		const domain = req.hostname
		const subdomain = domain.replace(secondLevelDomain, '');
		if (true) {
			res.render('index', {
				title: 'a',
				domain: domain,
				subdomain: subdomain,
				url: req.originalUrl,
				img: 'https://shim.earth/shimearth.png'
			});
		}
	});


	app.use(express.static('public'));

	app.use((req, res, next) => {
		res.sendStatus(404);
	});

} catch (e) {
	console.log(e);
}


