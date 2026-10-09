import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/data/translations";
import { sendContactMessage, type ContactMessage } from "@/services/email";

type ContactValues = ContactMessage;

type ContactField = keyof ContactValues;
type ContactErrors = Partial<Record<ContactField, TranslationKey>>;
type SubmitStatus = "idle" | "sending" | "success" | "error";

const initialValues: ContactValues = { email: "", message: "", name: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_STATE_DURATION_MS = 2500;

function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = "contact.form.name.error";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "contact.form.email.error";
  }

  if (values.message.trim().length < 10) {
    errors.message = "contact.form.message.error";
  }

  return errors;
}

export function ContactForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const resetTimeout = useRef<number | undefined>(undefined);
  const isSending = status === "sending";

  useEffect(() => {
    return () => window.clearTimeout(resetTimeout.current);
  }, []);

  function updateField(field: ContactField, value: string) {
    window.clearTimeout(resetTimeout.current);
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      await sendContactMessage(values);
      setStatus("success");
      resetTimeout.current = window.setTimeout(() => {
        setValues(initialValues);
        setErrors({});
        setStatus("idle");
      }, SUCCESS_STATE_DURATION_MS);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Card className="h-full !rounded-2xl !border-border-default !bg-bg-surface !shadow-none">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-2xl font-black tracking-tight text-text-primary">
          {t("contact.form.title")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          {t("contact.form.description")}
        </p>

        <form className="mt-8 space-y-4" noValidate onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="contact-name">{t("contact.form.name.label")}</Label>
            <Input
              id="contact-name"
              name="name"
              value={values.name}
              disabled={isSending}
              onChange={(event) => updateField("name", event.target.value)}
              aria-describedby="contact-name-error"
              aria-invalid={Boolean(errors.name)}
              className="mt-2 aria-[invalid=true]:border-state-error"
            />
            <p
              id="contact-name-error"
              className="mt-1 min-h-5 text-sm text-state-error"
              aria-live="polite"
            >
              {errors.name ? t(errors.name) : null}
            </p>
          </div>

          <div>
            <Label htmlFor="contact-email">{t("contact.form.email.label")}</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              disabled={isSending}
              onChange={(event) => updateField("email", event.target.value)}
              aria-describedby="contact-email-error"
              aria-invalid={Boolean(errors.email)}
              className="mt-2 aria-[invalid=true]:border-state-error"
            />
            <p
              id="contact-email-error"
              className="mt-1 min-h-5 text-sm text-state-error"
              aria-live="polite"
            >
              {errors.email ? t(errors.email) : null}
            </p>
          </div>

          <div>
            <Label htmlFor="contact-message">{t("contact.form.message.label")}</Label>
            <Textarea
              id="contact-message"
              name="message"
              value={values.message}
              disabled={isSending}
              onChange={(event) => updateField("message", event.target.value)}
              aria-describedby="contact-message-error"
              aria-invalid={Boolean(errors.message)}
              className="mt-2 aria-[invalid=true]:border-state-error"
            />
            <p
              id="contact-message-error"
              className="mt-1 min-h-5 text-sm text-state-error"
              aria-live="polite"
            >
              {errors.message ? t(errors.message) : null}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSending}
            className="w-full rounded-full !bg-accent-primary !text-accent-foreground hover:!bg-accent-primary/90 focus-visible:!ring-accent-2-from"
          >
            {isSending ? (
              <LoaderCircle
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            {isSending ? t("contact.form.sending") : t("contact.form.submit")}
          </Button>

          {status === "error" ? (
            <p className="min-h-6 text-sm leading-6 text-state-error" role="alert">
              {t("contact.form.error").replace("{email}", t("contact.email"))}
            </p>
          ) : (
            <p
              className="flex min-h-6 items-center gap-2 text-sm text-state-success"
              role="status"
            >
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              ) : null}
              {status === "success" ? t("contact.form.ready") : null}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
