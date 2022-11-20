const spawn = require('child_process').spawn
const {Window, WindowStates, SWP, AncestorFlags, HWND} = require('win-control');
const { screen } = require('electron')
const osShortcuts = require('../utils/os-shortcuts');
exports.console = null;
exports.displayData = new Array();
const debug = false;


exports.SetDisplayData = (displayData) => {
    this.displayData = displayData;
    if(debug) {
        console.log(
            '\n------------------------------------|\n' +
            "Display Count => ", this.displayData.length + 
            '\n-------------------------------------');
    }


    let displayId = 0;
    this.displayData.forEach(display => {

        //  Fix Scaling Issue
/*         display.workArea.x *= display.scaleFactor;
        display.workArea.x *= display.scaleFactor;
        display.workArea.width *= display.scaleFactor;
        display.workArea.height *= display.scaleFactor;

        display.bounds.x *= display.scaleFactor;
        display.bounds.x *= display.scaleFactor;
        display.bounds.width *= display.scaleFactor;
        display.bounds.height *= display.scaleFactor;

        display.size.width *= display.scaleFactor;
        display.size.height *= display.scaleFactor;

        display.workAreaSize.width *= display.scaleFactor;
        display.workAreaSize.height *= display.scaleFactor; */


        display.position = {
            start: {
                x: display.workArea.x,
                y: display.workArea.y
            },
            end: {
                x: display.workArea.x + display.workArea.width,
                y: display.workArea.y + display.workArea.height
            }
        }

        if(debug) {
            console.log(
                'Display [' + displayId + ']:\n' +
                'start[x:' + display.position.start.x +
                ' y:' + display.position.start.y + ']\n' +
                'end[x:' + display.position.end.x +
                ' y:' + scaledWorkArea.height + ']\n' + 
                '-------------------------------------'
            );
        }

        
        displayId++;
    });

    if(debug) {
        console.log('\n------------------------------------|\n\n')
    }
}


const GetDisplayData = () => {
    this.SetDisplayData(screen.getAllDisplays()); 
}


const WhichDisplay = (x,y) => {
    let displayId = 0;

    for (const display of this.displayData) {

        let scaledWorkArea = this.GetScaledWorkArea(display.workArea, display.scaleFactor);

        this.console.log(scaledWorkArea);

        this.console.log(displayId, "window.x:"+x, "display.x:"+scaledWorkArea.x, "display.end:"+(scaledWorkArea.x+scaledWorkArea.width), (x >= scaledWorkArea.x && x <= parseInt(scaledWorkArea.x)+parseInt(scaledWorkArea.width))?'true':'false');
        this.console.log(displayId, "window.x:"+y, "display.x:"+scaledWorkArea.y, "display.end:"+(scaledWorkArea.y+scaledWorkArea.height), (y >= scaledWorkArea.y && y <= parseInt(scaledWorkArea.y)+parseInt(scaledWorkArea.height))?'true':'false');


        if (x >= scaledWorkArea.x && x <= (scaledWorkArea.x+scaledWorkArea.width) &&
            y >= scaledWorkArea.y && y <= (scaledWorkArea.y+scaledWorkArea.height)) {
            displayId;
            break;
        } else {
            displayId++;
        }    
    };

    if (displayId > this.displayData.length-1) {
        displayId = 0;
    }

    return displayId;
}

exports.snap = (direction) => {
    this.console.log("Snapping => " + direction);

    GetDisplayData();


    const current = Window.getForeground();

    let dimensions = current.getDimensions();
    let size = {
        width : dimensions.right - dimensions.left,
        height : dimensions.bottom - dimensions.top,
    }
    this.console.log(dimensions);
    let displayId = WhichDisplay(dimensions.left, dimensions.top);
    this.console.log('displayId => ' + displayId, "\nDisplayData:\n", this.displayData[displayId]);
}





