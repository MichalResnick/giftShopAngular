import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../utils/app-config';
import { firstValueFrom } from 'rxjs';
import TargetAudienceModel from '../models/targetAudience-model';
import GiftModel from '../models/gift-model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    public async getAllTargetAudience():Promise<TargetAudienceModel[]>{
      
        const observable=this.http.get<TargetAudienceModel[]>(appConfig.targetAudienceUrl)

        const targetAudience=await firstValueFrom(observable)

        return targetAudience

    }

    public async getGiftsByTargetAudience(targetAudienceId: number): Promise<GiftModel[]> {
        const observable = this.http.get<GiftModel[]>(appConfig.giftsPerTargetAudienceUrl + targetAudienceId);
        const gifts = await firstValueFrom(observable);
        return gifts;
    }

        // Add movie:
    public async addGift(gift: GiftModel): Promise<void> {
        const observable = this.http.post<GiftModel>(appConfig.giftsUrl, gift);
        await firstValueFrom(observable);
    }

    // Delete movie:
    public async deleteGift(giftId: number): Promise<void> {
        const observable = this.http.delete(appConfig.giftsUrl + giftId);
        await firstValueFrom(observable);
    }
}
