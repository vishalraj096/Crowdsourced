
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};


export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Crowdsourced Reviews" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};


export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Crowdsourced Reviews!';
  const html = `
    <h1>Welcome ${user.name}!</h1>
    <p>Thank you for joining Crowdsourced Reviews. Start exploring and reviewing local businesses in your area.</p>
    <p>Happy reviewing!</p>
  `;
  
  await sendEmail({
    to: user.email,
    subject,
    html
  });
};

export const sendReviewApprovalEmail = async (user, review) => {
  const subject = 'Your review has been approved';
  const html = `
    <h1>Review Approved</h1>
    <p>Hi ${user.name},</p>
    <p>Your review titled "${review.title}" has been approved and is now live on our platform.</p>
    <p>Thank you for contributing to our community!</p>
  `;
  
  await sendEmail({
    to: user.email,
    subject,
    html
  });
};
