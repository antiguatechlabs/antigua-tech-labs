export const THANK_YOU_EMAIL_TEMPLATE_ES = (name: string) => `
  <div style="margin:0; padding:0; background-color:#f2f4f7; font-family: Arial, Helvetica, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background: linear-gradient(to right, #7546f7ff, #3e80f2ff); padding:14px 24px; color:#fff; font-size:14px; letter-spacing:0.3px; font-weight:bold;">
        ANTIGUA TECH LABS
      </div>
      
      <!-- Title -->
      <div style="padding:28px;">
        <h2 style="margin:0; font-size:24px; line-height:30px; color:#212121; border-bottom:2px solid #007bff; padding-bottom:10px;">
          ¡Gracias por contactarnos!
        </h2>
      </div>

      <!-- Card -->
      <div style="padding:20px 28px;">
        <div style="background-color:#f8f9fa; border-radius:10px; padding:24px;">
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">Estimado/a ${name},</p>
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">
            Gracias por comunicarte con Antigua Tech Labs. Hemos recibido tu mensaje y apreciamos tu interés en nuestros servicios.
          </p>
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">
            Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo en breve. Generalmente respondemos dentro de las 24 horas en días hábiles.
          </p>
          <p style="margin:0 0 16px 0; font-size:16px; line-height:24px; color:#333;">
            Si tienes alguna consulta urgente, no dudes en escribirnos directamente a
            <a href="mailto:info@antiguatechlabs.com" style="color:#007bff; text-decoration:none;">info@antiguatechlabs.com</a>.
          </p>

          <!-- CTA -->
          <div style="margin-top:8px;">
            <a href="mailto:info@antiguatechlabs.com?subject=Seguimiento%20de%20mi%20consulta"
              style="background-color:#007bff; color:#ffffff; font-size:15px; text-decoration:none; padding:12px 18px; border-radius:8px; display:inline-block;">
              Responder a este correo
            </a>
          </div>

          <!-- Signature -->
          <p style="margin:18px 0 0 0; font-size:16px; line-height:24px; color:#333;">
            Atentamente,<br>
            <strong>El equipo de Antigua Tech Labs</strong>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:16px 28px 28px 28px; border-top:1px solid #e6e6e6;">
        <p style="margin:0; font-size:12px; line-height:18px; color:#666;">
          Este es un mensaje automático de Antigua Tech Labs. Por favor, no respondas a este correo.
        </p>
        <p style="margin:6px 0 0 0; font-size:12px; line-height:18px; color:#666;">
          Antigua Guatemala • <a target="_blank" href="https://www.antiguatechlabs.com/es" style="color:#007bff; text-decoration:none;">antiguatechlabs.com</a>
        </p>
      </div>
    </div>

    <!-- Legal line -->
    <div style="max-width:600px; margin:12px auto 0 auto; text-align:center;">
      <p style="margin:0; font-size:11px; line-height:16px; color:#9aa0a6;">
        © Antigua Tech Labs. Todos los derechos reservados.
      </p>
    </div>
  </div>
`;

export const THANK_YOU_EMAIL_TEMPLATE = (name: string) => `
  <div style="margin:0; padding:0; background-color:#f2f4f7; font-family: Arial, Helvetica, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background: linear-gradient(to right, #7546f7ff, #3e80f2ff); padding:14px 24px; color:#fff; font-size:14px; letter-spacing:0.3px; font-weight:bold;">
        ANTIGUA TECH LABS
      </div>
      
      <!-- Title -->
      <div style="padding:28px;">
        <h2 style="margin:0; font-size:24px; line-height:30px; color:#212121; border-bottom:2px solid #007bff; padding-bottom:10px;">
          Thank You for Contacting Us!
        </h2>
      </div>

      <!-- Card -->
      <div style="padding:20px 28px;">
        <div style="background-color:#f8f9fa; border-radius:10px; padding:24px;">
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">Dear ${name},</p>
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">
            Thank you for reaching out to Antigua Tech Labs. We have received your message and appreciate your interest in our services.
          </p>
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">
            Our team will review your inquiry and get back to you shortly. We typically respond within 24 hours during business days.
          </p>
          <p style="margin:0 0 16px 0; font-size:16px; line-height:24px; color:#333;">
            If you have any urgent questions, please feel free to contact us directly at
            <a href="mailto:info@antiguatechlabs.com" style="color:#007bff; text-decoration:none;">info@antiguatechlabs.com</a>.
          </p>

          <!-- CTA -->
          <div style="margin-top:8px;">
            <a href="mailto:info@antiguatechlabs.com?subject=Follow-up%20on%20my%20inquiry"
              style="background-color:#007bff; color:#ffffff; font-size:15px; text-decoration:none; padding:12px 18px; border-radius:8px; display:inline-block;">
              Reply to this email
            </a>
          </div>

          <!-- Signature -->
          <p style="margin:18px 0 0 0; font-size:16px; line-height:24px; color:#333;">
            Best regards,<br>
            <strong>The Antigua Tech Labs Team</strong>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:16px 28px 28px 28px; border-top:1px solid #e6e6e6;">
        <p style="margin:0; font-size:12px; line-height:18px; color:#666;">
          This is an automated response from Antigua Tech Labs. Please do not reply to this email.
        </p>
        <p style="margin:6px 0 0 0; font-size:12px; line-height:18px; color:#666;">
          Antigua Guatemala • <a target="_blank" href="https://www.antiguatechlabs.com/en">antiguatechlabs.com</a>
        </p>
      </div>
    </div>

    <!-- Legal line -->
    <div style="max-width:600px; margin:12px auto 0 auto; text-align:center;">
      <p style="margin:0; font-size:11px; line-height:16px; color:#9aa0a6;">
        © Antigua Tech Labs. All rights reserved.
      </p>
    </div>
  </div>
`;

