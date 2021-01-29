import express from 'express';
import helmet from 'helmet';

const yaml = require('js-yaml');
const fs = require('fs');

try {
	const domains = yaml.load(fs.readFileSync('src/data/domains.yml', 'utf8'));

	const app = express();
	app.use(helmet());
	const port = 3000;
	const server = app.listen(port, () => {
		console.log('Listning to PORT:' + port);
	});

	app.set('view engine', 'pug');
	app.set('views', 'src/views')

	const secondLevelDomain = /\.?localhost/g;
	app.get("/", (req, res) => {
		const domain = req.hostname
		const subdomain = domain.replace(secondLevelDomain, '');
		let exists = false;
		for (const d of domains) {
			if(d['name'] === subdomain) {
				res.render('index', {
					title: d['title'] + 'します',
					domain: domain,
					subdomain: subdomain,
					url: req.originalUrl,
					img: 'https://shim.earth/shimearth.png'
				});
				exists = true;
			}
		}
		if (!exists) {
			res.sendStatus(404);
		}
	});


	app.use(express.static('public'));

	app.use((req, res, next) => {
		res.sendStatus(404);
	});

} catch (e) {
	console.log(e);
}


