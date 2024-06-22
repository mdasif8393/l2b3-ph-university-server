import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'md.asif.8393@gmail.com',
      pass: 'bxqy ipsy samp zsth',
    },
  });

  await transporter.sendMail({
    from: 'md.asif.8393@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
