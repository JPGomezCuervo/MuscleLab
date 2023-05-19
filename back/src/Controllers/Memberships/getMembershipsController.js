const { Membership } = require('../../db');

const getMembershipsController = async () =>{
    const memberships = await Membership.findAll({
        where:{
            deletedAt: null
        }
    });
    return memberships;
};

module.exports = getMembershipsController;
