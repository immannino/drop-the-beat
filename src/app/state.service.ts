import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class StateService {
    state: any = {};
    stateSubject: Subject<any> = new Subject();

    constructor() {}

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = {
            ...this.state,
            ...state
        };
    }

    updateState(state) {
        this.setState(state);
        this.stateSubject.next(this.getState());
    }
}