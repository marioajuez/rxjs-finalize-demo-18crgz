// import { interval } from 'rxjs';
import { Observable, asyncScheduler } from 'rxjs';
import { take, map, share, observeOn, finalize, tap } from 'rxjs/operators';
import { noop, timer, interval } from 'rxjs';

import { interval_ } from './interval_';

export const clean = () => {
  // emit value in sequence every 1 second
  const source = interval_(1000);
  const example = source.pipe(
    take(5), //take only the first 5 values
    finalize(() => console.log('Sequence complete')) // Execute when the observable completes
  );
  const subscribe = example.subscribe((val) => console.log(val));
};

document.querySelector('button').addEventListener('click', () => {
  // clean();
  // sched();
  // inte();

  sched()
    .pipe(
      finalize(() => {
        console.log('termino');
      })
    )
    .subscribe((resp: any) => {
      console.log(resp);
    });
});

const sched = (): Observable<any> => {
  return new Observable((observer) => {
    observer.next();
    // setTimeout(() => {
    observer.complete();
    // }, 3000);
  });
  // .pipe(observeOn(asyncScheduler));
};

const inte = () => {
  const source = interval(100).pipe(
    finalize(() => console.log('[finalize] Called')),
    tap({
      next: () => console.log('[next] Called'),
      error: () => console.log('[error] Not called'),
      complete: () => console.log('[tap complete] Not called'),
    })
  );

  const sub = source.subscribe({
    next: (x) => console.log(x),
    error: noop,
    complete: () => console.log('[complete] Not called'),
  });

  timer(150).subscribe(() => sub.unsubscribe());
};
