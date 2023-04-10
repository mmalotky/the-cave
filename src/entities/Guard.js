import { useState } from "react";
import "./Guard.css";

function Guard({init}) {
    const [state, setState] = useState(init);

    return <div className="guard-entity entity" style={state}/>
}

export default Guard;