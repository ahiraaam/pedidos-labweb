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
  pedido.id = req.params.id;
  pedido.time = Date.now();
  let destino = req.body.id;

  return await Task.done(pedido, destino)
    .then(() => {
      console.log("Pedido is done with id: ", task.id);
      res.json("Pedido done");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = pedidoCtrl;
