import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

export function interval_(period = 0, scheduler = async) {
  if (period < 0) {
    period = 0;
  }
  if (!scheduler || typeof scheduler.schedule !== 'function') {
    scheduler = async;
  }
  return new Observable((subscriber) => {
    subscriber.add(
      scheduler.schedule(dispatch, period, { subscriber, counter: 0, period })
    );
    return subscriber;
  });
}

function dispatch(state) {
  const { subscriber, counter, period } = state;
  subscriber.next(counter);
  this.schedule({ subscriber, counter: counter, period }, period);
}
