import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  /** Method for show loading */
  show() {
      this.isLoading.next(true);
  }

  /** Method for hide loading */
  hide() {
      this.isLoading.next(false);
  }
}
