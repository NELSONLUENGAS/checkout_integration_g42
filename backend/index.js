require('dotenv').config()
const app = require('./src/app')

const { PORT } = process.env;


app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT: HTTP://127.0.0.1:' + PORT)
})