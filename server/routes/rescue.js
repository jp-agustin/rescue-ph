const path = require('path');

const rescueCtrl = require(path.join(__dirname, '../controllers/rescue.ctrl'));

module.exports = (router, io) => {

  // GET
  // Get all rescues
  router.route('/rescues')
    .get(
      rescueCtrl.getRescues
    );

  // POST
  // Create new rescue entry
  router.route('/rescues')
    .post(
      (req, res, next) => (
        rescueCtrl.addNewRescue(req, res, next, io)
      )
    );
}
