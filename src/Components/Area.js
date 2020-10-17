import React from "react";
import "./board.css";

function Area(props) {
  const drop = (e) => {
    const thingBeingDragged = e.dataTransfer.getData("animal");
    e.target.appendChild(document.getElementById(thingBeingDragged));

    // Remove the highlight
    // because the onDragLeave won't fire after onDrop
    e.target.classList.remove("activeDropArea");
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event
  const allowDrop = (e) => {
    // The default action of onDragOver
    // is to cancel the drop operation  -.-
    // so we need to prevent that
    e.preventDefault();
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event
  const dragEnter = (e) => {
    // Drag Enter is used to
    // highlight the drop area
    e.target.classList.add("activeDropArea");
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event
  const dragLeave = (e) => {
    // Drag Leave is used to
    // remove the highlight in the drop area
    e.target.classList.remove("activeDropArea");
  };
  return (
    <div
      className="droppableArea"
      id={props.id}
      onDrop={drop}
      onDragOver={allowDrop}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      <p>picked animals 🤲</p>
    </div>
  );
}

export default Area;
