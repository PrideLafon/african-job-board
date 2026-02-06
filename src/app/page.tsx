import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Clock,
  Search,
  ArrowRight,
  Users,
  Briefcase,
  Globe,
} from "lucide-react";
import { categories } from "@/lib/jobs-data";
import { supabaseAdmin } from "@/lib/supabase-server";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: allJobs } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  const jobs = allJobs || [];
  const featuredJobs = jobs.filter((j) => j.urgent).slice(0, 3);
  const recentJobs = jobs.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
              100% Free - No Registration Required
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Find Informal Jobs Across{" "}
              <span className="text-primary">Africa</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The go-to platform for Cameroonians and Africans to post and find
              everyday jobs — from house help to construction, transport to
              market trading.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs... e.g. mason, cook, driver"
                  className="pl-10 h-12 bg-white"
                />
              </div>
              <Button asChild size="lg" className="h-12">
                <Link href="/jobs">
                  Search Jobs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {jobs.length}+ Active Jobs
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                12 Countries
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                1,000+ Workers Connected
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Job Categories
              </h2>
              <p className="text-muted-foreground mt-1">
                Browse by the type of work you&apos;re looking for
              </p>
            </div>
            <Link
              href="/jobs"
              className="text-sm font-medium text-primary hover:underline hidden sm:block"
            >
              View all jobs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              >
                <Card className="hover:border-primary/40 hover:shadow-md transition-all cursor-pointer h-full py-4">
                  <CardContent className="flex flex-col items-center text-center gap-2 px-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-sm font-medium leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {jobs.filter((j) => j.category === cat.name).length} jobs
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <h2 className="text-2xl sm:text-3xl font-bold">Urgent Jobs</h2>
                </div>
                <p className="text-muted-foreground">
                  These employers need workers right away
                </p>
              </div>
              <Link
                href="/jobs"
                className="text-sm font-medium text-primary hover:underline hidden sm:block"
              >
                See all &rarr;
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer h-full border-red-200">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <Badge
                          variant="destructive"
                          className="text-xs shrink-0"
                        >
                          Urgent
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base mb-2 line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {job.description}
                      </p>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.city}, {job.country}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                        </div>
                        <div className="font-semibold text-primary mt-2">
                          {job.pay}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Jobs */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Recent Jobs</h2>
              <p className="text-muted-foreground">
                Latest opportunities posted by employers
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {job.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-base mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {job.description}
                    </p>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.city}, {job.country}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                      </div>
                      <div className="font-semibold text-primary mt-2">
                        {job.pay}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-1">
              Simple, fast, and free for everyone
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Post or Browse",
                desc: "Employers post jobs for free. Workers browse listings by category, location, or keyword.",
              },
              {
                step: "2",
                title: "Connect Directly",
                desc: "Call or message the employer directly. No middleman, no fees, no complicated process.",
              },
              {
                step: "3",
                title: "Start Working",
                desc: "Agree on terms and start. It's that simple. Build your reputation through great work.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Need Workers? Post a Job Today
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                It&apos;s completely free. Reach hundreds of workers in your area
                looking for opportunities right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="font-semibold"
                >
                  <Link href="/post-job">Post a Job - It&apos;s Free</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
