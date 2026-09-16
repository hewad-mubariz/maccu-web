import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Support" };

export default function SupportPage() {
  return (
    <ProsePage title="Support">
      <p>
        Need a hand with Maccu? We read every note. Tell us what is happening and
        we will help you get back to collecting the good stuff.
      </p>
      <p>
        Email{" "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>{" "}
        or visit our <a href="/contact">contact page</a>.
      </p>
      <p>
        Account deletion is explained here:{" "}
        <a href="/delete-account">Delete account</a>. Privacy and terms live
        at <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>.
      </p>
    </ProsePage>
  );
}
