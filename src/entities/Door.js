import "./Door.css";

function Door({x, y, id}) {
    return <div id={id} className="door-entity entity" style={{left:x+"rem", top:y+"rem"}}/>
}

export default Door;