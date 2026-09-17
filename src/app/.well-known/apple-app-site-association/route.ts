// Tells iOS that links under /auth/ belong to the Maccu app, so a sign-in
// email opens the app directly instead of Safari. Apple fetches this through
// its CDN, which does not follow redirects: it must answer on www.maccu.app
// itself, with JSON, at this exact path (no .json extension).
export const dynamic = "force-static";

const MACCU_IOS = "G276PSQ2LH.com.maccu.app";

export function GET() {
  return Response.json({
    applinks: {
      details: [
        {
          appIDs: [MACCU_IOS],
          components: [{ "/": "/auth/*", comment: "Sign-in email links" }],
        },
      ],
    },
  });
}
