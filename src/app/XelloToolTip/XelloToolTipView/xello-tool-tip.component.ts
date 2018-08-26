import {
    Component,
    ViewContainerRef,
    ElementRef,
    HostListener,
    ViewChild,
    EventEmitter,
    OnInit
} from '@angular/core';

import { XelloToolTipState } from '../xelloToolTipState';

@Component({
    templateUrl: './xello-tool-tip.component.html',
    styleUrls: ['./xello-tool-tip.component.scss']
})

export class XelloToolTipComponent implements OnInit {

    @ViewChild('xelloToolTipIdentifier')
    xelloToolTipIdentifier: ElementRef;

    private stickyEntity: ElementRef; //Element to track and stick to ( the button)

    //Positional coords
    private x: number;
    private y: number;

    state: XelloToolTipState; //state copy from directive

    constructor() {}

    ngOnInit() {
        this.onDynamicChange(true); //track element
    }

    init(state: XelloToolTipState, stickyEntity: ElementRef) {
        this.state = state;
        this.stickyEntity = stickyEntity;

        //What is causing xelloToolTipIdentifier to have incorrect height coordinates?!?!
        //Weird hacky solution is a temporary fix...
        //One call to onDynamicChange should be need to place the tool tip in correct location
        let _this = this;
        setTimeout(function () { _this.onDynamicChange(false) }, 0)
        //==============================================================================

        
        //this.onDynamicChange(true);
    }

    //track element and reposition tool tip when needed
    onDynamicChange(isInit: boolean) {
        //get bounding coords for tracking element and this tooltip
        let stickyPos: any = this.stickyEntity.nativeElement.getBoundingClientRect();
        let thisPos: any = this.xelloToolTipIdentifier.nativeElement.getBoundingClientRect();

        this.x = stickyPos.left + this.state.xOffSet; //fix x value of tool tip
        
        //is initilzie true
        if (!isInit) {
            //Set y poition above or below the element based on previous detected top y of tracking element
            if (thisPos.y < 0 && this.state.flipDownY == -1) {
                this.y = stickyPos.top + stickyPos.height + window.pageYOffset + this.state.yOffSet;
                this.state.flipDownY = stickyPos.top;
            }
            else if (thisPos.y >= 0 && this.state.flipDownY < stickyPos.top) {
                this.y = (stickyPos.top - thisPos.height) + window.pageYOffset - this.state.yOffSet;
                this.state.flipDownY = -1;
            }
        }
        else {
            //Set y poition above or below the element
            if (thisPos.y < 0) {
                this.y = stickyPos.top + stickyPos.height + window.pageYOffset + this.state.yOffSet;
            }
            else if (thisPos.y >= 0) {
                this.y = (stickyPos.top - thisPos.height) + window.pageYOffset - this.state.yOffSet;
            }
        }
    }

    //if this tool tip is clicked stop event propagation
    @HostListener('click', ['$event'])
    private onClick(event: any) {
        event.stopPropagation();
    }

    //Scroll listener
    @HostListener("window:scroll", [])
    private onWindowScroll() {
        this.onDynamicChange(false);
    }

    //Resize listener
    @HostListener('window:resize', ['$event'])
    private onResize(event) {
        this.onDynamicChange(false);
    }
    
    

}
