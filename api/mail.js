
const nodemailer = require("nodemailer");
const busboy = require('busboy');

export default function handler(request, response) {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
    });

    const params = {};
    const bb = busboy({ headers: request.headers });

    bb.on('file', (_0, file, _1) => {
        file.on('data', (data) => {
            params.buffer = data;
        })
    })

    bb.on('field', (name, val) => {
        params[name] = val;
    })

    bb.on('close', async () => { // fin du flux de données
        const { firstname, lastname, email } = params;
        
        // Send mail with defined transport object
        try {
            let info = await transporter.sendMail({
                from: '"Lafia Consulting" <marketing@lafiaconsulting.com>',
                to: email,
                subject: 'Votre tampon digtal',
                text: 'Bonjour text',
                html: `Bonjour ${firstname} ${lastname.toUpperCase()}, Veuillez trouver votre tampon en pièce jointe.`,
                attachments: [
                    {
                        filename: 'tampon.png',
                        content: params.buffer
                    }
                ]
            });

            response.status(200).json({
                msg: 'Le mail a bien été envoyé.'
            });

        } catch(e) {
            console.log(e);
            response.status(500).json({
                msg: 'Une erreur est survenue lors de l\'envoi du mail.'
            });
        }
        
    })

    request.pipe(bb) // association d'un flux de données à la requête transmise
}