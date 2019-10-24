const express = require('express')
const twilio = require('twilio')
const path = require('path')
const morgan = require('morgan')
const port = 3000 || process.env.PORT
const app = express()

require('dotenv').config()

const mailChimp = process.env.MAILCHIMP
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accountSid, authToken)

app.use(express.static( __dirname + '/'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
// Check Email
function validateEmail(email) {
  let emailRegex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return emailRegex.test(email);
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.post('/contact', function(req, res){
    let contactForm = req.body;
    const error = []
    // Check Name
    if (contactForm.contactName.length < 2) {
        res.send("Please enter your name.")
    }
    // Check Message
    if (contactForm.contactMessage.length < 15) {
        res.send("Please enter your message. It should have at least 15 characters.")
    }
    // Subject
    // if (contactForm.contactSubject == '') { $subject = "Contact Form Submission"; }

    if(validateEmail(contactForm.contactEmail)){
        // client.messages.create({
        //     body: `
        //     Contact: ${contactForm.contactName},  
        //     Subject: ${contactForm.contactSubject}, 
        //     Message: ${contactForm.contactMessage},
        //     Email: ${contactForm.contactEmail}`,
        //     to: '+16193667264',  // Text this number
        //     from: '+16194040210' // From a valid Twilio number
        // })
        // .then((message) => console.log(message.sid))
        // .done();
        res.send("Message sent")
    } else {
        res.status(500);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))