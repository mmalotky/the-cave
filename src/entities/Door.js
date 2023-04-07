import { useState } from "react";
import "./Door.css";

function Door({init}) {
    const [state, setState] = useState(init);

    return <div className="door-entity entity" style={{left:state.x, top:state.y}}/>
}

export default Door;