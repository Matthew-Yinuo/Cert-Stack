import * as sgMail from "@sendgrid/mail";
import { ISendEmailInput } from "../types/graphql-utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async ({
  recipient,
  subject,
  html
}: ISendEmailInput) => {
  const msg = {
    to: recipient,
    from: "Accredible Support <support@accredible.com>",
    subject,
    html
  };

  sgMail.send(msg);
};
