import {
    Inject,
    Directive,
    OnInit,
    ViewContainerRef,
    HostListener,
    Input,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { XelloToolTipService } from './xello-tool-tip.service';
import { XelloToolTipState } from './xelloToolTipState';
import { XelloToolTipComponent } from './XelloToolTipView/xello-tool-tip.component';

@Directive({
    selector: '[xelloToolTip]', //selector to be used as a directive
})

export class XelloToolTipDirective implements OnInit {

    //Input parameters into the tool tip 
    @Input() public toolTipMessage: string; //message

    //default offset, but can also be used as paramters 
    @Input() public toolTipXOffset: number = -3;
    @Input() public toolTipYOffset: number = 5;

    //custom tool tip class
    @Input() public toolTipClass: string;

    _state: XelloToolTipState; //state of this tool tip

    xelloToolTipRef: ComponentRef<XelloToolTipComponent>; //Reference to XelloToolTipComponent

    constructor( @Inject(DOCUMENT) private _DOM: any,
        private _resolver: ComponentFactoryResolver,

        private _thisEntity: ViewContainerRef,
        private _thisElement: ElementRef,

        private _toolTipService: XelloToolTipService
    ) {

        //Subscribe and listen for emits
        this._toolTipService.switchViewEvent.subscribe((stateToShow: XelloToolTipState) => {
            //Is stateToShow undefined or state id's do not match?
            if (!stateToShow || stateToShow.id !== this._state.id) {
                //is this state open?
                if (this._state.isOpen) {
                    //close this state and hide tool tip
                    this._state.isOpen = !this._state.isOpen;
                    this.hide(undefined)
                }
            }
            else {
                //is this state closed
                if (!this._state.isOpen) {
                    //show it
                    this.show(undefined);
                }
            }
        })
    }

    ngOnInit(): void {
        //is there no message?
        if (!this.toolTipMessage) {
            throw new Error("xelloToolTip requires a 'toolTipMessage'.") // thorw error
        }
        else {
            //Create new state
            this._state = XelloToolTipState.CreateNewXelloToolTipState(this.toolTipMessage, this.toolTipClass, this.toolTipXOffset, this.toolTipYOffset)
        }
    }

    show(event: any) {
        //create new tool tip componenet in memory
        this.xelloToolTipRef = this._thisEntity.createComponent(this._resolver.resolveComponentFactory(XelloToolTipComponent));
        
        //append tool top to body
        this._DOM.querySelector('body').appendChild(this.xelloToolTipRef.location.nativeElement);
        
        //yes it's open now
        this._state.isOpen = true; 
        
        //move tool tip to correct location on screen
        this.xelloToolTipRef.instance.init(this._state, this._thisElement);
    }

    hide(event: any) {
        //hide and destory
        this._state.isOpen = false;
        this.destroyView();
    }

    destroyView() {
        //if componenet exists then destory and delete it from memory
        if (this.xelloToolTipRef) {
            this.xelloToolTipRef.destroy();
            delete this.xelloToolTipRef;
        }
    }

    @HostListener('click', ['$event'])
    private onClick(event: any) {
        //this button was just clicked emit switch view
        this._toolTipService.switchViewEvent.emit(this._state);
        event.stopPropagation();
    }

    @HostListener('document:click', ['$event'])
    private documentClick(event: any) {
        //random part of the document was clicked close all tool tips
        this._toolTipService.switchViewEvent.emit(undefined);
    }


    @HostListener('document:keydown.escape', ['$event'])
    private onKeydownHandler(event: KeyboardEvent) {
        //escape was clicked close all tool tips!
        this._toolTipService.switchViewEvent.emit(undefined);
    }
}