exports.vertical = (parameters) => {


    const current = Window.getForeground();
    GetDisplayData();
    let dimensions = current.getDimensions();
    let size = {
        width : (dimensions.right - dimensions.left),
        height : dimensions.bottom - dimensions.top,
    }
    this.console.log(dimensions);
    let displayId = WhichDisplay(dimensions.left, dimensions.top);
    this.console.log('displayId => ' + displayId, "\nDisplayData:\n", this.displayData[displayId]);

    let display = this.displayData[displayId];
    let scaledWorkArea = this.GetScaledWorkArea(display.workArea, display.scaleFactor);

    this.console.log(parameters);


    if (parameters == 'up') {
        console.log('SNAP => up');

        if(scaledWorkArea.y == dimensions.top && size.height == scaledWorkArea.height) {
            console.log("Half Height - Top");
            current.setPosition(HWND.TOP, dimensions.left, scaledWorkArea.y, size.width, (scaledWorkArea.height/2), SWP.SHOWWINDOW)
        } else {
            console.log("Full Height - Top");
            current.setPosition(HWND.TOP, dimensions.left, scaledWorkArea.y, size.width, scaledWorkArea.height, SWP.SHOWWINDOW)
        }
                
    } else if (parameters == 'down') {
        console.log('SNAP => down');

        if(scaledWorkArea.y+(scaledWorkArea.height/2) == dimensions.top && size.height == scaledWorkArea.height/2) {
            console.log("Full Height - Top");
            current.setPosition(HWND.TOP, dimensions.left, scaledWorkArea.y, size.width, scaledWorkArea.height, SWP.SHOWWINDOW)
        } else {
            console.log("Half Height - Bottom");
            current.setPosition(HWND.TOP, dimensions.left, scaledWorkArea.y+(scaledWorkArea.height/2), size.width, (scaledWorkArea.height/2), SWP.SHOWWINDOW)
        }

    }

}





exports.percentWidth = (parameters) => {

    const amount = parameters.size;

    const current = Window.getForeground();

    this.console.log("[Title=" + current.getTitle() + "] Set Width Percent => " + (amount * 100) + "%");

    GetDisplayData();

    let dimensions = current.getDimensions();
    let size = {
        width : (dimensions.right - dimensions.left),
        height : dimensions.bottom - dimensions.top,
    }
    this.console.log(dimensions);
    let displayId = WhichDisplay(dimensions.left, dimensions.top);
    this.console.log('displayId => ' + displayId, "\nDisplayData:\n", this.displayData[displayId]);

    let display = this.displayData[displayId];
    let scaledWorkArea = this.GetScaledWorkArea(display.workArea, display.scaleFactor);




    if (parameters.position.length > 0) {
        
        for (let i = 0; i < parameters.position.length; i++){

            let zoneEndPoint = 0;

            let zoneEndPointId = (i+1);

            this.console.log("Is this valid ZoneId = " + zoneEndPointId);

            if(zoneEndPointId >= parameters.position.length) {
                zoneEndPointId = 0;
                zoneEndPoint = scaledWorkArea.x + scaledWorkArea.width;
            } else {
                zoneEndPoint = scaledWorkArea.x + Math.round(scaledWorkArea.width*parameters.position[zoneEndPointId])
            };

            this.console.log("SetZoneId = " + zoneEndPointId);

            if(
                dimensions.left == scaledWorkArea.x + Math.round(scaledWorkArea.width*parameters.position[i])
            ) {
                
                let newId = (i+1);
                this.console.log("Is this valid ZoneId = " + newId);

                if(newId >= parameters.position.length) {
                    newId = 0;
                };
    
                this.console.log("Move To Next Zone! ZoneId = " + newId);
    
                leftPosition = scaledWorkArea.x + Math.round((scaledWorkArea.width*parameters.position[newId]))
                break;
            } else if(
                dimensions.left >= scaledWorkArea.x + Math.round(scaledWorkArea.width*parameters.position[i]) &&
                dimensions.left < zoneEndPoint
            ) {
                this.console.log("This Zone!");
                leftPosition = scaledWorkArea.x + Math.round(i*(scaledWorkArea.width*amount));
                break;
            } else {
                leftPosition = scaledWorkArea.x;
            };

        };

    } else {

        //  Zone Id
        let zoneId = 0;
        let maxZones = Math.round(display.workArea.width/size.width);
        let leftPosition = dimensions.left;

        for (let i = 0; i <= maxZones; i++){
            this.console.log("ZoneId" + i + "/" + maxZones);
    
            this.console.log(dimensions.left, scaledWorkArea.x + Math.round(i*(scaledWorkArea.width*amount)), (dimensions.left >= scaledWorkArea.x + Math.round(i*(scaledWorkArea.width*amount)))?'true':'false');
            this.console.log(dimensions.left, scaledWorkArea.x + Math.round((i+1)*(scaledWorkArea.width*amount)), (dimensions.left <= scaledWorkArea.x + Math.round((i+1)*(scaledWorkArea.width*amount)))?'true':'false');
        
            if(
                dimensions.left ==  scaledWorkArea.x + Math.round(i*(scaledWorkArea.width*amount))
            ) {
                
                let newId = (i+1);
                this.console.log("Is this valid ZoneId = " + newId);
                if(newId > maxZones) {
                    newId = 0;
                };
    
                this.console.log("Move To Next Zone! ZoneId = " + newId);
    
                leftPosition = scaledWorkArea.x +Math.round((newId)*(scaledWorkArea.width*amount))
                break;
            } else if(
                dimensions.left >= scaledWorkArea.x +Math.round(i*(scaledWorkArea.width*amount)) &&
                dimensions.left < scaledWorkArea.x +Math.round((i+1)*(scaledWorkArea.width*amount))
            ) {
                this.console.log("This Zone!");
                leftPosition = scaledWorkArea.x + Math.round(i*(scaledWorkArea.width*amount));
                break;
            } else {
                leftPosition = scaledWorkArea.x;
            };

        };

    }


    current.setPosition(
        HWND.TOP, 
        leftPosition, scaledWorkArea.y, 
        Math.round(scaledWorkArea.width*amount), scaledWorkArea.height, 
        SWP.SHOWWINDOW)

    this.console.log("setPosition",
        leftPosition, scaledWorkArea.y, 
        Math.round(scaledWorkArea.width*amount), scaledWorkArea.height);

}



