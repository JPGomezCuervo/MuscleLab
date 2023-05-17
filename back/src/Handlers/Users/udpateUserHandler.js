const updateUser = require('../../Controllers/Users/updateUserController.js')

const updateUsers = async (req, res) =>{
    const { id } = req.params;
    const{
        fullName,
        password,
        email,
        phone,
    } = req.body;
    try {
        const updatedUser = updateUser(
            id,
            fullName,
            password,
            email,
            phone,            
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = updateUsers;