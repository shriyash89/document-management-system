import express from 'express'
import cors from 'cors'
import fileData from './fileData.js'

const app = express()
const port = 5000

//middlewares
app.use(cors())
app.use(express.json())

//fetch all versions of file
app.get('/versions',(req,res)=>{
    try {
        return res.status(200).json(fileData)
    } catch (err) {
        console.log("error",err)
        return res.status(500).json({"msg":"Server failure occur"})
    }
})

//edit particular version of file
app.put('/editVersion/:id',(req,res)=>{
    const versionId = req.params.id 
    try {
        const editedVersion = req.body
        for (let index = 0; index < fileData.versions.length; index++) {
            if(fileData.versions[index].id == versionId){
                fileData.versions[index] = editedVersion
            }
        }
        return res.status(200).json({"msg":"version has been edited successfully"})
    } catch (err) {
        console.log("error",err)
        return res.status(500).json({"msg":"Server failure occur"})
    }
})

//create new version(when file is edited)
app.post('/createVersion',(req,res)=>{
    try {
        const newVersion = req.body
        const newId = newVersion.id+1
        fileData.versions.push({...newVersion,id:newId,name:'Version '+newId})
        return res.status(200).json({"msg":"new version created successfully!",fileData:fileData})
    } catch (err) {
        console.log("error",err)
        return res.status(500).json({"msg":"Server failure occur"})
    }
})

app.get('/',(req,res)=>{
    res.send("This is root api")
})
app.listen(port,()=>{
    console.log("app is running on port " + port)
})

