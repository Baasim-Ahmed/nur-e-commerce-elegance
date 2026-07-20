import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NURÉ" },
      { name: "description", content: "Speak to a NURÉ client advisor — private appointments, orders, and press." },
      { property: "og:title", content: "Contact — NURÉ" },
      { property: "og:description", content: "Speak to a NURÉ client advisor." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message required").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
      <header className="border-b border-warm-taupe/25 py-16 md:py-24">
        <p className="eyebrow">Correspondence</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-8xl">
          Write to <em className="not-italic text-champagne-deep">the maison.</em>
        </h1>
      </header>

      <div className="grid gap-16 py-16 md:grid-cols-[1fr_1.4fr] md:gap-24 md:py-24">
        <div>
          <p className="eyebrow">Client Services</p>
          <p className="mt-4 font-serif text-2xl leading-relaxed">clients@nure.house</p>
          <p className="mt-8 eyebrow">Press</p>
          <p className="mt-4 font-serif text-2xl leading-relaxed">press@nure.house</p>
          <p className="mt-8 eyebrow">Atelier</p>
          <p className="mt-4 text-sm leading-relaxed text-matte-black/75">
            18 rue de l'Atelier<br />
            75008 Paris, France<br />
            +33 1 42 00 00 00
          </p>
          <p className="mt-8 eyebrow">Hours</p>
          <p className="mt-4 text-sm text-matte-black/75">Tue – Sat · 10:00 — 19:00</p>
        </div>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget).entries());
            const r = schema.safeParse(data);
            if (!r.success) {
              const errs: Record<string, string> = {};
              for (const issue of r.error.issues) errs[issue.path[0] as string] = issue.message;
              setErrors(errs);
              return;
            }
            setErrors({});
            setSent(true);
          }}
          noValidate
        >
          {sent ? (
            <div className="border border-champagne bg-soft-beige p-10 text-center">
              <p className="eyebrow">Received</p>
              <p className="mt-4 font-serif text-3xl">Thank you.</p>
              <p className="mt-3 text-sm text-matte-black/70">A client advisor will write to you within one business day.</p>
            </div>
          ) : (
            <>
              <Field name="name" label="Name" error={errors.name} />
              <Field name="email" label="Email" type="email" error={errors.email} />
              <Field name="message" label="Message" textarea error={errors.message} />
              <button className="btn-primary">Send message</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ name, label, type = "text", textarea = false, error }: { name: string; label: string; type?: string; textarea?: boolean; error?: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const float = focused || value.length > 0;
  const cls = `w-full border-b bg-transparent pt-6 pb-2 text-base outline-none transition-colors ${
    error ? "border-destructive" : focused ? "border-champagne" : "border-warm-taupe/40"
  }`;
  return (
    <label className="relative block">
      <span className={`pointer-events-none absolute left-0 transition-all duration-300 ${float ? "top-0 text-[10px] uppercase tracking-[0.22em] text-warm-taupe" : "top-6 text-sm text-matte-black/60"}`}>{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cls}
          maxLength={1000}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cls}
          maxLength={255}
        />
      )}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}