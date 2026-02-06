"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Phone,
  User,
  ArrowLeft,
  Briefcase,
  Tag,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DbJob {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  country: string;
  city: string;
  pay: string;
  posted_by: string;
  phone: string;
  urgent: boolean;
  created_at: string;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<DbJob | null>(null);
  const [related, setRelated] = useState<DbJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setJob(data.job);
        setRelated(data.related);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold mb-3">Job Not Found</h1>
        <p className="text-muted-foreground mb-6">This job listing may have been removed or expired.</p>
        <Button asChild>
          <Link href="/jobs">Browse All Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all jobs
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {job.urgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
                <Badge variant="secondary">{job.category}</Badge>
                <Badge variant="outline">{job.type}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">{job.title}</h1>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-3">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Job Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {job.city}, {job.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Job Type</p>
                      <p className="text-sm text-muted-foreground">
                        {job.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Pay</p>
                      <p className="text-sm text-primary font-semibold">
                        {job.pay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Posted</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">
                  Contact Employer
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{job.posted_by}</p>
                      <p className="text-xs text-muted-foreground">Employer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{job.phone}</p>
                      <p className="text-xs text-muted-foreground">
                        Call or WhatsApp
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Mention you found this job on AfriJobs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-sm mb-2">Safety Tips</h3>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>- Never pay to get a job</li>
                  <li>- Meet in a public place first</li>
                  <li>- Verify the employer&apos;s identity</li>
                  <li>- Agree on pay before starting work</li>
                  <li>- Tell someone where you&apos;re going</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Jobs */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Similar Jobs</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rJob) => (
                <Link key={rJob.id} href={`/jobs/${rJob.id}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {rJob.category}
                        </Badge>
                        {rJob.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {rJob.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {rJob.city}, {rJob.country}
                      </div>
                      <p className="font-semibold text-sm text-primary mt-2">
                        {rJob.pay}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
