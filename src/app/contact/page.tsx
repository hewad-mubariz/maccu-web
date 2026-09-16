import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <ProsePage title="Contact">
      <p>
        We would love to hear from you — families, teachers, and fellow keepers of
        small masterpieces.
      </p>
      <p>
        Write to <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
      </p>
    </ProsePage>
  );
}
