import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Maccu",
  robots: { index: false, follow: false },
};

// Only reached when iOS did not hand the link to the app: Maccu isn't
// installed, or the mail app (Gmail, usually) opened it in its own browser.
// Nothing here spends the token — the app does that — so mail scanners that
// preview the link can't use it up before the parent taps it.
export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token_hash, type } = await searchParams;
  const valid = typeof token_hash === "string" && typeof type === "string";
  const appLink = valid
    ? `maccu:///sign-in?${new URLSearchParams({ token_hash, type })}`
    : null;

  return (
    <ProsePage title="Open Maccu">
      {appLink ? (
        <>
          <p>
            Your sign-in link is ready. Tap the button on the iPhone or iPad
            where Maccu is installed.
          </p>
          <p>
            <a
              href={appLink}
              className="inline-block rounded-full bg-coral px-6 py-3 font-serif text-white! no-underline! shadow-[0_6px_14px_rgb(224_106_80/0.24)] transition-colors hover:bg-coral-deep"
            >
              Open in Maccu
            </a>
          </p>
          <p>
            Reading this on a computer? Open the email on your phone instead.
            The link works once, and for one hour.
          </p>
        </>
      ) : (
        <p>
          This sign-in link is incomplete. Ask Maccu to send a new one, and
          open it from the email on your phone.
        </p>
      )}
      <p>
        Still stuck? Write to <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
      </p>
    </ProsePage>
  );
}
