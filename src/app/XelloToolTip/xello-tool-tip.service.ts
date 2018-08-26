import { 
  Injectable,
  EventEmitter 
} from '@angular/core';

import { XelloToolTipState } from './XelloToolTipState';

@Injectable()
export class XelloToolTipService {
  //Global event emitter for all Tool Tips
  //All tool tips that get created must subscribe to this and listen for new state emits
  public 
    switchViewEvent: EventEmitter<XelloToolTipState> = new EventEmitter<XelloToolTipState>();

  constructor() {}
}
