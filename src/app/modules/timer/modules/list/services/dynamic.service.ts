import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicService {
    output$ = new Subject<boolean>();

    constructor() {}

    sendData(data: boolean) {
        this.output$.next(data);
    }
}