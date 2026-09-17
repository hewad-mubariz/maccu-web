import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO, LEGAL_UPDATED } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using Maccu, including accounts, family sketchbooks, and Maccu Premium.",
};

export default function TermsPage() {
  return (
    <ProsePage title="Terms of Use" updated={LEGAL_UPDATED}>
      <p>
        These terms are the agreement between you and Maccu for the app and
        this website. If you do not agree, please do not use Maccu.
      </p>
      <p>
        Privacy is explained separately in our{" "}
        <a href="/privacy">Privacy Policy</a>. For store purchases, Apple&apos;s
        or Google&apos;s terms also apply.
      </p>

      <h2>What Maccu is</h2>
      <p>
        Maccu helps families capture children&apos;s drawings, keep them in
        sketchbooks, and hold onto them. Today that means:
      </p>
      <ul>
        <li>Photographing a drawing or choosing one from your photos</li>
        <li>On-device scanning so the page can live in a sketchbook</li>
        <li>Family profiles so siblings can have their own books</li>
        <li>Sharing a page through the system share sheet</li>
        <li>
          Optional Maccu Premium: more children, more pages, every notebook
          design, artwork effects, more export formats, and backup to your
          iCloud or Google Drive
        </li>
      </ul>
      <p>
        We may improve, pause, or retire a feature. Drawings already on your
        device stay yours.
      </p>

      <h2>Who may use it</h2>
      <p>
        You must be old enough to enter a contract in your country, typically
        a parent or guardian looking after a family sketchbook. Maccu is not a
        child&apos;s own account.
      </p>
      <p>
        If you add a child&apos;s name, age, photo, or artwork, you confirm you
        have the right to do so.
      </p>

      <h2>Your account</h2>
      <p>
        After the introduction you sign in with Apple, Google, or email. Keep
        that sign-in safe. You are responsible for activity on the account.
      </p>
      <p>
        We may suspend or close an account that breaks these terms or the law,
        or harms other people. You can delete your account at any time in the
        app (profile screen → <strong>Delete account</strong>), or ask us
        from the <a href="/delete-account">Delete account</a> page.
      </p>

      <h2>Your family&apos;s art</h2>
      <p>
        You keep the rights in the drawings and photos you add. You give Maccu
        a limited permission to process them on the device, show them in the
        app, export them when you ask, and, if you turn backup on, copy them
        into your own iCloud or Google Drive app data.
      </p>
      <p>
        Do not add material you are not allowed to keep. Do not use Maccu to
        harm anyone, to break the law, or to interfere with the service.
      </p>
      <p>
        Maccu, the name, the illustrations, and the product design are ours.
        Please do not copy them for another service.
      </p>

      <h2>Maccu Premium</h2>
      <p>
        Premium is an auto-renewing subscription. You can choose monthly or
        yearly. The title, length, and price are shown in the app and on the
        Apple App Store or Google Play before you pay.
      </p>
      <ul>
        <li>
          Payment is charged to your Apple ID or Google Play account when you
          confirm the purchase.
        </li>
        <li>
          The subscription renews automatically unless you turn auto-renew off
          at least 24 hours before the end of the current period.
        </li>
        <li>
          Your account is charged for renewal within 24 hours before the
          period ends.
        </li>
        <li>
          Manage or cancel in your Apple ID or Google Play subscription
          settings after purchase. Deleting the app or the Maccu account does
          not cancel the store subscription.
        </li>
        <li>
          To restore a purchase, use the same Apple ID or Google account that
          bought it.
        </li>
      </ul>
      <p>
        Without Premium you can still keep a sketchbook: one child profile, up
        to 25 saved drawings, the first notebook design, and basic exports
        (the drawing on white and the original photo). Premium unlocks
        unlimited children and pages, every notebook design, artwork effects,
        transparent and clean-scan exports, and cloud backup.
      </p>
      <p>
        If Premium ends, what you already saved remains on the device. New
        drawings, extra children, extra designs, effects, and backups follow
        the free limits until you subscribe again. You can delete older pages
        to make room, or upgrade.
      </p>

      <h2>Backups</h2>
      <p>
        Cloud backup is a Premium feature you turn on yourself. Copies go to
        your iCloud or Google Drive app data, under your Apple ID or Google
        account. Maccu is not a replacement for backing up your device. If you
        switch cloud accounts or delete those files, we cannot get them back.
      </p>

      <h2>The app and this site</h2>
      <p>
        We offer Maccu as it is. Scans depend on the photo, the lighting, and
        the device. We do not promise that every drawing will scan perfectly,
        that the service will never pause, or that a backup will always
        complete. To the fullest extent the law allows, Maccu is provided
        without warranties, including implied warranties of merchantability,
        fitness for a particular purpose, and non-infringement.
      </p>
      <p>
        To the fullest extent the law allows, Maccu is not liable for indirect,
        incidental, special, consequential, or lost-data damages, or for an
        amount above what you paid for Premium in the three months before the
        claim (or zero, if you have not paid). Some places do not allow these
        limits; there, they apply only as far as the law permits. Nothing in
        these terms limits rights you have as a consumer that cannot be
        waived.
      </p>

      <h2>Your licence</h2>
      <p>
        We give you a personal, non-transferable licence to use Maccu on
        devices you own or control, as the App Store or Google Play usage
        rules allow. You confirm that you are not in a country under a U.S.
        government embargo and are not on a U.S. government list of prohibited
        or restricted parties.
      </p>

      <h2>Apple and Google</h2>
      <p>
        If you download Maccu from the App Store, you and Maccu acknowledge
        that these terms are between you and Maccu, not Apple. Maccu, not
        Apple, is responsible for the app and its content. Apple has no
        obligation to provide maintenance or support for the app.
      </p>
      <p>
        If Maccu fails to conform to any applicable warranty, you may notify
        Apple, and Apple may refund the purchase price for the app; to the
        maximum extent permitted by law, Apple has no other warranty
        obligation. Apple is not responsible for addressing claims relating to
        the app or your use of it, including product liability claims, claims
        that the app fails to meet legal or regulatory requirements, and
        consumer-protection or similar claims. Maccu, not Apple, is
        responsible for investigating and handling any claim that the app
        infringes a third party&apos;s intellectual property.
      </p>
      <p>
        Questions and complaints about the app go to Maccu at{" "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>. You must also follow any
        third-party terms that apply when you use Maccu, such as your mobile
        carrier&apos;s. Apple and its subsidiaries are third-party
        beneficiaries of these terms and may enforce them against you.
      </p>
      <p>
        On Google Play, Google&apos;s terms for the store and for Play
        subscriptions also apply to those purchases.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as Maccu grows. The date at the top will
        change, and we will tell you in the app or by email before a
        significant change takes effect. If you keep using Maccu after an
        update, the new terms apply. If you do not accept them, stop using the
        app and delete your account.
      </p>

      <h2>Contact</h2>
      <p>
        Maccu ·{" "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        <br />
        Also:{" "}
        <a href="/privacy">Privacy Policy</a>
        {" · "}
        <a href="/support">Support</a>
        {" · "}
        <a href="/delete-account">Delete account</a>
      </p>
    </ProsePage>
  );
}
