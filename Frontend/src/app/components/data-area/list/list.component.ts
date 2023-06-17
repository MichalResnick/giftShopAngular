import { Component, OnInit } from '@angular/core';
import GiftModel from 'src/app/models/gift-model';
import TargetAudienceModel from 'src/app/models/targetAudience-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public targetAudience:TargetAudienceModel[]=[]

  public gifts:GiftModel[]

  public constructor( private dataService:DataService){}



  public async ngOnInit(){
   try {
     this.targetAudience= await this.dataService.getAllTargetAudience()

} catch (error) {
  
}
  }

  public async displayGifts(args:Event){
    try {

      const selectElement=args.target as HTMLSelectElement
      const value=+selectElement.value
      console.log(value)
      this.gifts=await this.dataService.getGiftsByTargetAudience(value)
      
    } catch (error:any) {
      alert(error.message)
    }

  }

  public async deleteCard(id: number) {
   
    try {
      if(!window.confirm("Are you sure?")) return;

      await this.dataService.deleteGift(id)
      alert("Gift has been deleted");

      const index = this.gifts.findIndex(g => g.giftId === id);
      if (index > -1) {
        this.gifts.splice(index, 1);
     
      }
      
    } catch (error:any) {
      alert(error.message)
    }

  }



}
