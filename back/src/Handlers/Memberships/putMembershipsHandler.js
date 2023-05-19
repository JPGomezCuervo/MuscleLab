const updateMemberships = require('../../Controllers/Memberships/updateMembershipsController')

const updateMembership = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        price,
        benefits,
        promo,
        duration
    } = req.body;
    try {
        const updatedMembership = await updateMemberships(           
            name,
            price,
            benefits,
            promo,
            duration,
            id
        )
        res.status(200).json(updatedMembership);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = updateMembership;