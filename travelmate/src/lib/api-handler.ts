import { NextResponse } from "next/server";
import type { z } from "zod";
import { submitLead, type LeadType } from "@/lib/api";

/**
 * Shared POST handler: parses JSON, validates with Zod, drops honeypot spam
 * and forwards the lead. Keeps each route file to a single line.
 */
export function createLeadHandler<S extends z.ZodType>(type: LeadType, schema: S) {
  return async function POST(request: Request) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Please check the highlighted fields.", issues: parsed.error.issues }, { status: 422 });
    }

    // Honeypot filled → pretend success so bots learn nothing.
    if ((parsed.data as { company?: string }).company) {
      return NextResponse.json({ ok: true });
    }

    try {
      await submitLead(type, parsed.data as Parameters<typeof submitLead>[1]);
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error(`[${type}] failed`, error);
      return NextResponse.json({ message: "We couldn't send your message right now. Please call or WhatsApp us." }, { status: 502 });
    }
  };
}
