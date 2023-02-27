import express from "express"
import { PrismaClient } from "@prisma/client"
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.get("/api", async (req, res) => {
    try {
        const data = await prisma.tabungan.findMany()
        console.log(data)
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.post("/api", async (req, res) => {
    try {
        const data = await prisma.tabungan.create({data : req.body})
        return res.status(200).json(data)
    }catch  (err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.delete("/api/:id", async(req,res) => {
    try {
        const data = await prisma.tabungan.delete({where : {
            id_user : parseInt(req.params.id)
        }})
        return res.status(200).json(data)
    }catch(err) {
        
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.put("/api/:id", async (req, res) => {
    try {
        const data = await prisma.tabungan.update({where : {
            id_user : parseInt(req.params.id)
        }, data : req.body})
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})