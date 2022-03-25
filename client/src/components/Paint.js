import { useContext } from 'react'
import Painterro from "painterro"

export default function Paint(props) {
    console.log(props);
    const socket = props.socket;
    
    let saveHandler = (image, done) => {
        if (socket) {
            socket.emit("sendPicture", image.asBlob());
        }
        
    }
    
    const p = Painterro({
        defaultTool: "brush",
        hiddenTools: ["crop", "resize", "save", "open", "zoomin", "zoomout", "select", "settings", "pixelize", "close"],
        saveHandler: saveHandler
    }).show();
    
    if (socket) {
        socket.on("getPicture", () => {
            console.log("Server wants picture");
            p.save();
        });
    }
    
    return <div>
    </div>
}