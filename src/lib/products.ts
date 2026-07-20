import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";

export type Category =
  | "Clothing"
  | "Handbags"
  | "Jewelry"
  | "Perfumes"
  | "Footwear"
  | "Accessories";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  badge?: "New" | "Limited" | "Sold Out";
  materials: string;
  description: string;
  sizes?: string[];
  bestSeller?: boolean;
  newArrival?: boolean;
};

export const products: Product[] = [
  {
    id: "silk-column-dress",
    name: "Silk Column Dress",
    price: 1240,
    category: "Clothing",
    image: p1,
    badge: "New",
    newArrival: true,
    sizes: ["XS", "S", "M", "L"],
    materials: "100% mulberry silk, hand-finished seams. Made in Como, Italy.",
    description:
      "A quiet, floor-skimming silhouette in liquid silk. Cut close through the shoulder and released at the hem for a slow, considered movement.",
  },
  {
    id: "amara-tote",
    name: "Amara Structured Tote",
    price: 2180,
    category: "Handbags",
    image: p2,
    bestSeller: true,
    materials: "Full-grain calf leather, gold-plated hardware. Made in Florence.",
    description:
      "The house tote — architectural, unlined, precise. Sized to carry a laptop, a journal, and everything in between.",
  },
  {
    id: "chain-nue-necklace",
    name: "Chaîne Nué Necklace",
    price: 690,
    category: "Jewelry",
    image: p3,
    badge: "New",
    newArrival: true,
    materials: "18k gold-plated brass, hand-set pendant.",
    description:
      "An almost-there chain and a single suspended drop. Worn alone, or layered against skin.",
  },
  {
    id: "nuit-blanche-parfum",
    name: "Nuit Blanche Eau de Parfum",
    price: 245,
    category: "Perfumes",
    image: p4,
    bestSeller: true,
    materials: "50ml. Bergamot, iris, warm amber, cashmeran.",
    description:
      "A composition built around iris and amber — powdery at first, resinous by evening. Made in Grasse.",
  },
  {
    id: "attitude-pump",
    name: "Attitude Suede Pump",
    price: 780,
    category: "Footwear",
    image: p5,
    sizes: ["36", "37", "38", "39", "40", "41"],
    materials: "Italian suede upper, leather sole, 95mm heel.",
    description:
      "A pointed 95mm pump in warm nude suede. The one you reach for when the evening asks for a little more.",
  },
  {
    id: "ivoire-silk-scarf",
    name: "Ivoire Silk Scarf",
    price: 320,
    category: "Accessories",
    image: p6,
    materials: "90cm × 90cm silk twill, hand-rolled edges.",
    description:
      "A quiet ivory square, weightless enough to knot at the throat or tie through the handle of a bag.",
  },
  {
    id: "atelier-coat",
    name: "Atelier Cashmere Coat",
    price: 2890,
    category: "Clothing",
    image: p7,
    badge: "Limited",
    sizes: ["XS", "S", "M", "L"],
    materials: "100% Mongolian cashmere, half-canvas construction.",
    description:
      "Double-breasted, softly tailored, cut in undyed cream cashmere. The kind of coat you keep for a decade.",
  },
  {
    id: "petit-hoop",
    name: "Petit Hoop Earrings",
    price: 420,
    category: "Jewelry",
    image: p8,
    bestSeller: true,
    materials: "18k gold vermeil on sterling silver.",
    description:
      "A pair of small, perfect hoops — the daily earring, refined to its essentials.",
  },
];

export const categoriesList: { key: Category; blurb: string }[] = [
  { key: "Clothing", blurb: "Silk, cashmere, tailoring." },
  { key: "Handbags", blurb: "Architectural leather." },
  { key: "Jewelry", blurb: "Gold, worn quietly." },
  { key: "Perfumes", blurb: "Compositions from Grasse." },
  { key: "Footwear", blurb: "Considered from heel to toe." },
  { key: "Accessories", blurb: "The finishing gesture." },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}