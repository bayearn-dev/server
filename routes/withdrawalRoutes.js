const router = require('express').Router();
const withdrawalController = require('../controllers/withdrawalController');
const auth = require('../middleware/authMiddleware');

router.post('/request', auth, withdrawalController.createWithdrawal);
router.get('/history', auth, withdrawalController.getUserWithdrawals);

// Admin Routes
router.get('/all', auth, withdrawalController.getAllWithdrawals);
router.put('/:id/approve', auth, withdrawalController.approveWithdrawal);
router.put('/:id/reject', auth, withdrawalController.rejectWithdrawal);

module.exports = router;
