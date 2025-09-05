import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TalentFlow — Recruitment Management",
  description: "Modern recruitment management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-3 p-4 border-r border-white/10 bg-[var(--panel-2)]/60 backdrop-blur">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400" />
              <div>
                <div className="text-sm text-white font-semibold">TalentFlow</div>
                <div className="text-xs text-[var(--muted)]">Recruitment Platform</div>
              </div>
            </div>

            <nav className="flex flex-col mt-2">
              <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5">
                <span>Dashboard</span>
              </a>
              <a href="/jobs" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5">
                <span>Jobs</span>
              </a>
              <a href="/candidates" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5">
                <span>Candidates</span>
              </a>
              <a href="/interviews" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5">
                <span>Interviews</span>
              </a>
              <a href="/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-white/5">
                <span>Reports</span>
              </a>
            </nav>

            <div className="mt-auto p-3 rounded-xl border border-white/10 bg-white/5">
              <div className="text-xs text-[var(--muted)] mb-2">Quick Actions</div>
              <div className="flex flex-col gap-2">
                <button className="btn btn-primary w-full justify-center">New Job</button>
                <button className="btn w-full justify-center">Add Candidate</button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-h-screen">
            {/* Topbar on mobile */}
            <div className="lg:hidden sticky top-0 z-20 backdrop-blur bg-[var(--panel-2)]/70 border-b border-white/10">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400" />
                  <div className="text-sm font-semibold">TalentFlow</div>
                </div>
                <div className="flex gap-2">
                  <a className="pill blue" href="/jobs">Jobs</a>
                  <a className="pill green" href="/candidates">Candidates</a>
                  <a className="pill" href="/interviews">Interviews</a>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
