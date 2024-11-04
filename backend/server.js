const app = require('./app')
const PORT = process.env.PORT || 5000
const seedDatabase = require('./seeder/seedDatabase.js')

if (process.env.FIRST_RUN === "true") {
    console.log("Running first run scripts...")
    console.log(process.env.PRODUCTION)
    seedDatabase()
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
