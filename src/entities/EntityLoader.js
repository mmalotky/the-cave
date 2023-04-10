import { useEffect } from "react";
import Door from "./Door";
import Guard from "./Guard";
import "./EntityLoader.css";

function EntityLoader(props) {

    useEffect(() => {
        switch(props.level) {
            case "Test":
                props.setEntities([
                    {
                        id:"door123",
                        x:24,
                        y:20,
                        el:<Door x={24} y={20} id="door123" key="door123"/>,
                        unfixed:true
                    },
                    {
                        id:"guard1",
                        x:15,
                        y:10,
                        el:<Guard x={15} y={10} id="guard1" key="guard1"/>,
                        unfixed:false,
                        movement:"uuuullllddddrrrr"
                    }
                ]);
                break;
            case "Test2":
                props.setEntities([
                    
                ]);
                break;
        };
    }, [props.level]);

    return (
        <div className="entity-loader">
            <div className="entity-container">
                {props.entities.map(e => e.el)}
            </div>
        </div>
    )
}

export default EntityLoader;