import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  disabled$: Subject<boolean> = new Subject();

  constructor() {
    this.setDisabled(false);
  }

  setDisabled(value: boolean) {
      this.disabled$.next(value);
  }

}
