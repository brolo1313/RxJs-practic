import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

// const search$ = new Observable<Event>(observer => {
//   const search = document.getElementById('search');
//   const stop = document.getElementById('stop');

//   if (!search || !stop) {
//     observer.error('Element does not exist on the page');
//     return;
//   }

//   const onSearch = (event: any) => {
//     console.log(123);
//     checkSubscription();
//     observer.next(event);

//   };

//   const onStop = (event: any)  => {
//     checkSubscription();
//     observer.complete();
//     clear();
//   }

//   search.addEventListener('input', onSearch);
//   stop.addEventListener('click', onStop);

//   const checkSubscription = () => {
//     if(observer.closed){

//       clear();
//     }
//   }

//   const clear = () => {
//     search.removeEventListener('input', onSearch);
//     stop.removeEventListener('click', onStop);
//   }
// });

const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search') as any as HTMLElement,
  'input'
);

const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop') as any as HTMLElement,
  'click'
);

const searchSubscription = search$
  .pipe(
    map((event) => {
      return (event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map((value) => (value.length > 3 ? value : '')),
    distinctUntilChanged(),
    takeUntil(stop$)
  )
  .subscribe((value) => {
    console.log(value);
  });

// setTimeout(() => {
//   console.log('unsubscribe');
//   searchSubscription.unsubscribe();
// }, 10000)

// const stopSubscription = stop$.subscribe(() => {
//   searchSubscription.unsubscribe();
//   stopSubscription.unsubscribe();
// })
