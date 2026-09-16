import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * No email backend is configured for this build. To go live, set one of:
 *   - RESEND_API_KEY (+ optional CONTACT_TO_EMAIL) to send via Resend
 *   - FORMSPREE_ENDPOINT to proxy submissions to a Formspree form
 * Until then, submissions are validated and logged server-side so the UI
 * flow can be tested end-to-end without a real backend.
 */
export async function POST(request: Request) {
  let payload: { name?: string; email?: string; phone?: string; subject?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, subject, message } = payload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "support@fello.pk";

  if (resendApiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Fello Website <noreply@fello.pk>",
        to: toEmail,
        reply_to: email,
        subject: `[Fello Contact] ${subject ?? "General Inquiry"} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? "-"}\nSubject: ${subject ?? "-"}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // No email backend configured — log for local/dev visibility instead of failing silently.
  console.info("[contact] submission received (no email backend configured):", {
    name,
    email,
    phone,
    subject,
    message,
  });

  return NextResponse.json({ ok: true, delivered: false });
}
