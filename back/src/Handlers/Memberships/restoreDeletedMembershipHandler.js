const restoreMemberships = require('../../Controllers/Memberships/restoreDeletedMembershipsController');

const restoreMembership = async (req, res) => {
    const { id } = req.params;
    try{
        const restoredMembership = await restoreMemberships(id);
        res.status(200).json(restoredMembership);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = restoreMembership;