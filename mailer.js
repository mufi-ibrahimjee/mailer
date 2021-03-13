var id_array = ["mufaddaljamaly2752@gmail.com","pahujanomit@gmail.com"];
var no_array = ["1","2"];

var mailer = require("nodemailer");

  var smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
 });

 let emailPromiseArray = [];

    for(let i=0;i<id_array.length;i++){
         emailPromiseArray.push(
             sendMail({
                  from: process.env.EMAIL,
                  to: id_array[i],
                  subject: "Welcome to Byte Avenue",
                  html: ``
             })
         )
    }
    
    Promise.all(emailPromiseArray).then((result)=>{
        console.log('all mails completed');
    }).catch((error)=>{
        console.log(error);
    })

    function sendMail(mail){

        return new Promise((resolve,reject)=>{
            smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
            reject(error);
        }else{
            console.log("Message sent: " + JSON.stringify(response));
            resolve(response);
        }

        smtpTransport.close();
            });
        })
    }