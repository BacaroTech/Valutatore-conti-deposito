import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ReportSchema } from "./modelReport";
import bodyParser from 'body-parser';
import cors from 'cors';
const jsonParser = bodyParser.json()
 
/********** CONNECT TO DATABASE **********/
dotenv.config();
const mongoString = process.env.DATABASE_URL as string

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

/********** SET ALL DATABASE'S MODELS **********/
const ReportModel = mongoose.model('Report', ReportSchema)

/********** START WITH SERVER NODE **********/
const app: Express = express();

app.use(cors({
  origin: '*', // Permette richieste da qualsiasi origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specifica i metodi consentiti
  allowedHeaders: ['Content-Type', 'Authorization'], // Specifica le intestazioni consentite
  credentials: true
}));

app.use((req, res, next) => {
  console.log('Richiesta intercettata dal middleware CORS');
  next();
});

/********** API **********/
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//return report by id
app.post("/getById", jsonParser, async (req: Request, res: Response) => {
  try {
    const data = await ReportModel.find({id: req.body.id});
    res.status(200).send(data);  
  }catch{
    res.status(500).json("si è verificato un errore");
  }
})

//create new report
app.post("/newReport", jsonParser, async (req: Request, res: Response) => {
  try{
    const report = new ReportModel({
      id:  Math.floor(Math.random() * (process.env.DATABASE_RANDOM_MAX as any)),
      base: req.body.base,
      percentuale: req.body.percentuale,
      anni: req.body.anni
    });
    const result = await report.save();
    res.send(result);
  }catch{
    res.send("Si è verificato un errore");
  }
})

//modify old report by id
app.put("/changeReportId", (req: Request, res: Response) => {
  //todo in the future
})

app.listen(process.env.PORT, () => {
  mongoose.connect(mongoString);
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT} and mongo connection ${mongoose.connection ? "ok": "ERROR"}`);
});