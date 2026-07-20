type Props = { className?: string; size?: number };

export function Logo({ className, size = 22 }: Props) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 400,
        fontSize: size,
        letterSpacing: "0.28em",
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.05em",
        lineHeight: 1,
      }}
      aria-label="NURÉ"
    >
      NUR
      <span style={{ position: "relative", display: "inline-block" }}>
        É
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "-0.55em",
            left: "50%",
            width: "0.35em",
            height: "0.35em",
            transform: "translateX(-50%) rotate(-20deg)",
            color: "var(--champagne)",
            fontSize: "0.9em",
            lineHeight: 1,
          }}
        >
          ✦
        </span>
      </span>
    </span>
  );
}