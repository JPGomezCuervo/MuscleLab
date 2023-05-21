const getMembershipsController = require('../../Controllers/Memberships/getMembershipsController');

const getMemberships = async (req, res) => {    
    try {
        const memberships = await getMembershipsController();
        res.status(200).json(memberships)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getStatusMemberships = async (req, res) => {
    res.status(200).send('NIY: Estoy en la ruta para obtener las membresias por id');
  }

module.exports = {
    getMemberships,
    getStatusMemberships
}; 