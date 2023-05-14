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




//MIDDLEWARE GLOBAL===================>
//Auxilia a fazer debug
server.use((req, res, next) => {
    console.log(`Url Chamada: ${req.url}`)
    return next()
})


//Checar se o parametro que precisa passar está vazio
function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório"})

    }
    //Se não tiver o nome retorna um erro, senão, prosegue com a requisição
    return next()
}



//Checa se o curso que se quer buscar realmente existe
function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index]

    if(!curso){
        return res.status(400).json({ error: "O curso não existe"})
    }

    return next()
}








//Requisitar Todos os Cursos
server.get('/cursos', (req, res) => {
    return res.json(cursos)
})




//Requisitar um Curso Específico
server.get('/cursos/:index',checkIndexCurso, (req, res) => {
    

    //const index = req.params.id
    //return res.json({ curso: `Curso ${id}`})

    //ou usa do jeito abaixo
    const { index } = req.params  //pega apenas o index

    return res.json(cursos[index])
})




//Criar um novo Curso, usa request body


// server.post('/cursos', (req, res) => {
//     const { name } = req.body
//     cursos.push(name)//enviar o name

//     return res.json(cursos) //retornar pro Front-End
// })


server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body
    cursos.push(name)//enviar o name

    return res.json(cursos) //retornar pro Front-End
})




//Atualizando um curso
//usa Route params
// server.put('/cursos/:index', (req, res) => {
//     const { index } = req.params //index 
//     const { name } = req.body  //nome que ele quer substituir

//     cursos[index] = name

//     return res.json(cursos) //retorna todos os cursos que estão atualizados
// })


server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params //index 
    const { name } = req.body  //nome que ele quer substituir

    cursos[index] = name

    return res.json(cursos) //retorna todos os cursos que estão atualizados
})







//Excluindo algum curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params

    cursos.splice(index, 1) //deleta o índice que ele está passando na posição 1

    return res.json(cursos)

})




server.listen(3000)