export const NOTIFICATION_EMAIL_TEMPLATE = (
  name: string,
  email: string,
  message: string,
) => `
  <div style="margin:0; padding:0; background-color:#f2f4f7; font-family: Arial, Helvetica, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #0056d6, #00c2ff); padding:14px 24px; color:#fff; font-size:14px; letter-spacing:0.3px; font-weight:bold;">
        ANTIGUA TECH LABS
      </div>
      
      <!-- Title -->
      <div style="padding:28px;">
        <h2 style="margin:0; font-size:24px; line-height:30px; color:#212121; border-bottom:2px solid #007bff; padding-bottom:10px;">
          New Contact Form Submission
        </h2>
      </div>

      <!-- Card -->
      <div style="padding:20px 28px;">
        <div style="background-color:#f8f9fa; border-radius:10px; padding:24px;">
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">
            <strong>Name:</strong> ${name}
          </p>
          <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#333;">
            <strong>Email:</strong> <a href="mailto:${email}" style="color:#007bff; text-decoration:none;">${email}</a>
          </p>
          <p style="margin:0 0 8px 0; font-size:16px; line-height:24px; color:#333;">
            <strong>Message:</strong>
          </p>
          <div style="background-color:#ffffff; padding:15px; border-left:4px solid #007bff; margin-top:10px; font-size:15px; line-height:22px; color:#444;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:16px 28px 28px 28px; border-top:1px solid #e6e6e6;">
        <p style="margin:0; font-size:12px; line-height:18px; color:#666;">
          This message was sent from the Antigua Tech Labs contact form.
        </p>
      </div>
    </div>

    <!-- Legal line -->
    <div style="max-width:600px; margin:12px auto 0 auto; text-align:center;">
      <p style="margin:0; font-size:11px; line-height:16px; color:#9aa0a6;">
        © Antigua Tech Labs. All rights reserved.
      </p>
    </div>
  </div>
`;

export const getThankYouEmail = (lang: string, name: string) => {
  if(lang === 'es') return THANK_YOU_EMAIL_TEMPLATE_ES(name);
  return THANK_YOU_EMAIL_TEMPLATE(name);
};


export const THANK_YOU_TEXT_TEMPLATE = (name: string) => `
Dear ${name},

Thank you for reaching out to Antigua Tech Labs. We have received your message and appreciate your interest in our services.

Our team will review your inquiry and get back to you shortly. We typically respond within 24 hours during business days.

If you have any urgent questions, please feel free to contact us directly at info@antiguatechlabs.com.

Best regards,
The Antigua Tech Labs Team
`;

export const THANK_YOU_TEXT_TEMPLATE_ES = (name: string) => `
Estimado/a ${name},

Gracias por comunicarte con Antigua Tech Labs. Hemos recibido tu mensaje y apreciamos tu interés en nuestros servicios.

Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo en breve. Generalmente respondemos dentro de las 24 horas en días hábiles.

Si tienes alguna consulta urgente, no dudes en escribirnos directamente a info@antiguatechlabs.com.

Atentamente,
El equipo de Antigua Tech Labs
`;

export const getThankYouText = (lang: string, name: string) => {
  if (lang === 'es') return THANK_YOU_TEXT_TEMPLATE_ES(name);
  return THANK_YOU_TEXT_TEMPLATE(name);
};
