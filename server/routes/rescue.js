const path = require('path');

const rescueCtrl = require(path.join(__dirname, '../controllers/rescue.ctrl'));

module.exports = (router) => {
  // GET
  // Get all rescues
  router.route('/rescues').get(rescueCtrl.getRescues);

  // GET
  // Get rescue updates
  router.route('/rescues/:id/updates').get(rescueCtrl.getUpdates);

  // POST
  // Add new rescue update
  router.route('/rescues/:id/updates').post(rescueCtrl.addNewUpdate);
};
