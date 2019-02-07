import { Component, EventEmitter } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  word: string = "Seattle Freeze";
  color: string = "#09ffad";
  refresh: EventEmitter<any> = new EventEmitter();

  constructor(private state: StateService) {}
  
  update() {
    this.state.updateState({word: this.word, color: this.color})  
  }
}
