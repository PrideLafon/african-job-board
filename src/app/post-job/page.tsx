"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { categories } from "@/lib/jobs-data";
import type { Country } from "@/lib/jobs-data";

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
  "Other",
];

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [pay, setPay] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [urgent, setUrgent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          type: jobType,
          pay,
          country,
          city,
          posted_by: name,
          phone,
          urgent,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post job");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Job Posted Successfully!</h1>
          <p className="text-muted-foreground mb-6">
            Your job listing is now live. Workers in your area will be able to
            see it and contact you directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/jobs">View All Jobs</Link>
            </Button>
            <Button variant="outline" onClick={() => {
              setSubmitted(false);
              setTitle("");
              setDescription("");
              setCategory("");
              setJobType("");
              setPay("");
              setCountry("");
              setCity("");
              setName("");
              setPhone("");
              setUrgent(false);
            }}>
              Post Another Job
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">Post a Job</h1>
            <Badge variant="secondary" className="text-xs">
              Free
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Fill in the details below to reach workers in your area. No account
            needed.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Job Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg">Job Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. House Cleaner Needed, Mason for Building Project"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job, requirements, working hours, and any other important details..."
                    className="min-h-[120px]"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select required value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.name} value={cat.name}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Job Type *</Label>
                    <Select required value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="One-time">One-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pay">Pay / Salary *</Label>
                  <Input
                    id="pay"
                    placeholder="e.g. 75,000 FCFA/month, 5,000 FCFA/day"
                    required
                    value={pay}
                    onChange={(e) => setPay(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg">Location</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Select required value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City / Town *</Label>
                    <Input
                      id="city"
                      placeholder="e.g. Douala, Yaoundé, Lagos"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg">Your Contact Info</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Mme. Ngono, Mr. Okafor"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="e.g. +237 6XX XXX XXX"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Urgent */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="urgent"
                    className="mt-0.5"
                    checked={urgent}
                    onCheckedChange={(checked) => setUrgent(checked === true)}
                  />
                  <div>
                    <Label htmlFor="urgent" className="cursor-pointer">
                      Mark as Urgent
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Urgent jobs appear at the top and get more visibility
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Job - It's Free"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By posting, you agree that your contact information will be visible
              to job seekers. Posts are free and will be active for 30 days.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
