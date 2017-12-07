import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {LocalStorage} from 'local-storage';


export interface State {

  databaseService: LocalStorage;

  stateEventChange$: Observable<string>;

  stateEvent: string;
}
