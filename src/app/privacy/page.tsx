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
        what we collect to make that work, where it lives, who helps us run
        it, and the choices you have.
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
        If you add a child&apos;s name, age, photo, or drawings, please do so
        only for children you are allowed to represent.
      </p>

      <h2>Information we keep</h2>
      <h3>Your account</h3>
      <p>
        Signing in is required after the short introduction. You can use Sign
        in with Apple, Google, or an email sign-in link. We receive what those
        services provide so we can create and recognise your account: an
        account identifier, usually an email address, and on the first Apple
        sign-in the name you choose to share.
      </p>
      <p>
        Sign-in sessions are kept in your device&apos;s secure storage (the
        iOS Keychain or Android&apos;s equivalent). Account records are held by
        our authentication provider, Supabase.
      </p>

      <h3>Family profiles</h3>
      <p>
        You can create a profile for a child: a name, an optional age (stored
        as a birth year), and an avatar, either a colour character or a photo
        you choose. We also store which profile is currently selected. Free
        Maccu includes one child profile; Maccu Premium removes that limit.
      </p>
      <p>
        Profile details sync with your signed-in account so they follow you to
        a new device. Avatar photos are stored privately with that account.
        Drawings are not stored in this profile database.
      </p>

      <h3>Drawings and photos</h3>
      <p>
        Maccu uses the camera when you photograph a drawing, and your photo
        library when you pick an existing photo or a profile picture.
        Processing happens on your device: Maccu finds the drawing, tidies the
        scan, and saves a sketchbook page. There is no cloud vision service and
        no AI model training.
      </p>
      <p>
        Saved pages, the original photo each page was made from, and notebook
        choices such as which sketchbook design you picked are kept in
        Maccu&apos;s storage on your phone or tablet.
      </p>

      <h3>Preferences</h3>
      <p>
        Your language, whether you have finished the introduction, backup
        choices, and similar settings stay on the device.
      </p>

      <h3>Purchases</h3>
      <p>
        Maccu Premium is an auto-renewing subscription sold through the Apple
        App Store or Google Play. We use RevenueCat to know whether your
        account has Premium. RevenueCat receives your Maccu account identifier,
        your purchase and subscription history from the store, and basic
        technical information about the device and app. It does not receive
        your drawings or family profiles.
      </p>
      <p>
        Payment details are handled by Apple or Google, never by Maccu.
      </p>

      <h2>How we use it</h2>
      <p>
        We use this information only to run Maccu: to sign you in, keep family
        profiles in sync, provide Premium to the account that bought it, run
        backups you turn on, answer your messages, and keep the service secure.
      </p>
      <p>
        Where the law asks for a legal basis, we rely on providing the service
        you asked for (your account, profiles, Premium, and backups), on legal
        obligations (such as keeping purchase records), and on our legitimate
        interest in keeping Maccu secure and working.
      </p>

      <h2>Where drawings go</h2>
      <p>
        By default, artwork stays on the device. It leaves the device only
        when you choose one of these:
      </p>
      <ul>
        <li>
          <strong>Share or export:</strong> you pick a format and a
          destination in the system share sheet (a message, Photos, Files, and
          so on). Maccu does not follow the file after you share it.
        </li>
        <li>
          <strong>Premium backup:</strong> optional copies in your own iCloud
          (iOS) or Google Drive app data (Android). These belong to your Apple
          ID or Google account, and we cannot see them. You choose whether
          original photos are included.
        </li>
      </ul>
      <p>
        If Premium ends, drawings and profiles already on the device remain.
      </p>

      <h2>Who helps us run Maccu</h2>
      <p>We share only what each service needs to do its job:</p>
      <ul>
        <li>
          <strong>Supabase</strong>: sign-in, your account, family profile
          records, and private profile photos.
        </li>
        <li>
          <strong>Brevo</strong>: delivers sign-in emails, so it receives your
          email address and the email itself.
        </li>
        <li>
          <strong>Apple or Google</strong>: the sign-in you choose, store
          purchases, and, if you turn backup on, files in your iCloud or
          Google Drive app data.
        </li>
        <li>
          <strong>RevenueCat</strong>: whether your account has Maccu Premium.
        </li>
      </ul>
      <p>
        When the app connects to these services they also receive standard
        technical details such as your IP address and device type. Each of
        them may use your information only to provide its service and must
        protect it at least as well as this policy does. Some of them process
        data outside your country; where the law requires it, those transfers
        are covered by safeguards such as standard contractual clauses.
      </p>
      <p>
        We do not use advertising networks, analytics SDKs, or crash
        reporting in the app. We disclose information only if the law requires
        it or to protect someone from serious harm, and then only as much as
        that requires.
      </p>

      <h2>Children&apos;s information</h2>
      <p>
        Maccu is not directed at children as account holders. A grown-up
        creates the account and any child profiles. Information about a child
        (a name, optional age, avatar, and artwork) is added by that grown-up
        so the sketchbook can be organised.
      </p>
      <p>
        We do not knowingly let a child create an account. If you believe a
        child has done so, write to us and we will delete it. We never use
        children&apos;s drawings or profiles to train models or for
        advertising.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>Edit or remove a child profile you added.</li>
        <li>Delete a drawing from a sketchbook.</li>
        <li>Share a page only when you choose to.</li>
        <li>
          Turn Premium backup on or off, and choose whether originals are
          included.
        </li>
        <li>
          Allow or withdraw camera and photo access at any time in your
          device&apos;s settings.
        </li>
        <li>Delete your account in the app (see below).</li>
      </ul>
      <p>
        Depending on where you live, you may also have the right to access,
        correct, export, or delete your information, to object to or restrict
        how we use it, and to complain to your local data protection
        authority. Write to{" "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a> and we will respond
        within the time the law allows.
      </p>

      <h2>Deleting your account</h2>
      <p>
        In the app, open your child&apos;s profile, scroll to the bottom, and
        tap <strong>Delete account</strong>. This permanently deletes:
      </p>
      <ul>
        <li>your Maccu account</li>
        <li>child profiles and profile photos</li>
        <li>drawings saved on that device</li>
        <li>
          Maccu backups in your iCloud or Google Drive, when the app can reach
          them
        </li>
      </ul>
      <p>
        If you no longer have the app, you can ask us to delete the account
        from the <a href="/delete-account">Delete account</a> page. We cannot
        reach drawings on your devices or files in your iCloud or Google Drive
        from there, so please remove those yourself.
      </p>
      <p>
        Deleting your account does not cancel an App Store or Google Play
        subscription; turn that off in your store settings. Apple, Google, and
        RevenueCat may keep records of past purchases as billing and tax rules
        require.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Account and profile records are kept for as long as the account exists
        and are deleted when you delete the account. Drawings on the device
        are kept until you delete them, delete the account, or remove the app.
        Records we must keep by law, such as purchase records, are kept only
        as long as that obligation lasts.
      </p>

      <h2>Keeping it safe</h2>
      <p>
        We use signed-in accounts, secure session storage on the device,
        encrypted connections, and private storage for profile photos. No
        method is perfect. Please keep your Apple ID, Google account, and email
        safe, especially if a child uses the same phone.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how Maccu handles information, we will update this page
        and the date above. If a change is significant, we will also tell you
        in the app or by email before it takes effect.
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
