const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require('express');
const app = express();
app.use(express.json());

app.post('/time-entry', async (req,res) => {
    try{
        const {arrival, exit, projectId} = req.body;
        const newEntry= await prisma.timeEntry.creat({
            data:{
                arrival,
                exit,
                projectId,
            },
        });

        res.json(newEntry);0
    }catch (error){
        res.status(500).json({ error: ' Could not creat new time entry '});
    }
});

app.get('/time-entries', async(req, res)=> {
    try {
        const entries = await prisma.timeEntry.findMany();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: ' Could not fetch time entries '});
    }
});


app.put('/time-entry/:id', async(req, res)=> {

    const {id} =req.prisma;

    try {
        const entry = await prisma.timeEntry.findUnique({
            where:{
                id: parseInt(id),
            },
        });
    } catch (error) {
        res.status(404).json({ error: 'Time entry not found'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Running on port 3000');
});