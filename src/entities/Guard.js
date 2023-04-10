import "./Guard.css";

function Guard({x, y, id}) {

    return <div id={id} className="guard-entity entity" style={{left:x+"rem", top:y+"rem"}}/>
}

export default Guard;