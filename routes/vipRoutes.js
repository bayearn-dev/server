// vipRoutes.js
router.get("/vip-packages", vipController.getVipPackages);
router.post("/vip-packages", vipController.createVipPackage);
router.put("/vip-packages/:id", vipController.updateVipPackage);
router.delete("/vip-packages/:id", vipController.deleteVipPackage);
