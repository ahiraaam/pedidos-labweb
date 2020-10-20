const pedidoCtrl = {};
const Pedido = require("../models/Pedido");

pedidoCtrl.showPedidos = async (req, res) => {
  await Pedido.all()
    .then((data) => {
      let pedidos = data;
      res.json(pedidos);
    })
    .catch((err) => {
      console.log(err);
    });
};

pedidoCtrl.createPedido = async (req, res) => {
  let pedido = {};
  pedido.name = req.body.name;
  pedido.time = new Date();
  await Pedido.create(pedido)
    .then((id) => {
      console.log("Pedido created with id: ", id);
      res.json({ id: id });
    })
    .catch((err) => {
      console.log(err);
    });
};

pedidoCtrl.updateDestino = async (req, res) => {
  let pedido = {};
  pedido.id = (req.params.id);
  console.log("ID" + req.params.id);
  pedido.time = new Date();
  let destino = {}
  destino.id = req.body.id;
  console.log("ID destino " + destino.id);

  return await Pedido.updateDestino(pedido, destino)
    .then(() => {
      console.log("Pedido is done with id: ", pedido);
      res.json("Pedido done");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = pedidoCtrl;
