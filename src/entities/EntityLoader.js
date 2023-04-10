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
                        el:<Door id="door123" init={{x: "24rem", y: "20rem"}} key="door123"/>,
                        x:24,
                        y:20
                    },
                    {
                        id:"guard1",
                        el:<Guard id="guard1" init={{x: "15rem", y: "10rem"}} key="guard1"/>,
                        x:15,
                        y:10
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