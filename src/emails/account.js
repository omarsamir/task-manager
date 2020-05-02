const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'omarsamsoliman@gmail.com',
        subject: 'Thanks for joining us',
        text: `Welcome to the app, ${name}. Service is under construction`
    })
}


const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'omarsamsoliman@gmail.com',
        subject: 'Sorry to see you leave',
        text: `Bye Bye, ${name}. See you soon`
    })
}

module.exports = { sendWelcomeEmail, sendCancelEmail }