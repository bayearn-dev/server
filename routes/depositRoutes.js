const router = require('express').Router();
const depositController = require('../controllers/depositController');
const auth = require('../middleware/authMiddleware');

router.post('/request', auth, depositController.createDeposit);
router.get('/history', auth, depositController.getUserDeposits);

// Admin Routes
router.get('/all', auth, depositController.getAllDeposits);
router.put('/:id/approve', auth, depositController.approveDeposit);
router.put('/:id/reject', auth, depositController.rejectDeposit);

module.exports = router;
