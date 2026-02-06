export type JobCategory =
  | "Domestic Work"
  | "Construction"
  | "Transport"
  | "Food & Catering"
  | "Agriculture"
  | "Skilled Trades"
  | "Retail & Market"
  | "Beauty & Fashion"
  | "Education & Tutoring"
  | "Events & Entertainment"
  | "Other";

export type JobType = "One-time" | "Part-time" | "Full-time" | "Contract";

export type Country =
  | "Cameroon"
  | "Nigeria"
  | "Ghana"
  | "Kenya"
  | "Senegal"
  | "Ivory Coast"
  | "Tanzania"
  | "South Africa"
  | "Ethiopia"
  | "Uganda"
  | "Rwanda"
  | "Other";

export interface Job {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
  type: JobType;
  country: Country;
  city: string;
  pay: string;
  postedBy: string;
  phone: string;
  postedAt: string;
  urgent: boolean;
}

export const categories: { name: JobCategory; icon: string; count: number }[] = [
  { name: "Domestic Work", icon: "🏠", count: 45 },
  { name: "Construction", icon: "🏗️", count: 32 },
  { name: "Transport", icon: "🚗", count: 28 },
  { name: "Food & Catering", icon: "🍲", count: 36 },
  { name: "Agriculture", icon: "🌾", count: 22 },
  { name: "Skilled Trades", icon: "🔧", count: 41 },
  { name: "Retail & Market", icon: "🛒", count: 30 },
  { name: "Beauty & Fashion", icon: "💇", count: 19 },
  { name: "Education & Tutoring", icon: "📚", count: 15 },
  { name: "Events & Entertainment", icon: "🎉", count: 12 },
];

