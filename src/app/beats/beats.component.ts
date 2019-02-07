import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';
import { Observable, interval, MonoTypeOperatorFunction, of } from 'rxjs';
import { take, repeat, takeWhile, delay } from 'rxjs/operators';
import { StateService } from '../state.service';

@Component({
  selector: 'beats',
  templateUrl: './beats.component.html',
  styleUrls: ['./beats.component.scss']
})
export class BeatsComponent implements OnInit {
  @Input()
  text: string;

  @Input()
  color: string;

  @Input()
  name: string;

  chars: string[];
  styleTemplate: string;
  firstStyleTemplate: string = `drop-shadow(1px 1px black)`;
  filterStyles: any = {};
  interval: number = 10;
  waveInterval: number = 50;

  constructor(private state: StateService) { 
    state.stateSubject.subscribe((state) => {
      console.table(state);
      this.text = state.word;
      this.chars = this.text.split('');
      this.color = state.color;
      this.styleTemplate = `drop-shadow(1px 1px ${this.color})`;
    });
  }

  getId = (id) => `${this.name}-${id}`;

  ngOnInit() {
    this.styleTemplate = `drop-shadow(1px 1px ${this.color})`;
    this.chars = this.text.split('');
  }

  pulse() {
    for (let i = 0; i < this.chars.length; i++) {
      this.add(`${this.name}-${i}`);
    }
  };

  waveForever(count: number = 25) {
    const delayed = of('true').pipe(delay(400));
    let add: boolean = true;

    delayed.pipe(repeat(-1)).subscribe(() => {
      add ? this.waveAdd(25) : this.waveRemove(25);
      add = !add;
    });
  }
  
  waveAdd(count: number) {
    interval(this.waveInterval).pipe(take(this.chars.length)).subscribe((x) => {

      this.addClassCount(count, `${this.name}-${x}`);
    });
  }

  waveRemove(count) {
    interval(this.waveInterval).pipe(take(this.chars.length)).subscribe((x) => {
      this.removeClassCount(count, `${this.name}-${x}`);
    });
  };

  addClassCount(count: number, id: string) {
    interval(this.interval).pipe(take(count)).subscribe(() => {
      this.add(id);
    }); 
  }

  removeClassCount(count: number, id: string) {
    interval(this.interval).pipe(take(count)).subscribe(() => {
      this.subtract(id);
    });
  }

  add2(id) {
    if (!this.filterStyles[id]) {
      this.filterStyles[id] = new Array();
    }
    this.filterStyles[id].push(this.styleTemplate);
    this.updateStyle(id);
  }

  /**
   * This function adds the drop-shadows:
   * Caveat: Starts the array with black for the if() count number, so that it 
   * looks like it has an ending.
   * 
   * @param id Element to update
   */
  add(id) {
    if (!this.filterStyles[id]) {
      this.filterStyles[id] = new Array();
    }

    if (this.filterStyles[id].length <= 3) this.filterStyles[id].push(this.firstStyleTemplate);
    else this.filterStyles[id].unshift(this.styleTemplate);
    // this.filterStyles[id].push(this.styleTemplate);
    this.updateStyle(id);
  }

  subtract(id) {
    this.filterStyles[id].shift();
    this.updateStyle(id);
  }
  
  updateStyle(id) {
    const element = document.getElementById(id);

    element.style.filter = this.filterStyles[id].join('');
  }
}
