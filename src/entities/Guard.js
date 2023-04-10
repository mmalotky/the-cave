import { useState } from "react";
import "./Guard.css";

function Guard({init}) {
    const [state, setState] = useState(init);

    return <div className="guard-entity entity" style={{left:state.x, top:state.y}}/>
}

export default Guard;