export const sampleJobs: Job[] = [
  {
    id: "1",
    title: "House Cleaner Needed - Bastos Area",
    description:
      "Looking for an experienced house cleaner for a 4-bedroom house in Bastos. Must be reliable, honest, and have references. Work is Monday to Friday, 7am to 3pm. We provide all cleaning supplies. Good working conditions and respectful employer.",
    category: "Domestic Work",
    type: "Full-time",
    country: "Cameroon",
    city: "Yaoundé",
    pay: "75,000 FCFA/month",
    postedBy: "Mme. Ngono",
    phone: "+237 6XX XXX XXX",
    postedAt: "2 hours ago",
    urgent: true,
  },
  {
    id: "2",
    title: "Moto Taxi Driver - Own Bike Required",
    description:
      "Looking for an experienced okada rider to join our delivery team. Must have own motorcycle in good condition and valid documents. We provide clients and you keep 70% of earnings. Minimum 2 years riding experience required.",
    category: "Transport",
    type: "Full-time",
    country: "Cameroon",
    city: "Douala",
    pay: "3,000-8,000 FCFA/day",
    postedBy: "FastDeliver Services",
    phone: "+237 6XX XXX XXX",
    postedAt: "5 hours ago",
    urgent: false,
  },
  {
    id: "3",
    title: "Mason for Building Project",
    description:
      "We need 3 experienced masons for a residential building project in Biyem-Assi. Project duration is approximately 3 months. Must bring own basic tools. Cement, sand, and materials provided. Payment is weekly.",
    category: "Construction",
    type: "Contract",
    country: "Cameroon",
    city: "Yaoundé",
    pay: "5,000 FCFA/day",
    postedBy: "Bâtiment Plus",
    phone: "+237 6XX XXX XXX",
    postedAt: "1 day ago",
    urgent: true,
  },
  {
    id: "4",
    title: "Cook for Restaurant - Ndolé Specialist",
    description:
      "Popular restaurant in Akwa seeks experienced cook specializing in Cameroonian dishes, especially Ndolé, Eru, and grilled fish. Must be able to handle high-volume cooking during lunch rush. Meals included during work hours.",
    category: "Food & Catering",
    type: "Full-time",
    country: "Cameroon",
    city: "Douala",
    pay: "90,000 FCFA/month",
    postedBy: "Chez Mama Restaurant",
    phone: "+237 6XX XXX XXX",
    postedAt: "3 hours ago",
    urgent: false,
  },
  {
    id: "5",
    title: "Farm Workers for Cocoa Harvest",
    description:
      "Seeking 10 farm workers for the cocoa harvest season in the Southwest Region. Accommodation provided on the farm. Experience with cocoa harvesting preferred but not required. Transport from Buea provided.",
    category: "Agriculture",
    type: "Contract",
    country: "Cameroon",
    city: "Buea",
    pay: "4,000 FCFA/day + meals",
    postedBy: "Fako Farms",
    phone: "+237 6XX XXX XXX",
    postedAt: "6 hours ago",
    urgent: true,
  },
  {
    id: "6",
    title: "Tailor - Wedding Dress Specialist",
    description:
      "Busy fashion atelier looking for an experienced tailor who specializes in wedding dresses and traditional African attire (Kabba, Kente). Must have own sewing machine. Shop space provided. Commission-based with guaranteed minimum.",
    category: "Beauty & Fashion",
    type: "Full-time",
    country: "Ghana",
    city: "Accra",
    pay: "800-1,500 GHS/month",
    postedBy: "Adinkra Fashions",
    phone: "+233 XX XXX XXXX",
    postedAt: "1 day ago",
    urgent: false,
  },
  {
    id: "7",
    title: "Electrician for Home Wiring",
    description:
      "Need a certified electrician to rewire a 3-bedroom flat. Must have own tools and experience with modern wiring standards. Work includes installing new breaker panel and all room wiring. One-time job, expected to take 3-4 days.",
    category: "Skilled Trades",
    type: "One-time",
    country: "Nigeria",
    city: "Lagos",
    pay: "₦80,000",
    postedBy: "Mr. Okafor",
    phone: "+234 XXX XXX XXXX",
    postedAt: "4 hours ago",
    urgent: false,
  },
  {
    id: "8",
    title: "Market Stall Assistant - Marché Central",
    description:
      "Looking for a young, energetic person to help manage a provisions stall at Marché Central. Duties include arranging goods, serving customers, and basic bookkeeping. Must speak French and some English.",
    category: "Retail & Market",
    type: "Full-time",
    country: "Cameroon",
    city: "Yaoundé",
    pay: "50,000 FCFA/month",
    postedBy: "Mme. Atangana",
    phone: "+237 6XX XXX XXX",
    postedAt: "12 hours ago",
    urgent: false,
  },
  {
    id: "9",
    title: "Math & Science Tutor for BEPC Prep",
    description:
      "Parents seeking a qualified tutor for two children preparing for BEPC exams. Sessions needed 3 times per week (evenings). Must be patient and have a track record with exam preparation. Location: Bonapriso.",
    category: "Education & Tutoring",
    type: "Part-time",
    country: "Cameroon",
    city: "Douala",
    pay: "25,000 FCFA/month",
    postedBy: "M. Fotso",
    phone: "+237 6XX XXX XXX",
    postedAt: "2 days ago",
    urgent: false,
  },
  {
    id: "10",
    title: "DJ for Wedding Reception",
    description:
      "Looking for an experienced DJ for a wedding reception on March 15th. Must have own sound system capable of handling 200+ guests. Playlist to include Makossa, Afrobeats, Bikutsi, and international hits. Setup by 4pm, event ends at midnight.",
    category: "Events & Entertainment",
    type: "One-time",
    country: "Cameroon",
    city: "Douala",
    pay: "100,000 FCFA",
    postedBy: "Wedding Planners CM",
    phone: "+237 6XX XXX XXX",
    postedAt: "1 day ago",
    urgent: false,
  },
  {
    id: "11",
    title: "Plumber for Bathroom Renovation",
    description:
      "Experienced plumber needed for complete bathroom renovation in a villa. Work includes installing new pipes, toilet, shower, and sink. Must have references and at least 5 years experience. Materials will be provided.",
    category: "Skilled Trades",
    type: "One-time",
    country: "Senegal",
    city: "Dakar",
    pay: "150,000 FCFA",
    postedBy: "M. Diallo",
    phone: "+221 XX XXX XXXX",
    postedAt: "8 hours ago",
    urgent: true,
  },
  {
    id: "12",
    title: "Nanny for 2 Children",
    description:
      "Young professional couple seeking a live-out nanny for 2 children (ages 3 and 6). Monday to Saturday, 7am to 5pm. Must be caring, speak English and French. Experience with young children required. Neighbourhood: Kotto.",
    category: "Domestic Work",
    type: "Full-time",
    country: "Cameroon",
    city: "Douala",
    pay: "60,000 FCFA/month",
    postedBy: "The Ekane Family",
    phone: "+237 6XX XXX XXX",
    postedAt: "3 days ago",
    urgent: false,
  },
];