exports.GetScaledWorkArea = (workArea, scaleFactor) => {
    let scaledWorkArea = {
        x : workArea.x*scaleFactor,
        y : workArea.y*scaleFactor,
        width : workArea.width*scaleFactor,
        height : workArea.height*scaleFactor,
    }

    return scaledWorkArea;
}

exports.init = (console) => {
    this.console = console;

    GetDisplayData();

    osShortcuts.init(this.console,false);

    osShortcuts.setShortcut([3675, 61003], this.snap, 'Left');
    osShortcuts.setShortcut([3675, 61005], this.snap, 'Right');

    //  3 = 33%;
    osShortcuts.setShortcut([3675, 81], this.percentWidth, {
        size: 0.3333333,
        position: [0,0.3333333,0.6666666]
    });
    osShortcuts.setShortcut([3675, 3665], this.percentWidth, {
        size: 0.3333333,
        position: [0,0.3333333,0.6666666]
    });
    



    //  4 = 40%;
    osShortcuts.setShortcut([3675, 75], this.percentWidth, {
        size: 0.4,
        position: [0,0.2,0.4,0.6]
    });
    osShortcuts.setShortcut([3675, 57419], this.percentWidth, {
        size: 0.4,
        position: [0,0.2,0.4,0.6]
    });
    
    
    //  2 = 20%;
    osShortcuts.setShortcut([3675, 80], this.percentWidth, {
        size: 0.2,
        position: [0,0.2,0.4,0.6,0.8]
    });
    osShortcuts.setShortcut([3675, 57424], this.percentWidth, {
        size: 0.2,
        position: [0,0.2,0.4,0.6,0.8]
    });
    


    //  5 = 50%;
    osShortcuts.setShortcut([3675, 76], this.percentWidth, {
        size: 0.5,
        position: [0,0.5]
    });
    osShortcuts.setShortcut([3675, 57420], this.percentWidth, {
        size: 0.5,
        position: [0,0.5]
    });



    //  6 = 60%;
    osShortcuts.setShortcut([3675, 77], this.percentWidth, {
        size: 0.6,
        position: [0, 0.4]
    });
    osShortcuts.setShortcut([3675, 57421], this.percentWidth, {
        size: 0.6,
        position: [0, 0.4]
    });


    //  7 = 66%;
    osShortcuts.setShortcut([3675, 71], this.percentWidth, {
        size: 0.6666666,
        position: [0, 0.3333333]
    });
    osShortcuts.setShortcut([3675, 3655], this.percentWidth, {
        size: 0.6666666,
        position: [0, 0.3333333]
    });


    //  8 = 80%;
    osShortcuts.setShortcut([3675, 72], this.percentWidth, {
        size: 0.8,
        position: [0, 0.2]
    });
    osShortcuts.setShortcut([3675, 57416], this.percentWidth, {
        size: 0.8,
        position: [0, 0.2]
    });




    //  PAGE UP
    osShortcuts.setShortcut([3675, 61001], this.vertical, 'up');

    
    //  PAGE DOWN
    osShortcuts.setShortcut([3675, 61009], this.vertical, 'down');
    



    console.logProcessComplete("Window Controller Initialized.");


}

