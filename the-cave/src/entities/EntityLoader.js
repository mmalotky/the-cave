import Door from "./Door";
import Guard from "./Guard";
import Chest from "./Chest";
import "./EntityLoader.css";

export function initialEntities(level, setEntities) {
    switch(level) {
        case "Test":
            setEntities([
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
                    movement:"uuuullllddddrrrr",
                    message:["Move along, nothing to see here."],
                    gameover:true
                },
                {
                    id:"guard2",
                    x: 22,
                    y: 19,
                    el:<Guard x={22} y={19} id="guard2" key="guard2"/>,
                    unfixed:false,
                    movement: "rrrrllll",
                    gameover:true
                }
            ]);
            break;
        case "Test2":
            setEntities([
                {
                    id:"door124",
                    x:17,
                    y:26,
                    el:<Door x={17} y={26} id="door124" key="door124"/>,
                    unfixed:false
                },
                {
                    id:"door125",
                    x:24,
                    y:34,
                    el:<Door x={24} y={34} id="door125" key="door125"/>,
                    unfixed:true
                },
                {
                    id:"chest111",
                    x:47,
                    y:8,
                    el:<Chest x={47} y={8} id="chest111" key="chest111"/>,
                    unfixed:false,
                    drop: {
                        name:"Key",
                        unlocks:"door124"
                    },
                    message: ["The chest is empty", "You found a key"]
                },
                {
                    id:"guard3",
                    x: 21,
                    y: 18,
                    el:<Guard x={21} y={18} id="guard3" key="guard3"/>,
                    unfixed:false,
                    movement: "rrrrllll",
                    gameover:true,
                    direction:"rrrrllll",
                    range:5
                },
                {
                    id:"guard4",
                    x: 15,
                    y: 17,
                    el:<Guard x={15} y={17} id="guard4" key="guard4"/>,
                    unfixed:false,
                    movement: "uuuudddd",
                    gameover:true,
                    direction:"uuuudddd",
                    range:5
                }
            ]);
            break;
        default:
            setEntities([]);
            break;
    };
}

function EntityLoader(props) {

    //loader is static while the container moves to reposition entities according to player position
    return (
        <div className="entity-loader">
            <div className="entity-container">
                {props.entities.map(e => e.el)}
            </div>
        </div>
    )
}

export default EntityLoader;