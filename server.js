const app = require('./lib/app');

const PORT = process.env.PORT || 7890

app.listen(() => {
    console.log(`Listening on port ${PORT}`);
});