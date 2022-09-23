import { distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export abstract class Store<T> {
  private state$: BehaviorSubject<T>;

  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  use() {
    return {
      pick: <K extends keyof T>(key: K) => {
        return this.select((state) => state[key]);
      },
      update: <K extends keyof T>(prop: K, value: T[K]) => {
        const state = { ...this.state, [prop]: value };
        return this.setState(state);
      },
    };
  }

  select<K>(mapFn: (state: T) => K) {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}
