import React from "react";
import "./board.css";
function Item(props) {
  const dragStart = (e) => {
    console.log("dragging ", e.target.id);

    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
    e.dataTransfer.setData("animal", e.target.id);
  };

  return (
    <div>
      <div
        className="draggableThing"
        id={props.id}
        draggable="true"
        onDragStart={dragStart}
      />
    </div>
  );
}

export default Item;
