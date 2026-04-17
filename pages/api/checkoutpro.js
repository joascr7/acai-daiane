import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
 accessToken: process.env.MP_ACCESS_TOKEN_CHECKOUT
});

export default async function handler(req,res){

 const preference = new Preference(client);

 const result = await preference.create({
   body:{
     items:[
       {
         title:"Teste Produto",
         quantity:1,
         unit_price:20,
         currency_id:"BRL"
       }
     ]
   }
 });

 res.status(200).json({
   url: result.init_point
 });
}