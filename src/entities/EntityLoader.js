import { useEffect } from "react";
import Door from "./Door"
import "./EntityLoader.css"

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
                    }
                ]);
                break;
            case "Test2":
                props.setEntities([]);
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