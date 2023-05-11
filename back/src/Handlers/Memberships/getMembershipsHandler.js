

const getMemberships = async (req, res) => {    
    res.status(200).send('NIY: Estoy en la ruta para obtener las membresias');    
};

const getDetailMemberships = async (req, res) => {
    res.status(200).send('NIY: Estoy en la ruta para obtener las membresias por id');;
  }

module.exports = {
    getMemberships,
    getDetailMemberships
}; 