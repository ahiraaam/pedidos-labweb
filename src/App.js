import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";

export default function App() {
  let left = React.createRef();
  let right = React.createRef();
  let middle = React.createRef();
  let last = React.createRef();

  useEffect(() => {
    let lElement = ReactDOM.findDOMNode(left.current);
    let rElement = ReactDOM.findDOMNode(right.current);
    let mElement = ReactDOM.findDOMNode(middle.current);
    let lastElement = ReactDOM.findDOMNode(last.current);

    Dragula([lElement, rElement, mElement, lastElement], {});
  }, []);

  return (
    <div className="App">
      <h1>Mi lista</h1>
      <div className="Container">
        <div id="left" ref={left}>
          <div>Swap me around</div>
          <div>Swap her around</div>
          <div>Swap him around</div>
          <div>Swap them around</div>
        </div>
        <div id="right" ref={right}>
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
        <div id="middle" ref={middle}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div id="last" ref={last}>
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
      </div>
    </div>
  );
}
