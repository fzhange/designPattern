import { Observable } from 'rxjs';

export const observable = new Observable((subscriber) => {
  console.log('---observable start---');
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
