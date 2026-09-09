import { useState, useEffect, useCallback } from "react";

export default function PressCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const min = -50;
  const max = 50;

  const pushHistory = useCallback((prev) => {
    setHistory((h) => [prev, ...h].slice(0, 5));
  }, []);

  const increment = useCallback(() => {
    setCount((c) => {
      const next = Math.min(c + step, max);
      pushHistory(c);
      return next;
    });
  }, [step, pushHistory]);

  const decrement = useCallback(() => {
    setCount((c) => {
      const next = Math.max(c - step, min);
      pushHistory(c);
      return next;
    });
  }, [step, pushHistory]);

  const reset = () => {
    pushHistory(count);
    setCount(0);
  };

  const undo = () => {
    if (history.length === 0) return;
    const [last, ...rest] = history;
    setCount(last);
    setHistory(rest);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") increment();
      else if (e.key === "ArrowDown") decrement();
      else if (e.key.toLowerCase() === "r") reset();
      else if (e.key.toLowerCase() === "u") undo();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [increment, decrement]);

  const atMax = count >= max;
  const atMin = count <= min;
  const countColor =
    count > 0 ? "#1a9e5c" : count < 0 ? "#d64545" : "#333";

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <p style={styles.hint}>Use ↑ / ↓ keys, or R to reset, U to undo</p>

        <h1 style={{ ...styles.count, color: countColor }}>{count}</h1>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${((count - min) / (max - min)) * 100}%`,
              background: countColor,
            }}
          />
        </div>
        <p style={styles.range}>
          {min} to {max}
        </p>

        <div style={styles.buttonRow}>
          <button
            style={{ ...styles.button, ...styles.decrement }}
            onClick={decrement}
            disabled={atMin}
          >
            − Decrease
          </button>
          <button style={{ ...styles.button, ...styles.reset }} onClick={reset}>
            Reset
          </button>
          <button
            style={{ ...styles.button, ...styles.increment }}
            onClick={increment}
            disabled={atMax}
          >
            + Increase
          </button>
        </div>

        <div style={styles.controlsRow}>
          <label style={styles.label}>
            Step size
            <input
              type="number"
              value={step}
              min={1}
              onChange={(e) => setStep(Math.max(1, Number(e.target.value) || 1))}
              style={styles.input}
            />
          </label>

          <button
            style={{ ...styles.button, ...styles.undo }}
            onClick={undo}
            disabled={history.length === 0}
          >
            ↩ Undo
          </button>
        </div>

        {history.length > 0 && (
          <div style={styles.historyBox}>
            <span style={styles.historyLabel}>Recent:</span>
            {history.map((h, i) => (
              <span key={i} style={styles.historyChip}>
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  card: {
    width: "340px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "1.75rem",
    textAlign: "center",
  },
  hint: {
    fontSize: "12px",
    color: "#999",
    margin: "0 0 0.75rem",
  },
  count: {
    fontSize: "3.5rem",
    fontWeight: 700,
    margin: "0 0 0.5rem",
    transition: "color 0.2s ease",
  },
  progressTrack: {
    height: "8px",
    width: "100%",
    background: "#eee",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    transition: "width 0.2s ease, background 0.2s ease",
  },
  range: {
    fontSize: "11px",
    color: "#aaa",
    margin: "0.35rem 0 1.25rem",
  },
  buttonRow: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  button: {
    flex: 1,
    padding: "0.6rem 0.5rem",
    fontSize: "14px",
    fontWeight: 600,
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.1s ease, opacity 0.1s ease",
  },
  increment: {
    background: "#e6f7ee",
    color: "#1a9e5c",
  },
  decrement: {
    background: "#fdeaea",
    color: "#d64545",
  },
  reset: {
    background: "#f0f0f0",
    color: "#555",
    flex: "0.7",
  },
  undo: {
    background: "#eef2fd",
    color: "#3f5fd6",
    flex: "0.6",
  },
  controlsRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "0.75rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "12px",
    color: "#777",
    gap: "0.25rem",
  },
  input: {
    width: "60px",
    padding: "0.4rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  historyBox: {
    marginTop: "1.25rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.35rem",
    borderTop: "1px solid #eee",
    paddingTop: "0.75rem",
  },
  historyLabel: {
    fontSize: "11px",
    color: "#aaa",
    marginRight: "0.25rem",
  },
  historyChip: {
    fontSize: "12px",
    background: "#f4f4f4",
    color: "#666",
    padding: "2px 8px",
    borderRadius: "999px",
  },
};
