import express from 'express'

const app = express()
const port = 6968
app.use(express.json())

let material= []

let nextId=1
//add a new material
app.post('/teas', (req,res) =>{
    const { name, price } = req.body
    const newmat= {id: nextId++,name,price}
    material.push(newmat)
    res.status(201).send(newmat)

})
//get a new material
app.get("/teas", (req, res) => {
  res.status(201).send(material)
});
//get a tea with id 
app.get('/teas/:id',(req,res) =>{
    const cars= material.find(t => t.id ===parseInt(req.params.id))
    if(!cars){
        res.status(404).send('Cars material is not found')
    }
    res.status(201).send(cars)
})
//update tea
app.put('teas/:id', (req,res) =>{
    const mat= req.params.id
    const cars = material.find((t) => t.id === parseInt(req.params.id));
    if (!cars) {
      res.status(404).send("Cars material is not found");
    }
    const {name,price} =req.body
    mat.name=name
    mat.price=price
    res.send(201).send(mat)
})
//delete material
app.delete('/teas/:id',(req,res)=>{
    const index = material.findIndex(t => t.id === parseInt(req.params.id)) 
    if(index===-1){
        return res.status(404).send("not found!")
    }
    material.splice(index,1)
    return res.status(201).send("index deleted succesfully");

})
app.listen(port,() =>{
    console.log(`Server is listening now! on port: ${port}`);
})