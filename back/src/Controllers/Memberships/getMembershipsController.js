const { Membership } = require('../../db');


const createMemberships = async () => {
    const membershipsData = [
            {   
                id: '1',
                name: 'standard',
                price: '$114,950.00',
                benefits: 'beneficios varios basicos',
                promo: false,
                duration: '1 mes'
            },
            {
                id: '2',
                name: 'plus',
                price: '$114,950.00',
                benefits: 'beneficios varios plus',
                promo: false,
                duration: '3 meses'
            },
            {
                id: '3',
                name: 'premium',
                price: '$114,950.00',
                benefits: 'beneficios varios premium',
                promo: false,
                duration: '12 meses'
            }
        ];

        try {
            const existingMemberships = await Membership.findAll();            
            if(existingMemberships.length === 0 ){
                await Membership.bulkCreate(membershipsData); 
                console.log('Membresias creadas correctamente');
            }
        } catch (error) {
            console.error('Error al crear membresias:', error);
        }
        
};

const getMembershipsController = async () => {
    try {
        await createMemberships();
        const memberships = await Membership.findAll();
        return memberships;
    } catch (error) {
        throw new Error('Error al cargar las membresías');
    };
};
module.exports = getMembershipsController;

