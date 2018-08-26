
export class XelloToolTipState {
    
    //Global XelloToolTipState ID counter. A count of how many tool tips have existed in the past.
    static STATE_ID_COUNTER: number = 0;  


    id:number; // current tool tip's ID

    message:string; // tool tip message
    isOpen:boolean = false; //is it open right now?

    //pixel value of the button element's top Y position when it flips below the button 
    flipDownY:number = -1; 

    //offsets
    xOffSet:number = 5;
    yOffSet:number = 5;

    //custom class of the tool top
    _class:string;


    constructor(message:string, toolTipClass:string, xOffSet:number, yOffSet:number, isOpen:boolean) {
        this.message = message;
        this.xOffSet = xOffSet;
        this.yOffSet = yOffSet;
        this._class = toolTipClass;

        if(isOpen) this.isOpen = isOpen;

        this.id = XelloToolTipState.incrementStateID(); //inc id

        
    }

    static incrementStateID(): number{
        XelloToolTipState.STATE_ID_COUNTER = XelloToolTipState.STATE_ID_COUNTER+1;
        return XelloToolTipState.STATE_ID_COUNTER-1;
    }

    //Build a new Tool Tip
    static CreateNewXelloToolTipState(message:string, toolTipClass:string, xOffSet:number, yOffSet:number): XelloToolTipState{
        return new XelloToolTipState(message,toolTipClass,xOffSet,yOffSet,false);
    }
}