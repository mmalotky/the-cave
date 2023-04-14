import "./Chest.css";

function Chest({x, y, id}) {
    return <div id={id} className="chest-entity entity" style={{left:2*x+"rem", top:2*y+"rem"}}/>
}

export default Chest;