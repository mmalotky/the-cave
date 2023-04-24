import "./Door.css";

function Door({x, y, id}) {
    return <div id={id} className="door-entity entity" style={{left:2*x+"rem", top:2*y+"rem"}}/>
}

export default Door;