import express, { Request, Response } from "express";
import FinancialRecord from "../schema/financial-records";

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: any, res: any) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecord.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req: Request, res: Response) => { 
    try {
      const newRecordBody = req.body;
      const newRecord = new FinancialRecord(newRecordBody);
      const savedRecord = await newRecord.save();
      res.status(200).send(savedRecord);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/:id", async (req: Request, res: Response) => {  
    try {
      const id = req.params.id;
      const newRecordBody = req.body;
      const record = await FinancialRecord.findByIdAndUpdate(
        id,
        newRecordBody,
        { new: true }
      );

      if(!record) {
        res.status(404).json({ error: "Record not found" });
      }

      res.status(200).send(record);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {  
    try {
      const id = req.params.id;
      const record = await FinancialRecord.findByIdAndDelete(id);
      if(!record) {
        res.status(404).json({ error: "Record not found" });
      }
      res.status(200).send(record);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});



export default router;
