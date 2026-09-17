import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO, LEGAL_UPDATED } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete account",
  description:
    "How to delete a Maccu account in the app or by request, and what that removes.",
};

const deleteMailto = `${CONTACT_MAILTO}?subject=Delete%20my%20Maccu%20account`;

export default function DeleteAccountPage() {
  return (
    <ProsePage title="Delete account" updated={LEGAL_UPDATED}>
      <p>
        You can delete your Maccu account at any time. The quickest way is in
        the app.
      </p>

      <h2>In the app</h2>
      <p>
        Open your child&apos;s profile, scroll to the bottom, tap{" "}
        <strong>Delete account</strong>, and confirm. This permanently
        deletes:
      </p>
      <ul>
        <li>your Maccu account</li>
        <li>
          family profiles attached to it (names, birth years, avatars and
          profile photos)
        </li>
        <li>drawings saved on that device</li>
        <li>
          Maccu backups in your iCloud or Google Drive, when the app can reach
          them
        </li>
      </ul>
      <p>This cannot be undone.</p>

      <h2>Without the app</h2>
      <p>
        If you no longer have Maccu installed, write to{" "}
        <a href={deleteMailto}>{CONTACT_EMAIL}</a> from the email address on
        the account and say you want it deleted. You do not need to reinstall
        the app. We will delete the account and its family profiles and
        profile photos, and confirm when it is done.
      </p>
      <p>
        We cannot reach a phone or tablet from an email request. Drawings on a
        device stay there until you delete them or remove the app, and
        backups in your iCloud or Google Drive stay until you remove them
        there.
      </p>

      <h2>What deleting does not cancel</h2>
      <ul>
        <li>
          <strong>Maccu Premium.</strong> A store subscription keeps renewing
          until you cancel it in your Apple ID or Google Play settings.
          Deleting the account does not stop those charges.
        </li>
        <li>
          <strong>Purchase records.</strong> Apple, Google, and RevenueCat may
          keep records of past purchases as billing and tax rules require.
        </li>
        <li>
          <strong>Pages you already shared.</strong> A picture sent to Photos,
          Messages, or somewhere else is outside Maccu.
        </li>
      </ul>

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
