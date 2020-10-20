import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";
import axios from "axios";
export default function App() {
  let salidaVar = React.createRef();
  let localVar = React.createRef();
  let procesoVar = React.createRef();
  let entregaCompletaVar = React.createRef();
  let entregaFallidaVar = React.createRef();

  const [pedido, setPedido] = useState("");

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    let salidaElem = ReactDOM.findDOMNode(salidaVar.current);
    let localElem = ReactDOM.findDOMNode(localVar.current);
    let procesoElem = ReactDOM.findDOMNode(procesoVar.current);
    let entregaComElem = ReactDOM.findDOMNode(entregaCompletaVar.current);
    let entregaFallElem = ReactDOM.findDOMNode(entregaFallidaVar.current);

    var drake = dragula(
      [salidaElem, localElem, procesoElem, entregaComElem, entregaFallElem],
      {}
    );
    drake.on("drop", function (el, target, source, sibling) {
      console.log("Elemento", el, "Target", target, "Source", source, sibling);
    });
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

  const updateState = async (id, destino) => {
    await axios
      .put(`http://localhost:8000/api/pedidos/${id}`, { id: destino })
      .then((res) => {
        console.log("Estado actualizado");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div key="1" id="left" ref={salidaVar}>
          1. Salida de planta
          {pedidos.map((ped) => (
            <div key={ped.id} draggable="true">
              {ped.name}
            </div>
          ))}
        </div>

        <div key="2" id="last" ref={localVar}>
          2. En Local Delivery Center
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
        <div key="3" id="middle" ref={procesoVar}>
          3. En proceso de entrega
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div key="4" id="right" ref={entregaCompletaVar}>
          4. Entregado
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
        <div key="5" id="right" ref={entregaFallidaVar}>
          4. Entregado
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
      </div>
    </div>
  );
}
