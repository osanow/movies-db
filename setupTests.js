require('dotenv').config();

process.on('warning', e => {
    console.log(e);
    console.log(e.stack);
    process.exit(1);
});
