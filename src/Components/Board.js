import React, { useState } from "react";
import "./board.css";
function Board() {
  const items = [
    { number: "1", title: "🇦🇷 Argentina" },
    { number: "2", title: "🤩 YASS" },
    { number: "3", title: "👩🏼‍💻 Tech Girl" },
    { number: "4", title: "💋 Lipstick & Code" },
    { number: "5", title: "💃🏼 Latina" },
  ];

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };
  // We'll use the initialDndState created above

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [list, setList] = useState(items);

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition, // set the draggedFrom position
      isDragging: true,
      originalOrder: list, // store the current state of "list"
    });

    // Note: this is only for Firefox.

    event.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event) => {
    // It also receives a DragEvent.
    // Later, we'll read the position
    // of the item from event.currentTarget
    // and store the updated list state

    // We need to prevent the default behavior
    // of this event, in order for the onDrop
    // event to fire.
    // It may sound weird, but the default is
    // to cancel out the drop.
    event.preventDefault();

    // Store the content of the original list
    // in this variable that we'll update
    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the drop area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    // get the element that's at the position of "draggedFrom"
    const itemDragged = newList[draggedFrom];

    // filter out the item being dragged
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    // update the list
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    // since this event fires many times
    // we check if the targets are actually
    // different:
    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        // save the updated list state
        // we will render this onDrop
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    // Here, we will:
    // - update the rendered list
    // - and reset the DnD state

    // we use the updater function
    // for the "list" hook
    setList(dragAndDrop.updatedOrder);

    // and reset the state of
    // the DnD
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };
  return (
    <section>
      <section onDrop={onDrop} onDragOver={onDrop}>
        Drop here 🤲🏻
      </section>
      <ul>
        {list.map((item, index) => {
          return (
            <li
              data-position={index}
              key={index}
              draggable="true"
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <span>{item.number}</span>
              <p>{item.title}</p>
              <i class="fas fa-arrows-alt-v"></i>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Board;
