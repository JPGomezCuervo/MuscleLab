const createMembership = require('../../Controllers/Memberships/createMembershipsController');

const postNewMembership = async (req, res) => {
  try {
    const { name, price, benefits, promo, duration } = req.body;
    const newMembership = await createMembership(name, price, benefits, promo, duration);
    res.status(201).json(newMembership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postNewMembership;

