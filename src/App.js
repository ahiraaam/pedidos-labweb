import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";
import axios from "axios";
export default function App() {
  let left = React.createRef();
  let right = React.createRef();
  let middle = React.createRef();
  let last = React.createRef();

  const [pedido, setPedido] = useState("");

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    let lElement = ReactDOM.findDOMNode(left.current);
    let rElement = ReactDOM.findDOMNode(right.current);
    let mElement = ReactDOM.findDOMNode(middle.current);
    let lastElement = ReactDOM.findDOMNode(last.current);

    Dragula([lElement, rElement, mElement, lastElement], {});
  }, []);

  useEffect(() => {
    fetchPedidos();
    console.log("FETCH");
  }, []);

  const fetchPedidos = async () => {
    const result = await axios("http://localhost:8000/api/pedidos");
    console.log("PEDIDOS", result.data);
    setPedidos(result.data);
    //setQuestion({atributo = result.data});
  };

  const handleChange = (event) => {
    event.preventDefault();
    setPedido(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let listaPedidos = Object.assign([], pedidos);
    console.log(listaPedidos);

    await axios
      .post(`http://localhost:8000/api/pedidos`, {
        name: pedido,
      })
      .then((res) => {
        console.log(res);
        console.log("res data", res.data);
        listaPedidos.push({ id: res.data.id[0], name: pedido });
        console.log(listaPedidos);
      })
      .catch((err) => {
        console.log(err);
      });
    setPedidos(listaPedidos);
    console.log("PEDIDOOOS", listaPedidos);
  };
  const handleDrag = () => {
    console.log("terminooo");
  };
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Crear Pedido</label>
          <input
            type="text"
            placeholder="Pedido"
            name="pedido"
            onChange={handleChange}
          ></input>
          <button type="submit">Crear</button>
        </form>
      </div>
      <div className="Container">
        <div id="left" ref={left}>
          1. Salida de planta
          {pedidos.map((ped) => (
            <div key={ped.id} draggable="true">
              {ped.name}
            </div>
          ))}
        </div>
        <div id="right" ref={right}>
          4. Entregado
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
        <div id="middle" ref={middle}>
          3. En proceso de entrega
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div id="last" ref={last}>
          2. En Local Delivery Center
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
      </div>
    </div>
  );
}
