import "./Guard.css";

function Guard({x, y, id}) {

    return <div id={id} className="guard-entity entity" style={{left:2*x+"rem", top:2*y+"rem"}}/>
}

export default Guard;