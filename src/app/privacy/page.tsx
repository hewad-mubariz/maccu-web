import { ProsePage } from "@/components/prose-page";
import { CONTACT_EMAIL, CONTACT_MAILTO, LEGAL_UPDATED } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Maccu handles family profiles, drawings, sign-in, Premium, and optional backups.",
};

export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy Policy" updated={LEGAL_UPDATED}>
      <p>
        Maccu is a family sketchbook. You photograph a drawing, keep it in a
        notebook, and watch a childhood of pictures grow. This policy explains
        what we collect to make that work, where it lives, and the choices you
        have.
      </p>
      <p>
        We do not sell personal data. We do not show ads. We do not use
        children&apos;s art to train models. Drawings stay on your device unless
        you share them or turn on a Premium backup to your own iCloud or Google
        Drive.
      </p>
      <p>
        Questions:{" "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Who Maccu is for</h2>
      <p>
        Maccu is for parents and other grown-ups who look after a child&apos;s
        art. The account, purchases, backups, and family profiles live in the
        Grown-up corner. Children do not create their own Maccu accounts.
      </p>
      <p>
        If you add a child&apos;s name, age, photo, or drawings, you are
        responsible for doing so with the care that family material deserves,
        and only for children you are allowed to represent.
      </p>

      <h2>Information we keep</h2>
      <h3>Your account</h3>
      <p>
        Signing in is required after you finish the short introduction. You can
        use Sign in with Apple, Google, or an email magic link. We receive the
        identifiers those services provide so we can create and recognise your
        account — typically an email address, and, on the first Apple sign-in,
        the name you choose to share.
      </p>
      <p>
        Sessions are stored securely on your device. Account records are held
        by our authentication provider, Supabase.
      </p>

      <h3>Family profiles</h3>
      <p>
        You can create a profile for a child: a name, an optional age (stored
        as a birth year), and an avatar — either a colour character or a photo
        you choose. Free Maccu includes one child profile; Maccu Premium
        removes that limit.
      </p>
      <p>
        Profile details sync with your signed-in account so they follow you on
        a new device. Custom avatar photos are stored privately with that
        account. Drawings are not stored in this profile database.
      </p>

      <h3>Drawings and photos</h3>
      <p>
        When you photograph a picture, Maccu uses the camera. You can also pick
        a photo you already have, or a picture for a profile. Processing
        happens on your device: we find the page, tidy the scan, and save a
        sketchbook image. There is no cloud vision service and no AI model
        training.
      </p>
      <p>
        Saved pages live in Maccu&apos;s storage on your phone or tablet,
        together with notebook choices such as which sketchbook design you
        picked. Original photos can stay on the device if you keep them.
      </p>

      <h3>Preferences</h3>
      <p>
        Language (English, Deutsch, Français, Español), whether you have
        finished onboarding, backup choices, and similar settings stay on the
        device.
      </p>

      <h3>Purchases</h3>
      <p>
        Maccu Premium is an auto-renewing subscription sold through the Apple
        App Store or Google Play. We use RevenueCat to know whether your
        account has Premium. RevenueCat receives your Maccu account identifier
        and the purchase events the store already has — not your drawings.
      </p>
      <p>
        Payment card details are handled by Apple or Google, not by Maccu.
      </p>

      <h2>Where drawings go</h2>
      <p>
        By default, artwork stays on the device. It leaves the device only
        when you choose one of these:
      </p>
      <ul>
        <li>
          <strong>Share or export</strong> — you pick a format and a
          destination in the system share sheet (a message, Photos, Files, and
          so on). Maccu does not follow the file after you share it.
        </li>
        <li>
          <strong>Premium backup</strong> — optional copies in your own iCloud
          (iOS) or Google Drive app data (Android). These folders belong to
          your Apple ID or Google account, not to a public gallery. You can
          include original photos in a backup or leave them off. Temporary
          processing files stay on the device.
        </li>
      </ul>
      <p>
        If Premium lapses, drawings and profiles already on the device remain.
        New pages, extra children, extra notebook designs, effects, and
        backups follow the free limits until you subscribe again.
      </p>

      <h2>Who else sees information</h2>
      <p>
        We share only what is needed to run Maccu:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — sign-in, your account, family profile
          records, and private profile photos.
        </li>
        <li>
          <strong>Apple or Google</strong> — sign-in you choose, store
          purchases, and, if you turn backup on, files in your iCloud or Drive
          app data.
        </li>
        <li>
          <strong>RevenueCat</strong> — whether this account has Maccu Premium.
        </li>
      </ul>
      <p>
        We do not sell this information. We do not use advertising networks,
        analytics SDKs, or crash reporters in the current app. If the law
        requires us to disclose something, or we must protect someone from
        serious harm, we will do as little as that duty requires.
      </p>

      <h2>Children&apos;s information</h2>
      <p>
        Maccu is not directed at children as account holders. A grown-up
        creates the account and any child profiles. Information about a child
        — a name, optional age, avatar, and artwork — is provided by that
        grown-up so the sketchbook can be organised.
      </p>
      <p>
        We do not knowingly let a child create an account. If you believe a
        child has done so, write to us and we will delete it. We do not use
        children&apos;s drawings or profiles to train models or to advertise.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Change language in Grown-up corner.</li>
        <li>Edit or remove a child profile you added.</li>
        <li>Delete a drawing from a sketchbook.</li>
        <li>Share a page only when you choose to.</li>
        <li>
          Turn Premium backup on or off, and choose whether originals are
          included.
        </li>
        <li>
          Restore purchases on another device signed into the same store
          account, subject to the store&apos;s rules.
        </li>
        <li>
          Ask us to correct account details or to delete your Maccu account
          — see{" "}
          <a href="/delete-account">Delete account</a>.
        </li>
      </ul>
      <p>
        Camera and photo access are granted in system settings and can be
        withdrawn there. Maccu needs them only to capture or import drawings
        and a profile picture.
      </p>

      <h2>Deleting your account</h2>
      <p>
        Email{" "}
        <a href={`${CONTACT_MAILTO}?subject=Delete%20my%20Maccu%20account`}>
          {CONTACT_EMAIL}
        </a>{" "}
        from the address on the account and we will delete the Maccu account
        and the family profile records attached to it. More detail is on the{" "}
        <a href="/delete-account">delete account</a> page.
      </p>
      <p>
        Deleting Maccu does not cancel an App Store or Google Play
        subscription — you turn that off in the store settings. Backups that
        already sit in your iCloud or Google Drive stay under your Apple or
        Google account until you remove them there.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Account and profile records last for as long as the account exists.
        Drawings on the device last until you delete them or remove the app
        (unless you restored them from a backup you control). If you delete
        the account, we remove the Maccu records we hold; store receipts and
        cloud copies you own follow Apple&apos;s and Google&apos;s own rules.
      </p>

      <h2>Keeping it safe</h2>
      <p>
        We use signed-in accounts, encrypted sessions on the device, and
        private storage for profile photos. No method is perfect. Please keep
        your Apple ID, Google account, and email safe, especially if a child
        can pick up the same phone.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how Maccu handles information in a way that matters, we
        will update this page and the date above. Continued use after a change
        means you are looking at the current policy.
      </p>

      <h2>Contact</h2>
      <p>
        Maccu ·{" "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        <br />
        Also:{" "}
        <a href="/support">Support</a>
        {" · "}
        <a href="/terms">Terms</a>
        {" · "}
        <a href="/delete-account">Delete account</a>
      </p>
    </ProsePage>
  );
}
