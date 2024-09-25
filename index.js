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
app.post('/person', async (req, res) => {
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})

//Read
app.get("/person", async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json({ people })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Read by id
app.get("/person/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const people = await Person.findOne({ _id: id })

        if (!people) {
            res.status(422).json({ message: "Usuário não encontrado!" })
            return
        }

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Update
app.patch("/person/:id", async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(422).json({message: "Usuário não encontrado!"})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Delete
app.delete("/person/:id", async (req, res) => {
    const id = req.params.id

    const people = await Person.findOne({ _id: id })

    if (!people) {
        res.status(422).json({ message: "Usuário não encontrado!" })
        return
    }

    try {
        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: "Usuário Removido com sucesso !" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('uhuul, conctamos')
    app.listen(3000)
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err)
})