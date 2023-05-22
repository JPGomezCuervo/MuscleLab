const { Membership } = require("../../db");

let createMembership = async (name, price, benefits, promo, duration) => {
  try {
    const foundedMembership = await Membership.findOne({
      where: {
        name: name
      }
    });

    if (foundedMembership) {
      throw new Error('La membresía ya existe');
    } 
    
    const newMembership = await Membership.create({
      name,
      price,
      benefits,
      promo,
      duration,
    });

    return newMembership;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createMembership;
