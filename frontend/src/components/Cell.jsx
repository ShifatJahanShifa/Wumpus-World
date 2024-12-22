import { play } from "./Play";


function Cell({ id, cheatMode, x, y }) {
  let imgId = `/assets/S.png`; 
  let imageSize = 30;
  const agent_x = play.agentIndex.row;
  const agent_y = play.agentIndex.column;

 
  if (agent_x === x && agent_y === y) {
    id = "A";
  }

  if (id.length > 1) {
    if (id.includes("T") && id.includes("B")) {
      id = "TB";
    } 
    else if (id.includes("T") && id.includes("G")) {
      id = "TG";
    } 
    else if (id.includes("B") && id.includes("G")) {
      id = "BG";
    } 
    else if (id.includes("G")) {
      id = "G";
    } 
    else if (id.includes("B")) {
      id = "B";
    } 
    else if (id.includes("T")) {
      id = "T";
    } 
    else if (id.includes("W")) {
      id = "W";
    } 
    else if (id.includes("P")) {
      id = "P";
    }
  }

 
  if (id) {
    imgId = `/assets/${id}.png`;
  }
  if (id === "A") {
    imageSize = 30;
  }
  if (cheatMode && id !== "A" && !play.cellVisited[x][y]) {
    imgId = "/assets/cover.png";
    imageSize = 45;
  }



  return (
    <div>

      <img src={imgId} width={imageSize} height={imageSize} alt={id} />
    </div>
  );
}

export default Cell;
