const express = require('express');
const router = express.Router();
import * as cuentasBancos from '../controllers/cuentas_bancos.controller';

// cuentasBancos

router.post('/', cuentasBancos.createCuentasBancos);
router.get('/', cuentasBancos.getAllCuentasBancos);

// cuentasBancos/:id

router.put('/:id', cuentasBancos.updateCuentasBancos);
router.delete('/:id', cuentasBancos.deleteCuentasBancos);
router.get('/:id', cuentasBancos.getCuentasBancosId);

module.exports = router;