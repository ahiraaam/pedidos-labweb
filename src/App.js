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
      var elId = el.id;
      var destinoId = target.id;
      console.log(elId);
      console.log("DestinoID", destinoId);
      updateState(elId, destinoId);

      if (source.id == 2 && target.id == 1) {
        drake.cancel(el);
      }
      if (source.id == 4) {
        drake.cancel(el);
      }
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
        listaPedidos.push({ id: res.data.id[0], name: pedido, id_destino: 1 });
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
        <div key="1" id="1" ref={salidaVar} className="list">
          1. Salida de planta
          {pedidos
            .filter((ped) => ped.id_destino === 1)
            .map((item) => (
              <div key={item.id} id={item.id}>
                {item.name}
              </div>
            ))}
        </div>

        <div key="2" id="2" ref={localVar} className="list">
          2. En Local Delivery Center
          {pedidos
            .filter((ped) => ped.id_destino === 2)
            .map((item) => (
              <div key={item.id} id={item.id}>
                {item.name}
              </div>
            ))}
        </div>
        <div key="3" id="3" ref={procesoVar} className="list">
          3. En proceso de entrega
          {pedidos
            .filter((ped) => ped.id_destino === 3)
            .map((item) => (
              <div key={item.id} id={item.id}>
                {item.name}
              </div>
            ))}
        </div>
        <div key="4" id="4" ref={entregaCompletaVar} className="list">
          4. Entregado Completo
          {pedidos
            .filter((ped) => ped.id_destino === 4)
            .map((item) => (
              <div key={item.id} id={item.id}>
                {item.name}
              </div>
            ))}
        </div>
        <div
          key="5"
          id="5"
          ref={entregaFallidaVar}
          className="list secondColumn"
        >
          4. Entregado Fallido
          {pedidos
            .filter((ped) => ped.id_destino === 5)
            .map((item) => (
              <div key={item.id} id={item.id}>
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
