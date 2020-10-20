const { Router } = require("express");
const router = Router();

const { showPedidos, 
    createPedido,
    updateDestino, 
    } = require('../controllers/pedidos-controller');

router.route('/').get(showPedidos)
            .post(createPedido);
            
router.route('/:id').put(updateDestino);



module.exports = router;                   