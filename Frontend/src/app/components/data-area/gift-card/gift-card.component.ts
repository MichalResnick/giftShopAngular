import { Component, EventEmitter, Input, Output } from '@angular/core';
import GiftModel from 'src/app/models/gift-model';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent {

  @Input()
  public gift:GiftModel

  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();

  deleteCard() {
    this.deleteClicked.emit(this.gift);
  }


}
