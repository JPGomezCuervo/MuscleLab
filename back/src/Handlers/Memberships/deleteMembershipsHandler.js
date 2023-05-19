const deleteMemberships = require('../../Controllers/Memberships/deleteMembershipsController')

const deleteMembership = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMembership = await deleteMemberships(id);
        res.status(200).json(deletedMembership);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};

module.exports = deleteMembership;