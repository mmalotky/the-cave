import "./Chest.css";

function Chest({x, y, id}) {
    return <div id={id} className="chest-entity entity" style={{left:x+"rem", top:y+"rem"}}/>
}

export default Chest;