import { play } from "./Play";

function Cell({ id, cheatMode, x, y }) {
  let imgid, imageSize=40;

  const agent_x = play.agentIndex.row;
  const agent_y = play.agentIndex.column;

  const isAgentCell = agent_x === x && agent_y === y;
  if (isAgentCell) {
    id = "A";
  }

  if (id.length > 1) {
    if (
      id == "TB" ||
      id == "BT" ||
      id == "TBG" ||
      id == "BTG" ||
      id == "TBS" ||
      id == "SBS" ||
      (id.includes("T") && id.includes("B"))
    ) {
      id = "TB";
    }
    if (id == "TG" || id == "GT" || (id.includes("T") && id.includes("G"))) {
      id = "TG";
    }
    if (id == "BG" || id == "GB" || (id.includes("G") && id.includes("B"))) {
      id = "BG";
    }
    if (
      id == "SG" ||
      id == "GS" ||
      id == "SGG" ||
      id == "SSG" ||
      id.includes("G")
    ) {
      id = "G";
    }
    if (id == "" || id == "SS" || id == "" || id.includes("S")) {
      id = "S";
    }
    if (id == "SB" || id == "BS" || (id.includes("B") && id.includes("S"))) {
      id = "B";
    }
    if (id == "TS" || (id.includes("T") && id.includes("S"))) {
      id = "T";
    }
    if (id == "WT" || id == "TW" || (id.includes("T") && id.includes("W"))) {
      id = "W";
    }
    if (id.includes("P")) {
      id = "P";
    }
    if (id.includes("T") && id.includes("B") && id.includes("G")) {
      id = "TBG";
    }

    imgid = `/assets/${id}.png`;
  } else {
    imgid = `/assets/${id}.png`;
  }

  if (id == 0) {
    imgid = `/assets/S.png`;
  }

  
  if (cheatMode && id !== "A" && !play.cellVisited[x][y]) {
    imgid = "/assets/cover.png";
    imageSize = 50;
  }

  return (
    <div>
      <img src={imgid} width={imageSize} height={imageSize} alt={id} />
    </div>
  );
}

export default Cell;