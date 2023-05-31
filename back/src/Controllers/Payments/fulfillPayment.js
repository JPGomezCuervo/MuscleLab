const { User, StatusMemberships, Membership } = require('../../db.js');
const SENDMAIL= require('./mailer.js');

const fulfillOrder = async(session) => {
    // TODO: fill me in
    const userEmail=session.customer_email;
    const plan=session.line_items.data[0].description;
    console.log(plan);
    if(session.payment_status==='paid'){
        const membershipToAdd = await Membership.findOne({where:{name:plan}});
        if(!membershipToAdd){
            throw new Error("Membresia no encontrada");
        }
        const buyer = await User.findOne({where:{email:userEmail}});
        if(!buyer){
            throw new Error('Usuario no encontrado');
        }
        const duration=membershipToAdd.duration.split(' ')[0];
        const final=new Date();
        let classesToTake=0;
        final.setMonth(final.getMonth()+Number(duration));
        if(membershipToAdd.name==="Premium") classesToTake=6;
        if(membershipToAdd.name==="Plus") classesToTake=4;
        if(membershipToAdd.name==="Standar") classesToTake=2;
        const statusMember= await StatusMemberships.create({
            name:membershipToAdd.name,
            status:true,
            start: new Date(),
            end:final,
            countRemain: classesToTake,
            userId: buyer.id
        });
        const mail = {
            from: "MuscleLba <musclelabgyms@gmail.com>", // sender address
            to: userEmail, // receiver email
            subject: "Compra Exitosa", // Subject line
            text: `Compro su membresia ${membershipToAdd.name} con exito. Vence el ${final}`
        }
        SENDMAIL(mail, (info)=>{
            console.log("Mail enviado");
            console.log("Message Id:", info.messageId);
        })
    }else{
        throw new Error("Pago no procesado");
    }
}

module.exports=fulfillOrder;