import { Injectable, InjectionToken} from '@angular/core';

export let JQ_TOKEN = new InjectionToken<object>('jQuery');

@Injectable()
export class JqueryService {

  constructor() { }

}
