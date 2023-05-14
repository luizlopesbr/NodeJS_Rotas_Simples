const express = require('express')

const server = express()

server.use(express.json())

//Query params = ?nome=NodeJS  (são parâmetros que passamos na frente da rota)

//Route Params = /curso/2  (parâmetros que passamos na rota)

//Request Body = { nome: 'Nodejs', tipo: 'Backend}   (manda um objeto no corpo da requisição)











//localhost:3000/curso

//req: dados da requisição
//res: resposta pro front-end




//QUERY PARAMS ======================================>
//No navegador digite: localhost:3000/curso?nome=JavaScript

// server.get('/curso',(req, res) => {
//     //return res.send('Hello World')
//     //return res.json({ curso: 'Node JS' })

//     const nome = req.query.nome

//     return res.json({ curso: `Aprendendo ${nome}`})
// })





//ROUTE PARAMS====================================>
//No navegador digite: localhost:3000/curso/1

// server.get('/curso/:id',(req, res) => {
//     //return res.send('Hello World')
//     //return res.json({ curso: 'Node JS' })

//     const id = req.params.id

//     return res.json({ curso: `Curso ${id}`})
// })




//REQUEST BODY======================================>
const cursos = ['Node JS', 'JavaScript', 'React Native']


//Requisitar Todos os Cursos
server.get('/cursos', (req, res) => {
    return res.json(cursos)
})




//Requisitar um Curso Específico
server.get('/cursos/:index',(req, res) => {
    

    //const index = req.params.id
    //return res.json({ curso: `Curso ${id}`})

    //ou usa do jeito abaixo
    const { index } = req.params  //pega apenas o index

    return res.json(cursos[index])
})




//Criar uma informação, usa request body
server.post('/cursos', (req, res) => {
    const { name } = req.body
    cursos.push(name)//enviar o name

    return res.json(cursos) //retornar pro Front-End
})





//Atualizando um curso
//usa Route params
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params //index 
    const { name } = req.body  //nome que ele quer substituir

    cursos[index] = name

    return res.json(cursos) //retorna todos os cursos que estão atualizados
})


//Excluindo algum curso
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params

    cursos.splice(index, 1) //deleta o índice que ele está passando na posição 1

    return res.json(cursos)

})




server.listen(3000)