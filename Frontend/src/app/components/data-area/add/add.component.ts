import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import GiftModel from 'src/app/models/gift-model';
import TargetAudienceModel from 'src/app/models/targetAudience-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  implements OnInit{

  public targetAudience:TargetAudienceModel[]=[]
  public gift=new GiftModel()

  public constructor(private dataService:DataService,private router:Router){}

   public async ngOnInit() {
    try {

      this.targetAudience=await this.dataService.getAllTargetAudience()
      
    } catch (error:any) {
      alert(error.message)
    }
  }

  public async send(){
try {
      await this.dataService.addGift(this.gift)
      alert("You add gift")
      this.router.navigateByUrl("/list")
  
} catch (error) {
  
}  }

}
