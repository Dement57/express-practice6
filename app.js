export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
    const app = express();
    const headers = {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"
    };
    const setHeaders = (req, res, n) => res.set(headers) && n();
    app
        .use(setHeaders)
        .get('/login/', (req, res) => {
            res.send('dement057777')
        })
        .get('/code/', (req, res) => {
            const stream = createReadStream(import.meta.url.substring(7));
            stream.pipe(res);
        })
        .get('/sha1/:input/', (req, res) => {
            const inputSHA = crypto.createHash('sha1');
            res.send(inputSHA.update(JSON.stringify(req.params.input)).digest('hex'))
        })
        .get('/req/', (req, res) => {
            const queryAddress = req.query.addr;
            http.get(queryAddress, resp => {
                resp.setEncoding('utf8');
                let rawData = '';
                resp.on('data', (chunk) => { rawData += chunk; });
                resp.on('end', () => {
                    try {
                        res.send(rawData);
                    } catch (e) {
                    }
                });
            });
        })
        .use(bodyParser.json())
        .post('/req/', (req, res) => {
            const url = req.body.addr;
            http.get(url, resp => {
                resp.setEncoding('utf8');
                let rawData = '';
                resp.on('data', (chunk) => { rawData += chunk; });
                resp.on('end', () => {
                    try {
                        res.send(rawData);
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            });
        })
        .use('/', (req, res) => {
            res.send('dement057777')
        });
    return app;
};