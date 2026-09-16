import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO, LEGAL_UPDATED } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete account",
  description:
    "How to request deletion of a Maccu account and what that does — and does not — remove.",
};

const deleteMailto = `${CONTACT_MAILTO}?subject=Delete%20my%20Maccu%20account`;

export default function DeleteAccountPage() {
  return (
    <ProsePage title="Delete account" updated={LEGAL_UPDATED}>
      <p>
        You can ask us to delete your Maccu account at any time. You do not
        need the app installed to send the request.
      </p>
      <p>
        Write to{" "}
        <a href={deleteMailto}>{CONTACT_EMAIL}</a> from the email address on
        the account. Please say you want the Maccu account deleted. We will
        confirm when it is done.
      </p>

      <h2>What we delete</h2>
      <ul>
        <li>The sign-in account we hold for you</li>
        <li>
          Family profile records attached to that account (names, birth years,
          avatar details)
        </li>
      </ul>
      <p>
        Drawings on a phone or tablet stay there until you delete them or
        remove the app. We cannot reach into a device from this email request.
      </p>

      <h2>What we cannot cancel for you</h2>
      <ul>
        <li>
          <strong>Maccu Premium.</strong> A store subscription keeps renewing
          until you cancel it in Apple ID or Google Play settings. Deleting
          the Maccu account does not stop those charges.
        </li>
        <li>
          <strong>iCloud or Google Drive backups.</strong> Those files live in
          your Apple or Google account. Remove them there if you want the
          copies gone too.
        </li>
        <li>
          <strong>Pages you already shared.</strong> A picture sent to Photos,
          Messages, or somewhere else is outside Maccu.
        </li>
      </ul>

      <h2>Before you write</h2>
      <p>
        If you only want a fresh start on this device, signing out or deleting
        the app may be enough. If you want the account itself gone, email is
        the right path. We will not ask you to reinstall Maccu in order to
        request deletion.
      </p>
      <p>
        More about how information is handled:{" "}
        <a href="/privacy">Privacy Policy</a>
        {" · "}
        <a href="/terms">Terms of Use</a>
        {" · "}
        <a href="/support">Support</a>
      </p>
    </ProsePage>
  );
}
