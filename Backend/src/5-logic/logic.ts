import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import GiftModel from "../4-models/gift-model";
import TargetAudienceModel from "../4-models/targetAudience-model";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";

async function getAllTargetAudience():Promise<TargetAudienceModel[]>{
    const sql=` SELECT * FROM targetAudience`
    const targetAudience=await dal.execute(sql)
    return targetAudience
}

async function getGiftsByTargetAudience(targetAudienceId:number):Promise<GiftModel[]>{
    const sql=`
    SELECT G.*,T.targetAudienceName
    FROM gifts AS G JOIN targetaudience AS T
    ON G.targetAudienceId=T.targetAudienceId
    WHERE G.targetAudienceId=${targetAudienceId} `

    const gifts=await dal.execute(sql)
    return gifts
}

async function addGift(gift:GiftModel):Promise<GiftModel> {
    const sql=`
    INSERT INTO gifts VALUES(
         DEFAULT,
        '${gift.targetAudienceId}',
        '${gift.name}',
        '${gift.description}',
        '${gift.price}',
        '${gift.discount}'
    )`

    const info:OkPacket=await dal.execute(sql)

    gift.giftId=info.insertId

    return gift
    
}

async function deleteGift(giftId:number):Promise<void>{
    const sql=`
    DELETE FROM gifts
    WHERE giftId=?
    `
    const info:OkPacket=await dal.execute(sql,[giftId])
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(giftId)
}

export default {
    getAllTargetAudience,
    getGiftsByTargetAudience,
    addGift,
    deleteGift
};
