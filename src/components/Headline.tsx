import { Fragment } from "react";

/** Renders `before <gold>highlight</gold> after`, optionally one part per line. */
export function Headline({
  before,
  highlight,
  after,
  breaks = false,
}: {
  before: string;
  highlight: string;
  after?: string;
  breaks?: boolean;
}) {
  const sep = breaks ? <br /> : " ";
  return (
    <>
      {before}
      {before && highlight && sep}
      {highlight && <span className="text-highlight">{highlight}</span>}
      {after && (
        <>
          {sep}
          {after}
        </>
      )}
    </>
  );
}

/** Plain text where `*words*` become emphasised. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="font-medium text-foreground">
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
