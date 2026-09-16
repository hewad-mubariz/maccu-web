import { ProsePage } from "@/components/prose-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our story" };

export default function OurStoryPage() {
  return (
    <ProsePage title="Our story">
      <p>
        Children make hundreds of drawings. Most of them live on the fridge for a
        week, then disappear into a drawer, a school bag, or the recycling.
      </p>
      <p>
        Maccu is a quiet place to keep them. Photograph a picture, tuck it into a
        sketchbook, and watch a childhood of creativity grow — Nature, Family,
        Dreams, or whatever worlds they invent next.
      </p>
      <p>
        Little art. Big memories. That is the whole idea.
      </p>
    </ProsePage>
  );
}
