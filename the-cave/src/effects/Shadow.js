import "./Shadow.css";

function Shadow({x, y, height, width}) {
    return <div className="shadow-effect" style={{left:2*x+"rem", top:2*y+"rem", height:2*height+"rem", width:2*width+"rem"}}/>
}

export default Shadow;