import { useEffect, useState } from "react";
import Door from "./Door"
import "./EntityLoader.css"

function EntityLoader(props) {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        switch(props.level) {
            case "Test":
                setEntities([<Door init={{x: "24rem", y: "20rem", collision:true}} key="door123"/>]);
                break;
            case "Test2":
                setEntities([]);
                break;
        };
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