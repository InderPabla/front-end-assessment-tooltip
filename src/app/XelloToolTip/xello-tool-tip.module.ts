
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import {XelloToolTipService} from './xello-tool-tip.service';
import {XelloToolTipDirective} from './xello-tool-tip.directive';
import {XelloToolTipComponent} from './XelloToolTipView/xello-tool-tip.component';

@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [
        XelloToolTipDirective,
        XelloToolTipComponent
    ],

    exports: [
        XelloToolTipDirective
    ],

    entryComponents: [
        XelloToolTipComponent
    ],

    providers: [
        XelloToolTipService
    ],
})

export class XelloToolTipModule { 
    constructor() {

    }
}
