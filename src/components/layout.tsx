import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Menu, X } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            A
          </div>
          <span className="text-xl font-bold text-foreground">
            Afri<span className="text-primary">Jobs</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/post-job"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Post a Job
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/post-job">Post a Job - Free</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/jobs">Find Work</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                A
              </div>
              <span className="text-lg font-bold">
                Afri<span className="text-primary">Jobs</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting workers with informal job opportunities across Cameroon
              and Africa. Free to post, free to apply.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/jobs?category=Domestic+Work" className="hover:text-foreground transition-colors">Domestic Work</Link></li>
              <li><Link href="/jobs?category=Construction" className="hover:text-foreground transition-colors">Construction</Link></li>
              <li><Link href="/jobs?category=Transport" className="hover:text-foreground transition-colors">Transport</Link></li>
              <li><Link href="/jobs?category=Skilled+Trades" className="hover:text-foreground transition-colors">Skilled Trades</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Countries</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/jobs?country=Cameroon" className="hover:text-foreground transition-colors">Cameroon</Link></li>
              <li><Link href="/jobs?country=Nigeria" className="hover:text-foreground transition-colors">Nigeria</Link></li>
              <li><Link href="/jobs?country=Ghana" className="hover:text-foreground transition-colors">Ghana</Link></li>
              <li><Link href="/jobs?country=Senegal" className="hover:text-foreground transition-colors">Senegal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/post-job" className="hover:text-foreground transition-colors">Post a Job</Link></li>
              <li><Link href="/jobs" className="hover:text-foreground transition-colors">Browse Jobs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AfriJobs. Empowering African workers.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Made with purpose for Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
