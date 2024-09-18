const express = require('express')
const app = express()
const { default: mongoose } = require('mongoose')
const Person = require("./models/Person");

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Primeira nota
app.get('/', (reg, res) => {
    res.json({ message: 'Bem-vindo ao meu servidor' })
})


//Create
app.post('/person', async (req, res)=>{
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(200).json({message: "Pessoa inserida no sistema"})
    } catch (error) {
        res.status(500).json({erro: error})       
    }

})

//Read
app.get("/person", async (req, res)=>{
    try {
        const people = await Person.find()
        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({erro: error})       
    }
})
//UPDATE
//DELETE

mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('uhuul, conctamos')
    app.listen(3000)
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err)
})