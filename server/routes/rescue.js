const path = require('path');

const rescueCtrl = require(path.join(__dirname, '../controllers/rescue.ctrl'));

module.exports = (router, io) => {
  // GET
  // Get all rescues
  router.route('/rescues').get(rescueCtrl.getRescues);

  // POST
  // Create new rescue entry
  router.route('/rescues').post((req, res) => rescueCtrl.addNewRescue(req, res, io));

  // PATCH
  // Update rescue entry
  router.route('/rescues/:id').patch((req, res) => rescueCtrl.updateRescue(req, res, io));

  // GET
  // Get rescue updates
  router.route('/rescues/:id/updates').get(rescueCtrl.getUpdates);

  // POST
  // Add new rescue update
  router.route('/rescues/:id/updates').post(rescueCtrl.addNewUpdate);
};
