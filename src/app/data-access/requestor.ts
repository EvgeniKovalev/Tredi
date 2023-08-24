import { Observable, catchError, take } from 'rxjs';

export class Requestor<T> {
  data: T | undefined;
  isLoading = false;
  hasError = false;

  load(action$: Observable<T>): Promise<T> {
    this.isLoading = true;
    this.hasError = false;
    return new Promise<T>((resolve) => {
      action$
        .pipe(
          take(1),
          catchError(() => {
            this.data = undefined;
            this.isLoading = false;
            this.hasError = true;
            resolve(<T>{});
            return [];
          })
        )
        .subscribe((data: T) => {
          resolve(data);
          this.data = data;
          this.isLoading = false;
          this.hasError = false;
        });
    });
  }
}
