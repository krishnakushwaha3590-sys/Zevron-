type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type LovableEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: LovableErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
  }
}

let lastCapturedError: unknown;

if (typeof window !== 'undefined') {
  const origHandler = window.onerror;
  window.onerror = function(...args) {
    const [message, source, lineno, colno, error] = args;
    lastCapturedError = error || new Error(String(message));
    window.__lovableEvents?.captureException?.(lastCapturedError, { source, lineno, colno }, { mechanism: 'onerror' });
    return origHandler?.apply(window, args) ?? false;
  };

  const origRejectionHandler = window.onunhandledrejection;
  window.onunhandledrejection = function(event: PromiseRejectionEvent) {
    lastCapturedError = event.reason;
    window.__lovableEvents?.captureException?.(event.reason, {}, { mechanism: 'unhandledrejection' });
    return origRejectionHandler?.call(window, event) ?? false;
  };
}

export function consumeLastCapturedError(): unknown {
  const error = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}