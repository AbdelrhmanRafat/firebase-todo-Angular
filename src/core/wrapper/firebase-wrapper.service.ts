import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWrapperService {
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  wrapRequest<T>(firebasePromise: Promise<T>): Observable<T> {
    this.spinner.show(); // Show spinner
    return new Observable<T>((observer) => {
      firebasePromise
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => {
          this.toastr.error(error.message || 'An error occurred', 'Error');
          observer.error(error);
        })
        .finally(() => {
          this.spinner.hide(); // Hide spinner
        });
    });
  }
}
