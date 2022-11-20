const spawn = require('child_process').spawn
const {Window, WindowStates, SWP, AncestorFlags, HWND} = require('win-control');

exports.displayData = [];

exports.SetDisplayData = (displayData) => {
    this.displayData = displayData;
    console.log(this.displayData);
}

exports.Snap = async (action) => {

    const current = Window.getForeground();

    let dimensions = current.getDimensions();
    let size = {
        width : dimensions.right - dimensions.left,
        height : dimensions.bottom - dimensions.top,
    }

    let zone = (this.displayData[0].workArea.width-dimensions.left) / size.width;
    let maxZones = this.displayData[0].workArea.width / size.width;
    

    console.log('dimensions: ', current.getDimensions())

    zone = Math.round(zone);
    console.log('zone', zone);

    if (action['parameters'].includes('right')) {
        console.log('SNAP => right');

        zone++;
        if (zone > maxZones) {
            zone = maxZones;
        };
        console.log('zone', zone);
        current.setPosition(HWND.TOP, (((size.width) * (zone-1))), 0, size.width, size.height, SWP.SHOWWINDOW)

    } else if (action['parameters'].includes('left')) {
        console.log('SNAP => left');


        zone--;
        if (zone <= 0) {
            zone = 1;
        };
        console.log('zone', zone);
        current.setPosition(HWND.TOP, (((size.width) * (zone-1))), 0, size.width, size.height, SWP.SHOWWINDOW)


/*         current.setPosition(HWND.TOP, (this.displayData[0].workArea.width/2), 0, (this.displayData[0].workArea.width/2), this.displayData[0].workArea.height, SWP.SHOWWINDOW)
        
        console.log('dimensions: ', current.getDimensions()) */

    }


    if (action['parameters'].includes('up')) {
        console.log('SNAP => up');

        

        if(0 == dimensions.top && size.height == this.displayData[0].workArea.height) {
            console.log("Half Height - Top");
            current.setPosition(HWND.TOP, dimensions.left, 0, size.width, (this.displayData[0].workArea.height/2), SWP.SHOWWINDOW)
        } else {
            console.log("Full Height - Top");
            current.setPosition(HWND.TOP, dimensions.left, 0, size.width, this.displayData[0].workArea.height, SWP.SHOWWINDOW)
        }
        


        

    } else if (action['parameters'].includes('down')) {
        console.log('SNAP => down');

        if((this.displayData[0].workArea.height/2) == dimensions.top && size.height == this.displayData[0].workArea.height/2) {
            console.log("Full Height - Top");
            current.setPosition(HWND.TOP, dimensions.left, 0, size.width, this.displayData[0].workArea.height, SWP.SHOWWINDOW)
        } else {
            console.log("Half Height - Bottom");
            current.setPosition(HWND.TOP, dimensions.left, (this.displayData[0].workArea.height/2), size.width, (this.displayData[0].workArea.height/2), SWP.SHOWWINDOW)
        }

    } else if (action['parameters'].includes('2')) {
        console.log('SNAP => 2');

        current.setPosition(HWND.TOP, dimensions.left, dimensions.top, Math.round((this.displayData[0].workArea.width/2)), size.height, SWP.SHOWWINDOW)

    } else if (action['parameters'].includes('3')) {
        console.log('SNAP => 3');

        current.setPosition(HWND.TOP, dimensions.left, dimensions.top, Math.round((this.displayData[0].workArea.width/3)), size.height, SWP.SHOWWINDOW)

    } else if (action['parameters'].includes('4')) {
        console.log('SNAP => 4');

        current.setPosition(HWND.TOP, dimensions.left, dimensions.top, Math.round((this.displayData[0].workArea.width/4)), size.height, SWP.SHOWWINDOW)

    }

    console.log('dimensions: ', current.getDimensions())
}





exports.GetWindow = async () => {

    const showInfo = w => {
        if (!w) {
          console.log('Window not found')
          return
        }
    
        console.log('hwnd: ', w.getHwnd())
        console.log('title: ', w.getTitle())
        console.log('isVisible: ', w.isVisible())
        console.log('pid: ', w.getPid())
        console.log('classname: ', w.getClassName())
        console.log('exists: ', w.exists())
        console.log('parent: ', w.getParent())
        console.log('ancestor: ', w.getAncestor(AncestorFlags.ROOTOWNER))
        console.log('dimensions: ', w.getDimensions())
    }


    console.log('------------------------------------------')
    console.log('               Current')
    const current = Window.getForeground()
    showInfo(current)
    console.log('------------------------------------------\n')

}