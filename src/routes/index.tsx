import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="home-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm tracking-widest text-ink/60 uppercase">Session Tracker</p>
          <h1 className="mt-6 text-4xl leading-tight font-semibold text-ink md:text-6xl">
            Capture weekly sessions with intention and care.
          </h1>
          <p className="mt-6 text-lg text-ink/70">
            Keep each client entry tidy, receipt-ready, and secure on your device. Monthly reporting
            is on deck.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link to="/weekly" className="group card-primary">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-ink">Record Weekly Report</span>
              <span className="text-sm tracking-widest text-ink/60 uppercase">Start</span>
            </div>
            <p className="mt-4 text-sm text-ink/70">
              Add multiple client entries, validate receipts, and export directly to CSV.
            </p>
          </Link>

          <div className="card-secondary opacity-70">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-ink">Record Monthly Report</span>
              <span className="text-sm tracking-widest text-ink/60 uppercase">Soon</span>
            </div>
            <p className="mt-4 text-sm text-ink/70">
              Monthly summaries will plug into the same CSV workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
