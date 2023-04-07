import { useEffect, useState } from "react";
import Door from "./Door"
import "./EntityLoader.css"

function EntityLoader(props) {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        switch(props.level) {
            case "Test":
                setEntities([<Door id="door123" init={{x: "24rem", y: "20rem", collision:true}} key="door123"/>]);
                props.setEntityPositions([
                    {
                        id:"door123",
                        x:24,
                        y:20
                    }
                ]);
                break;
            case "Test2":
                setEntities([]);
                props.setEntityPositions([]);
                break;
        };
        console.log(entities)
    }, []);

    return (
        <div className="entity-loader">
            <div className="entity-container">
                {entities}
            </div>
        </div>
    )
}

export default EntityLoader;