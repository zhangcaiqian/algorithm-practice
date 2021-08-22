const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.use(async (req, res, next) => {
    console.log('first');
    await next();
    await new Promise(
        (resolve) => 
            setTimeout(
                () => {
                    console.log(`wait 1000 ms end`);
                    resolve()
                }, 
            1000
        )
    );
    console.log('first end');
});

app.use((req, res, next) => {
    console.log('second');
    next();
    console.log('second end');
});

app.use((req, res, next) => {
    console.log('third');
    next();
    console.log('third end');
});

app.get('/', (req, res) => res.send('Hellp World'));