const { User, StatusMemberships, Membership } = require('../../db.js');

const fulfillOrder = async(session) => {
    // TODO: fill me in
    const userEmail=session.customer_email;
    const plan=session.line_items.data[0].description;
    console.log(session);
    if(session.payment_status==='paid'){
        const membershipToAdd = await Membership.findOne({where:{name:plan}});
        const buyer = await User.findOne({where:{email:userEmail}});
        buyer.addMembership(membershipToAdd?.id);
    }else{
        console.log('pago no procesado');
    }
}

module.exports=fulfillOrder;