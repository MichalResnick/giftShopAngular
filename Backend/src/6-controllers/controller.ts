import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import GiftModel from "../4-models/gift-model";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
router.get("/target-audience/", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const targetaudience=await logic.getAllTargetAudience()
       response.json(targetaudience)


    }
    catch (err: any) {
        next(err);
    }
});

router.get("/gifts-per-target-audience/:targetAudienceId/", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const targetaudienceId=+request.params.targetAudienceId
       const gifts=await logic.getGiftsByTargetAudience(targetaudienceId)
       response.json(gifts)
       console.log(gifts)


    }
    catch (err: any) {
        next(err);
    }
});

router.post("/gifts", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const gift=new GiftModel(request.body)
       const addedGift=await logic.addGift(gift)
       response.status(201).json(addedGift)

    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/gifts/:giftId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const giftId=+request.params.giftId
    await logic.deleteGift(giftId)
    response.sendStatus(204)
    
    }
    catch (err: any) {
        next(err);
    }
});

export default router;