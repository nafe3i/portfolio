import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser";

export interface ContactMessage {
  email: string;
  message: string;
  name: string;
}

interface EmailJsConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

function getEmailJsConfig(): EmailJsConfig {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS configuration is missing.");
  }

  return { publicKey, serviceId, templateId };
}

export function sendContactMessage({
  email,
  message,
  name,
}: ContactMessage): Promise<EmailJSResponseStatus> {
  const { publicKey, serviceId, templateId } = getEmailJsConfig();
  const time = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  return emailjs.send(
    serviceId,
    templateId,
    {
      name,
      message,
      reply_to: email,
      time,
    },
    { publicKey },
  );
}
