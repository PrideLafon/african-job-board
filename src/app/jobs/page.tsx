"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Clock, Search, X, Loader2 } from "lucide-react";
import { categories, type Country } from "@/lib/jobs-data";
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

const countries: Country[] = [
  "Cameroon",
  "Nigeria",
  "Ghana",
  "Kenya",
  "Senegal",
  "Ivory Coast",
  "Tanzania",
  "South Africa",
  "Ethiopia",
  "Uganda",
  "Rwanda",
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<DbJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");
  const [jobType, setJobType] = useState<string>("all");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch {
        // fall through
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.city.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || job.category === category;
      const matchesCountry =
        country === "all" || job.country === country;
      const matchesType = jobType === "all" || job.type === jobType;
      return matchesSearch && matchesCategory && matchesCountry && matchesType;
    });
  }, [jobs, search, category, country, jobType]);

  const hasFilters =
    search || category !== "all" || country !== "all" || jobType !== "all";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setCountry("all");
    setJobType("all");
  };

  return (
    <div className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Find informal work opportunities across Africa
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by job title, description, or city..."
              className="pl-10 h-11 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="One-time">One-time</SelectItem>
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9"
              >
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {loading ? "Loading jobs..." : `Showing ${filteredJobs.length} job${filteredJobs.length !== 1 ? "s" : ""}`}
        </p>

        {/* Job Listings */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No jobs found matching your criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {job.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {job.category}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
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
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {job.city}, {job.country}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
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
        )}
      </div>
    </div>
  );
}
