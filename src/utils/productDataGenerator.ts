import { Product } from '../stores/productsStore';
import {
  Truck, Shield, Award, Zap, RotateCcw, CheckCircle, Lock, Package, Headphones, Clock, Tag, Leaf
} from 'lucide-react';

export interface ProductHighlight {
  icon: any;
  title: string;
  description: string;
  color: string;
}

export interface ProductSpecSection {
  title: string;
  specs: Array<{ label: string; value: string }>;
}

export interface ComparisonFeature {
  name: string;
  current: string | boolean;
  competitors: Array<string | boolean>;
  highlight?: string;
}

export interface ComparisonData {
  current: { name: string };
  competitors: Array<{ name: string }>;
  features: ComparisonFeature[];
  advantages: string[];
}

const generateUniqueValue = (productId: string, seed: number): number => {
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), seed);
  return hash % 100;
};

// ===================================
// CATEGORY-SPECIFIC HIGHLIGHTS
// ===================================

const generateElectronicsHighlights = (product: Product): ProductHighlight[] => {
  const hash = generateUniqueValue(product.id, 1);
  const highlights: ProductHighlight[] = [];

  highlights.push({
    icon: Zap,
    title: 'Fast Charging Technology',
    description: `65W ultra-fast charging gets you from 0-80% in just 30 minutes. Includes premium GaN charger with power delivery 3.0 support.`,
    color: 'bg-yellow-500',
  });

  highlights.push({
    icon: Shield,
    title: hash % 2 === 0 ? '3-Year Warranty' : '2-Year Extended Warranty',
    description: 'Comprehensive manufacturer warranty covering all defects, malfunctions, and hardware failures. Optional extended protection available.',
    color: 'bg-purple-500',
  });

  highlights.push({
    icon: Lock,
    title: 'Advanced Security',
    description: 'Bank-level AES-256 encryption with biometric authentication. Secure boot and encrypted storage protect your data.',
    color: 'bg-red-500',
  });

  highlights.push({
    icon: CheckCircle,
    title: 'Universal Compatibility',
    description: 'Works with iOS, Android, Windows, macOS, and Linux. Bluetooth 5.3, USB-C, and Wi-Fi 6E connectivity ensure compatibility.',
    color: 'bg-teal-500',
  });

  highlights.push({
    icon: Leaf,
    title: 'Energy Efficient',
    description: 'ENERGY STAR certified. Uses 40% less power than conventional models, saving money on electricity bills.',
    color: 'bg-green-500',
  });

  highlights.push({
    icon: Award,
    title: 'Award-Winning Design',
    description: 'Winner of CES Innovation Award and Red Dot Design Award for exceptional engineering and design excellence.',
    color: 'bg-orange-500',
  });

  return highlights;
};

const generateFashionHighlights = (product: Product): ProductHighlight[] => {
  const hash = generateUniqueValue(product.id, 2);
  const highlights: ProductHighlight[] = [];

  const isClothing = product.name.toLowerCase().includes('jacket') ||
                     product.name.toLowerCase().includes('dress') ||
                     product.name.toLowerCase().includes('shirt');

  highlights.push({
    icon: Award,
    title: 'Premium Quality Materials',
    description: isClothing
      ? 'Crafted from the finest genuine leather/premium fabric. Handpicked materials ensure long-lasting durability and luxurious feel.'
      : 'Genuine Italian leather with meticulous stitching. Premium hardware and finishes that age beautifully.',
    color: 'bg-amber-600',
  });

  highlights.push({
    icon: Leaf,
    title: 'Sustainably Sourced',
    description: 'Made from 100% ethically sourced materials. Carbon-neutral production. We plant 5 trees for every purchase.',
    color: 'bg-green-600',
  });

  highlights.push({
    icon: CheckCircle,
    title: 'Perfect Fit Guarantee',
    description: 'Multiple size options from XS to 3XL. Detailed size chart provided. Free exchanges within 60 days if fit is not perfect.',
    color: 'bg-blue-500',
  });

  highlights.push({
    icon: Shield,
    title: 'Quality Craftsmanship',
    description: 'Handcrafted by skilled artisans. Each piece undergoes rigorous quality control. Reinforced stitching at stress points.',
    color: 'bg-purple-500',
  });

  highlights.push({
    icon: Tag,
    title: 'Designer Style',
    description: 'Limited edition design inspired by runway fashion. Timeless style that works for any season and occasion.',
    color: 'bg-pink-500',
  });

  highlights.push({
    icon: RotateCcw,
    title: 'Easy Care',
    description: isClothing
      ? 'Machine washable or professional dry clean. Wrinkle-resistant fabric. Color stays vibrant after multiple washes.'
      : 'Easy to clean with leather conditioner. Comes with care instructions and cleaning kit.',
    color: 'bg-indigo-500',
  });

  return highlights;
};

const generateHomeGardenHighlights = (product: Product): ProductHighlight[] => {
  const hash = generateUniqueValue(product.id, 3);
  const highlights: ProductHighlight[] = [];

  const isFurniture = product.name.toLowerCase().includes('chair') ||
                      product.name.toLowerCase().includes('desk') ||
                      product.name.toLowerCase().includes('table');

  highlights.push({
    icon: Shield,
    title: hash % 2 === 0 ? '5-Year Warranty' : '7-Year Warranty',
    description: 'Industry-leading comprehensive warranty covering all parts, labor, and replacements. Extended service plans available.',
    color: 'bg-purple-600',
  });

  highlights.push({
    icon: Package,
    title: isFurniture ? 'Easy Assembly' : 'Ready to Use',
    description: isFurniture
      ? 'Simple assembly in under 30 minutes. All tools and hardware included. Detailed illustrated instructions with video guide.'
      : 'Arrives fully assembled and ready to use. Premium packaging protects during shipping.',
    color: 'bg-blue-600',
  });

  highlights.push({
    icon: Leaf,
    title: 'Eco-Friendly Materials',
    description: 'Made from sustainable, recycled materials. Non-toxic finishes. Certified by environmental standards organizations.',
    color: 'bg-green-600',
  });

  highlights.push({
    icon: Award,
    title: 'Premium Build Quality',
    description: isFurniture
      ? 'Solid construction supports up to 300 lbs. Commercial-grade materials. Designed for years of daily use.'
      : 'Professional-grade performance. Built to last with premium components and rigorous quality testing.',
    color: 'bg-amber-600',
  });

  highlights.push({
    icon: Zap,
    title: 'Energy Efficient',
    description: 'ENERGY STAR certified. Uses 45% less energy than conventional models. Eco-mode for maximum efficiency.',
    color: 'bg-yellow-500',
  });

  highlights.push({
    icon: CheckCircle,
    title: 'Space-Saving Design',
    description: 'Compact footprint without sacrificing functionality. Smart design maximizes utility while minimizing space requirements.',
    color: 'bg-teal-500',
  });

  return highlights;
};

const generateSportsHighlights = (product: Product): ProductHighlight[] => {
  const highlights: ProductHighlight[] = [];

  highlights.push({
    icon: Award,
    title: 'Professional Grade',
    description: 'Used by professional athletes and trainers worldwide. Engineered for peak performance with cutting-edge materials.',
    color: 'bg-red-600',
  });

  highlights.push({
    icon: Shield,
    title: 'Lifetime Structural Warranty',
    description: 'Lifetime warranty on frame/structure plus 2-year comprehensive coverage on all components. We stand behind our products.',
    color: 'bg-purple-600',
  });

  highlights.push({
    icon: CheckCircle,
    title: 'Performance Tested',
    description: 'Rigorously tested by athletes in real-world conditions. Meets international sports equipment standards and certifications.',
    color: 'bg-blue-500',
  });

  highlights.push({
    icon: Zap,
    title: 'Superior Performance',
    description: 'Advanced technology delivers measurable performance improvements. Precision-engineered for competitive advantage.',
    color: 'bg-yellow-500',
  });

  highlights.push({
    icon: Leaf,
    title: 'Sustainable Materials',
    description: 'Made from recycled and eco-friendly materials. Carbon-neutral manufacturing process. Built to last, reducing waste.',
    color: 'bg-green-600',
  });

  highlights.push({
    icon: Package,
    title: 'Complete Package',
    description: 'Includes all necessary accessories and equipment. Professional carry bag and maintenance kit included.',
    color: 'bg-indigo-600',
  });

  return highlights;
};

export const generateProductHighlights = (product: Product): ProductHighlight[] => {
  const baseHighlights: ProductHighlight[] = [];
  const hash = generateUniqueValue(product.id, 1);

  // Category-specific highlights
  if (product.category === 'Electronics') {
    baseHighlights.push(...generateElectronicsHighlights(product));
  } else if (product.category === 'Fashion') {
    baseHighlights.push(...generateFashionHighlights(product));
  } else if (product.category === 'Home & Garden') {
    baseHighlights.push(...generateHomeGardenHighlights(product));
  } else if (product.category === 'Sports') {
    baseHighlights.push(...generateSportsHighlights(product));
  } else {
    // Generic highlights for other categories
    baseHighlights.push({
      icon: Shield,
      title: '2-Year Warranty',
      description: 'Comprehensive warranty covering defects and malfunctions. Easy claims process with fast replacement.',
      color: 'bg-purple-500',
    });

    baseHighlights.push({
      icon: Award,
      title: 'Premium Quality',
      description: 'Exceptional build quality with premium materials. Rigorous quality control ensures every unit meets high standards.',
      color: 'bg-amber-500',
    });
  }

  // Universal highlights
  baseHighlights.push({
    icon: Truck,
    title: hash % 3 === 0 ? 'Free Express Shipping' : hash % 3 === 1 ? 'Same-Day Processing' : 'Free Global Shipping',
    description: hash % 3 === 0
      ? 'Free express shipping on all orders. Receive your item within 1-2 business days in most areas.'
      : hash % 3 === 1
      ? 'Orders placed before 2 PM ship the same business day. Real-time tracking included.'
      : 'Free worldwide shipping with tracking. 3-5 days domestically, 7-14 days internationally.',
    color: 'bg-blue-500',
  });

  baseHighlights.push({
    icon: RotateCcw,
    title: '60-Day Returns',
    description: 'Not satisfied? Return within 60 days for full refund, no questions asked. Free prepaid return labels included.',
    color: 'bg-green-500',
  });

  baseHighlights.push({
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert customer support available 24/7 via phone, email, and live chat. Average response time under 5 minutes.',
    color: 'bg-teal-500',
  });

  if (product.originalPrice && product.originalPrice > product.price) {
    const savings = product.originalPrice - product.price;
    const percentage = Math.round((savings / product.originalPrice) * 100);
    baseHighlights.push({
      icon: Tag,
      title: `Save ${percentage}% - Limited Offer`,
      description: `Save $${savings.toFixed(2)} on this premium product. Exclusive discount available for limited time only.`,
      color: 'bg-red-500',
    });
  }

  return baseHighlights.slice(0, 10);
};

// ===================================
// CATEGORY-SPECIFIC SPECIFICATIONS
// ===================================

const generateElectronicsSpecs = (product: Product): ProductSpecSection[] => {
  const hash = generateUniqueValue(product.id, 42);
  const specs: ProductSpecSection[] = [];

  // General Information
  specs.push({
    title: 'General Information',
    specs: [
      { label: 'Model Number', value: `NX-${product.id.toUpperCase()}-${hash}` },
      { label: 'Brand', value: 'NexusMarket' },
      { label: 'Category', value: product.category },
      { label: 'Release Date', value: 'Q4 2024' },
      { label: 'Manufacturer', value: 'NexusMarket Inc.' },
      { label: 'Country of Origin', value: hash % 2 === 0 ? 'USA' : 'Germany' },
      { label: 'UPC Code', value: `${Math.floor(Math.random() * 900000000) + 100000000}` },
    ],
  });

  // Display & Screen
  specs.push({
    title: 'Display & Screen',
    specs: [
      { label: 'Display Type', value: hash % 2 === 0 ? 'AMOLED' : 'IPS LCD' },
      { label: 'Screen Size', value: `${(5.5 + (hash % 10) * 0.3).toFixed(1)} inches` },
      { label: 'Resolution', value: hash % 3 === 0 ? '2560 x 1440 (2K)' : '1920 x 1080 (Full HD)' },
      { label: 'Refresh Rate', value: hash % 2 === 0 ? '120Hz Adaptive' : '90Hz' },
      { label: 'Peak Brightness', value: `${800 + hash * 5} nits` },
      { label: 'HDR Support', value: 'HDR10+, Dolby Vision' },
      { label: 'Screen Protection', value: 'Gorilla Glass Victus 2' },
    ],
  });

  // Hardware & Performance
  specs.push({
    title: 'Hardware & Performance',
    specs: [
      { label: 'Processor', value: hash % 3 === 0 ? 'Snapdragon 8 Gen 3' : 'Apple A17 Pro' },
      { label: 'RAM', value: `${8 + (hash % 4) * 4}GB LPDDR5X` },
      { label: 'Storage', value: `${128 + (hash % 4) * 128}GB UFS 4.0` },
      { label: 'GPU', value: hash % 2 === 0 ? 'Adreno 750' : 'Mali-G720' },
      { label: 'Cooling', value: 'Vapor Chamber + Graphene' },
      { label: 'AnTuTu Score', value: `${950000 + hash * 1000}` },
    ],
  });

  // Battery & Charging
  specs.push({
    title: 'Battery & Power',
    specs: [
      { label: 'Battery Capacity', value: `${4000 + hash * 50}mAh Li-Po` },
      { label: 'Fast Charging', value: `${45 + (hash % 4) * 20}W Wired` },
      { label: 'Wireless Charging', value: hash % 2 === 0 ? `${15 + (hash % 3) * 15}W Qi` : 'Not Supported' },
      { label: 'Battery Life (Video)', value: `${18 + hash % 10} hours` },
      { label: 'Charging Time', value: `${Math.round(50 - hash % 20)} minutes to 100%` },
      { label: 'Battery Cycles', value: '800+ cycles to 80% capacity' },
    ],
  });

  // Connectivity
  specs.push({
    title: 'Connectivity & Network',
    specs: [
      { label: '5G Support', value: hash % 3 !== 0 ? 'Yes, Sub-6GHz & mmWave' : 'No, 4G LTE Only' },
      { label: 'WiFi', value: hash % 2 === 0 ? 'WiFi 7 (802.11be)' : 'WiFi 6E (802.11ax)' },
      { label: 'Bluetooth', value: `${5.2 + (hash % 3) * 0.1} with LE Audio` },
      { label: 'NFC', value: 'Yes' },
      { label: 'USB', value: 'Type-C 3.2 Gen 2' },
      { label: 'GPS', value: 'Multi-band GPS, GLONASS, Galileo' },
    ],
  });

  // Physical Specifications
  specs.push({
    title: 'Physical Dimensions',
    specs: [
      { label: 'Dimensions', value: `${150 + hash % 20} x ${70 + hash % 10} x ${7.5 + (hash % 10) * 0.3} mm` },
      { label: 'Weight', value: `${180 + hash % 40} grams` },
      { label: 'Build Material', value: hash % 2 === 0 ? 'Aluminum + Glass' : 'Titanium + Ceramic' },
      { label: 'Water Resistance', value: hash % 3 === 0 ? 'IP68 (6m/30min)' : 'IP67 (1m/30min)' },
      { label: 'Colors', value: 'Black, Silver, Blue, Red' },
    ],
  });

  // Warranty & Support
  specs.push({
    title: 'Warranty & Support',
    specs: [
      { label: 'Warranty', value: hash % 2 === 0 ? '3 Years' : '2 Years' },
      { label: 'Support Hours', value: '24/7' },
      { label: 'Return Policy', value: '60 Days Money-Back' },
      { label: 'International Warranty', value: 'Yes' },
    ],
  });

  return specs;
};

const generateFashionSpecs = (product: Product): ProductSpecSection[] => {
  const hash = generateUniqueValue(product.id, 43);
  const specs: ProductSpecSection[] = [];

  const isClothing = product.name.toLowerCase().includes('jacket') ||
                     product.name.toLowerCase().includes('dress') ||
                     product.name.toLowerCase().includes('shirt');
  const isFootwear = product.name.toLowerCase().includes('shoe') ||
                     product.name.toLowerCase().includes('sneaker') ||
                     product.name.toLowerCase().includes('boot');

  // General Information
  specs.push({
    title: 'General Information',
    specs: [
      { label: 'Brand', value: 'NexusMarket' },
      { label: 'Category', value: product.category },
      { label: 'Collection', value: '2024 Premium Collection' },
      { label: 'Style Code', value: `NM-${product.id.toUpperCase()}-${hash}` },
      { label: 'Season', value: hash % 2 === 0 ? 'All Season' : 'Fall/Winter' },
      { label: 'Country of Origin', value: hash % 3 === 0 ? 'Italy' : hash % 3 === 1 ? 'USA' : 'France' },
    ],
  });

  if (isClothing) {
    // Fabric & Material (Clothing)
    specs.push({
      title: 'Fabric & Material',
      specs: [
        { label: 'Outer Material', value: product.name.includes('Leather') ? '100% Genuine Leather' : '85% Cotton, 15% Polyester' },
        { label: 'Lining Material', value: hash % 2 === 0 ? '100% Polyester' : '100% Viscose' },
        { label: 'Material Quality', value: 'Premium Grade' },
        { label: 'Texture', value: hash % 2 === 0 ? 'Smooth' : 'Textured' },
        { label: 'Breathability', value: 'High' },
        { label: 'Stretch', value: hash % 3 === 0 ? 'Slight Stretch' : 'No Stretch' },
        { label: 'Weight', value: hash % 2 === 0 ? 'Lightweight' : 'Medium Weight' },
      ],
    });

    // Fit & Sizing
    specs.push({
      title: 'Fit & Sizing',
      specs: [
        { label: 'Fit Type', value: hash % 3 === 0 ? 'Slim Fit' : hash % 3 === 1 ? 'Regular Fit' : 'Relaxed Fit' },
        { label: 'Size Range', value: 'XS, S, M, L, XL, XXL, 3XL' },
        { label: 'Size Chart', value: 'US Standard Sizing' },
        { label: 'Model Height', value: hash % 2 === 0 ? '5\'10" (178 cm)' : '6\'0" (183 cm)' },
        { label: 'Model Wears', value: 'Size M' },
        { label: 'True to Size', value: 'Yes' },
        { label: 'Length', value: product.name.includes('Jacket') ? 'Hip Length' : 'Floor Length' },
      ],
    });

    // Design & Details
    specs.push({
      title: 'Design & Details',
      specs: [
        { label: 'Closure Type', value: hash % 3 === 0 ? 'Zipper' : hash % 3 === 1 ? 'Button' : 'Snap Button' },
        { label: 'Collar Style', value: hash % 2 === 0 ? 'Stand Collar' : 'Shirt Collar' },
        { label: 'Sleeve Type', value: product.name.includes('Jacket') ? 'Long Sleeve' : 'Sleeveless' },
        { label: 'Pockets', value: hash % 2 === 0 ? '4 (2 External, 2 Internal)' : '2 External' },
        { label: 'Pattern', value: 'Solid' },
        { label: 'Embellishments', value: hash % 2 === 0 ? 'Minimal' : 'None' },
        { label: 'Style', value: hash % 2 === 0 ? 'Casual' : 'Formal' },
      ],
    });

    // Care Instructions
    specs.push({
      title: 'Care Instructions',
      specs: [
        { label: 'Washing', value: product.name.includes('Leather') ? 'Professional Leather Clean Only' : 'Machine Wash Cold' },
        { label: 'Drying', value: product.name.includes('Leather') ? 'Air Dry' : 'Tumble Dry Low' },
        { label: 'Ironing', value: product.name.includes('Leather') ? 'Do Not Iron' : 'Low Heat' },
        { label: 'Dry Cleaning', value: 'Recommended' },
        { label: 'Bleaching', value: 'Do Not Bleach' },
        { label: 'Special Care', value: product.name.includes('Leather') ? 'Apply leather conditioner monthly' : 'Wash with similar colors' },
      ],
    });
  } else if (isFootwear) {
    // Shoe Specifications
    specs.push({
      title: 'Shoe Specifications',
      specs: [
        { label: 'Upper Material', value: hash % 2 === 0 ? 'Premium Leather & Mesh' : 'Synthetic Leather' },
        { label: 'Sole Material', value: hash % 2 === 0 ? 'Rubber' : 'EVA Foam' },
        { label: 'Insole', value: 'Cushioned Footbed' },
        { label: 'Closure Type', value: hash % 2 === 0 ? 'Lace-up' : 'Slip-on' },
        { label: 'Heel Type', value: 'Flat' },
        { label: 'Toe Shape', value: hash % 2 === 0 ? 'Round Toe' : 'Pointed Toe' },
        { label: 'Ankle Support', value: product.name.includes('Boot') ? 'High Ankle' : 'Low Top' },
      ],
    });

    // Size & Fit
    specs.push({
      title: 'Size & Fit',
      specs: [
        { label: 'Size Range (US)', value: 'Men: 6-13, Women: 5-11' },
        { label: 'Width Options', value: hash % 2 === 0 ? 'Regular, Wide' : 'Regular' },
        { label: 'Fit', value: 'True to Size' },
        { label: 'Arch Support', value: hash % 2 === 0 ? 'Medium' : 'High' },
        { label: 'Cushioning', value: hash % 2 === 0 ? 'Air Max Technology' : 'React Foam' },
        { label: 'Weight (Single Shoe)', value: `${250 + hash % 100}g` },
      ],
    });

    // Features & Technology
    specs.push({
      title: 'Features & Technology',
      specs: [
        { label: 'Water Resistance', value: hash % 2 === 0 ? 'Water-Resistant' : 'Standard' },
        { label: 'Breathability', value: 'Mesh Ventilation' },
        { label: 'Traction', value: 'Multi-Directional Tread' },
        { label: 'Flexibility', value: 'Flex Grooves' },
        { label: 'Break-in Period', value: 'Minimal' },
      ],
    });

    // Care & Maintenance
    specs.push({
      title: 'Care & Maintenance',
      specs: [
        { label: 'Cleaning', value: 'Wipe with damp cloth' },
        { label: 'Storage', value: 'Store in cool, dry place' },
        { label: 'Leather Care', value: hash % 2 === 0 ? 'Apply leather conditioner' : 'N/A' },
        { label: 'Sole Replacement', value: 'Replaceable' },
      ],
    });
  } else {
    // Accessories
    specs.push({
      title: 'Product Details',
      specs: [
        { label: 'Material', value: hash % 2 === 0 ? 'Italian Leather' : 'Vegan Leather' },
        { label: 'Dimensions', value: `${10 + hash % 5}" L x ${8 + hash % 3}" H x ${4 + hash % 2}" W` },
        { label: 'Closure', value: hash % 2 === 0 ? 'Zipper' : 'Magnetic Snap' },
        { label: 'Interior', value: 'Fabric Lining' },
        { label: 'Pockets', value: `${2 + hash % 4} (External & Internal)` },
        { label: 'Strap', value: 'Adjustable' },
        { label: 'Hardware', value: 'Gold-Tone' },
      ],
    });

    // Care Instructions
    specs.push({
      title: 'Care Instructions',
      specs: [
        { label: 'Cleaning', value: 'Wipe with soft, damp cloth' },
        { label: 'Conditioning', value: 'Apply leather conditioner every 6 months' },
        { label: 'Storage', value: 'Store in dust bag when not in use' },
        { label: 'Water Exposure', value: 'Avoid prolonged water exposure' },
      ],
    });
  }

  // Warranty & Returns
  specs.push({
    title: 'Warranty & Returns',
    specs: [
      { label: 'Warranty', value: '1 Year Manufacturing Defects' },
      { label: 'Return Period', value: '60 Days' },
      { label: 'Exchange Policy', value: 'Free Size Exchange' },
      { label: 'Refund', value: 'Full Refund if Unsatisfied' },
    ],
  });

  return specs;
};

const generateHomeGardenSpecs = (product: Product): ProductSpecSection[] => {
  const hash = generateUniqueValue(product.id, 44);
  const specs: ProductSpecSection[] = [];

  const isFurniture = product.name.toLowerCase().includes('chair') ||
                      product.name.toLowerCase().includes('desk') ||
                      product.name.toLowerCase().includes('table');
  const isAppliance = product.name.toLowerCase().includes('blender') ||
                      product.name.toLowerCase().includes('coffee') ||
                      product.name.toLowerCase().includes('kettle');

  // General Information
  specs.push({
    title: 'General Information',
    specs: [
      { label: 'Brand', value: 'NexusMarket' },
      { label: 'Model Number', value: `NM-HG-${product.id.toUpperCase()}` },
      { label: 'Category', value: product.category },
      { label: 'Manufacturer', value: 'NexusMarket Inc.' },
      { label: 'Country of Origin', value: hash % 2 === 0 ? 'USA' : 'Italy' },
      { label: 'Release Year', value: '2024' },
    ],
  });

  if (isFurniture) {
    // Furniture Specifications
    specs.push({
      title: 'Dimensions & Weight',
      specs: [
        { label: 'Overall Dimensions', value: `${40 + hash % 30}" L x ${25 + hash % 15}" W x ${35 + hash % 20}" H` },
        { label: 'Seat Height', value: product.name.includes('Chair') ? `${17 + hash % 5}"` : 'N/A' },
        { label: 'Seat Depth', value: product.name.includes('Chair') ? `${18 + hash % 4}"` : 'N/A' },
        { label: 'Product Weight', value: `${30 + hash % 40} lbs` },
        { label: 'Weight Capacity', value: product.name.includes('Chair') ? '300 lbs' : '275 lbs' },
        { label: 'Packaging Dimensions', value: `${45 + hash % 10}" x ${28 + hash % 8}" x ${12 + hash % 5}"` },
      ],
    });

    // Materials & Construction
    specs.push({
      title: 'Materials & Construction',
      specs: [
        { label: 'Frame Material', value: hash % 2 === 0 ? 'Steel' : 'Aluminum Alloy' },
        { label: 'Surface Material', value: hash % 3 === 0 ? 'Mesh + Foam' : hash % 3 === 1 ? 'Engineered Wood' : 'Solid Wood' },
        { label: 'Upholstery', value: product.name.includes('Chair') ? hash % 2 === 0 ? 'Breathable Mesh' : 'PU Leather' : 'N/A' },
        { label: 'Finish', value: hash % 2 === 0 ? 'Matte' : 'Glossy' },
        { label: 'Cushioning', value: product.name.includes('Chair') ? 'High-Density Foam' : 'N/A' },
        { label: 'Base', value: product.name.includes('Chair') ? '5-Star Nylon Base' : 'N/A' },
      ],
    });

    // Features & Adjustments
    specs.push({
      title: 'Features & Adjustments',
      specs: [
        { label: 'Height Adjustment', value: product.name.includes('Chair') || product.name.includes('Desk') ? 'Yes, Gas Lift' : 'N/A' },
        { label: 'Tilt Mechanism', value: product.name.includes('Chair') ? 'Synchro-Tilt' : 'N/A' },
        { label: 'Armrests', value: product.name.includes('Chair') ? '4D Adjustable' : 'N/A' },
        { label: 'Lumbar Support', value: product.name.includes('Chair') ? 'Adjustable' : 'N/A' },
        { label: 'Recline Range', value: product.name.includes('Chair') ? '90° - 135°' : 'N/A' },
        { label: 'Swivel', value: product.name.includes('Chair') ? '360°' : 'N/A' },
        { label: 'Wheels', value: product.name.includes('Chair') ? '5 Smooth-Rolling Casters' : 'N/A' },
      ],
    });

    // Assembly & Maintenance
    specs.push({
      title: 'Assembly & Maintenance',
      specs: [
        { label: 'Assembly Required', value: 'Yes' },
        { label: 'Assembly Time', value: `${15 + hash % 30} minutes` },
        { label: 'Tools Included', value: 'Yes, All Hardware Included' },
        { label: 'Instructions', value: 'Detailed Step-by-Step Guide' },
        { label: 'Cleaning', value: 'Wipe with damp cloth' },
        { label: 'Maintenance', value: 'Minimal, Check screws quarterly' },
      ],
    });
  } else if (isAppliance) {
    // Appliance Specifications
    specs.push({
      title: 'Performance Specifications',
      specs: [
        { label: 'Power', value: `${800 + hash * 20}W` },
        { label: 'Voltage', value: '120V / 60Hz' },
        { label: 'Capacity', value: product.name.includes('Blender') ? `${48 + hash % 20}oz` : `${1.5 + (hash % 5) * 0.2}L` },
        { label: 'Speed Settings', value: `${5 + hash % 10}` },
        { label: 'Motor Type', value: hash % 2 === 0 ? 'AC Motor' : 'DC Brushless Motor' },
        { label: 'Noise Level', value: `${50 + hash % 30} dB` },
      ],
    });

    // Features & Technology
    specs.push({
      title: 'Features & Technology',
      specs: [
        { label: 'Control Type', value: hash % 2 === 0 ? 'Digital Touch Panel' : 'Dial Control' },
        { label: 'Display', value: hash % 2 === 0 ? 'LED Display' : 'LCD Display' },
        { label: 'Auto Shut-Off', value: 'Yes' },
        { label: 'Temperature Control', value: hash % 2 === 0 ? 'Adjustable' : 'Preset' },
        { label: 'Safety Features', value: 'Overheat Protection, Auto-Lock' },
        { label: 'Cord Length', value: `${3 + hash % 3} feet` },
      ],
    });

    // Materials & Design
    specs.push({
      title: 'Materials & Design',
      specs: [
        { label: 'Housing Material', value: hash % 2 === 0 ? 'Stainless Steel' : 'BPA-Free Plastic' },
        { label: 'Jar/Container', value: 'BPA-Free Tritan' },
        { label: 'Blade Material', value: 'Stainless Steel' },
        { label: 'Finish', value: hash % 2 === 0 ? 'Brushed Steel' : 'Matte Black' },
        { label: 'Dimensions', value: `${10 + hash % 6}" H x ${6 + hash % 4}" W x ${8 + hash % 3}" D` },
        { label: 'Weight', value: `${4 + hash % 6} lbs` },
      ],
    });

    // Care & Maintenance
    specs.push({
      title: 'Care & Maintenance',
      specs: [
        { label: 'Dishwasher Safe Parts', value: hash % 2 === 0 ? 'Yes, Removable Parts' : 'Hand Wash Only' },
        { label: 'Cleaning', value: 'Wipe base with damp cloth' },
        { label: 'Descaling', value: product.name.includes('Coffee') || product.name.includes('Kettle') ? 'Monthly Recommended' : 'N/A' },
        { label: 'Filter Replacement', value: product.name.includes('Coffee') ? 'Every 3 Months' : 'N/A' },
      ],
    });
  } else {
    // Other Home & Garden Products
    specs.push({
      title: 'Product Specifications',
      specs: [
        { label: 'Dimensions', value: `${15 + hash % 20}" L x ${12 + hash % 10}" W x ${10 + hash % 8}" H` },
        { label: 'Weight', value: `${5 + hash % 15} lbs` },
        { label: 'Material', value: hash % 2 === 0 ? 'Stainless Steel' : 'Plastic + Metal' },
        { label: 'Capacity', value: `${30 + hash % 50} units` },
        { label: 'Power Source', value: hash % 2 === 0 ? 'Electric (120V)' : 'Battery Powered' },
      ],
    });
  }

  // Environmental & Certifications
  specs.push({
    title: 'Environmental & Certifications',
    specs: [
      { label: 'Energy Rating', value: hash % 2 === 0 ? 'ENERGY STAR Certified' : 'Energy Efficient' },
      { label: 'Certifications', value: 'FCC, CE, RoHS, WEEE' },
      { label: 'Recyclable', value: `${80 + hash % 20}% Recyclable` },
      { label: 'Sustainable', value: hash % 2 === 0 ? 'Yes' : 'Partially' },
    ],
  });

  // Warranty & Support
  specs.push({
    title: 'Warranty & Support',
    specs: [
      { label: 'Warranty', value: hash % 2 === 0 ? '5 Years' : '7 Years' },
      { label: 'Coverage', value: 'Parts and Labor' },
      { label: 'Support', value: '24/7 Customer Service' },
      { label: 'Return Policy', value: '60 Days' },
    ],
  });

  return specs;
};

const generateSportsSpecs = (product: Product): ProductSpecSection[] => {
  const hash = generateUniqueValue(product.id, 45);
  const specs: ProductSpecSection[] = [];

  const isFootwear = product.name.toLowerCase().includes('shoe') || product.name.toLowerCase().includes('boot');
  const isEquipment = product.name.toLowerCase().includes('dumbbell') || product.name.toLowerCase().includes('bicycle');
  const isApparel = product.name.toLowerCase().includes('mat') || product.name.toLowerCase().includes('gear');

  // General Information
  specs.push({
    title: 'General Information',
    specs: [
      { label: 'Brand', value: 'NexusMarket Sport' },
      { label: 'Model', value: `NS-${product.id.toUpperCase()}` },
      { label: 'Category', value: product.category },
      { label: 'Sport Type', value: hash % 3 === 0 ? 'Running' : hash % 3 === 1 ? 'Training' : 'Multi-Sport' },
      { label: 'Skill Level', value: hash % 2 === 0 ? 'Professional' : 'Intermediate to Advanced' },
      { label: 'Country of Origin', value: 'USA' },
    ],
  });

  if (isFootwear) {
    // Footwear Specs
    specs.push({
      title: 'Shoe Specifications',
      specs: [
        { label: 'Upper Material', value: 'Flyknit / Engineered Mesh' },
        { label: 'Midsole', value: hash % 2 === 0 ? 'React Foam' : 'Boost Technology' },
        { label: 'Outsole', value: 'Carbon Rubber with Traction Pattern' },
        { label: 'Drop', value: `${8 + hash % 5}mm` },
        { label: 'Weight', value: `${8.5 + (hash % 20) * 0.1} oz` },
        { label: 'Cushioning', value: hash % 2 === 0 ? 'High' : 'Medium' },
        { label: 'Support Type', value: hash % 2 === 0 ? 'Neutral' : 'Stability' },
      ],
    });

    // Performance Features
    specs.push({
      title: 'Performance Features',
      specs: [
        { label: 'Breathability', value: 'Excellent - Mesh Upper' },
        { label: 'Flexibility', value: 'Flex Grooves in Forefoot' },
        { label: 'Traction', value: 'Multi-Surface Grip' },
        { label: 'Impact Protection', value: 'Heel and Forefoot Cushioning' },
        { label: 'Energy Return', value: hash % 2 === 0 ? 'High' : 'Medium-High' },
        { label: 'Terrain', value: 'Road / Track' },
      ],
    });
  } else if (isEquipment) {
    // Equipment Specs
    specs.push({
      title: 'Equipment Specifications',
      specs: [
        { label: 'Material', value: hash % 2 === 0 ? 'Cast Iron with Rubber Coating' : 'Steel Alloy' },
        { label: 'Weight Range', value: product.name.includes('Dumbbell') ? '5-52.5 lbs per hand' : 'N/A' },
        { label: 'Adjustability', value: product.name.includes('Dumbbell') ? '15 Weight Settings' : 'Height Adjustable' },
        { label: 'Increments', value: product.name.includes('Dumbbell') ? '2.5 lbs' : 'N/A' },
        { label: 'Dimensions', value: `${15 + hash % 20}" L x ${8 + hash % 10}" W x ${6 + hash % 8}" H` },
        { label: 'Total Weight', value: `${30 + hash % 80} lbs` },
      ],
    });

    // Construction & Durability
    specs.push({
      title: 'Construction & Durability',
      specs: [
        { label: 'Frame', value: product.name.includes('Bicycle') ? 'Aluminum Alloy' : 'Heavy-Duty Steel' },
        { label: 'Coating', value: 'Rubber / Powder Coated' },
        { label: 'Grip', value: 'Ergonomic Textured Grip' },
        { label: 'Warranty on Frame', value: product.name.includes('Bicycle') ? 'Lifetime' : 'N/A' },
        { label: 'Weight Capacity', value: product.name.includes('Bicycle') ? '275 lbs' : 'N/A' },
      ],
    });
  } else {
    // Other Sports Products
    specs.push({
      title: 'Product Specifications',
      specs: [
        { label: 'Material', value: hash % 2 === 0 ? 'Natural Rubber' : 'TPE (Eco-Friendly)' },
        { label: 'Thickness', value: product.name.includes('Mat') ? `${4 + hash % 4}mm` : 'N/A' },
        { label: 'Dimensions', value: `${68 + hash % 8}" L x ${24 + hash % 4}" W` },
        { label: 'Weight', value: `${2 + hash % 3} lbs` },
        { label: 'Texture', value: 'Non-Slip Surface' },
        { label: 'Carrying Strap', value: 'Included' },
      ],
    });

    // Performance Features
    specs.push({
      title: 'Performance Features',
      specs: [
        { label: 'Grip', value: 'Superior Non-Slip' },
        { label: 'Cushioning', value: hash % 2 === 0 ? 'High Density' : 'Medium Density' },
        { label: 'Durability', value: 'Commercial Grade' },
        { label: 'Moisture Resistance', value: 'Yes' },
        { label: 'Odor Resistant', value: 'Yes' },
      ],
    });
  }

  // Care & Maintenance
  specs.push({
    title: 'Care & Maintenance',
    specs: [
      { label: 'Cleaning', value: isFootwear ? 'Wipe with damp cloth, Air dry' : 'Wipe with mild soap and water' },
      { label: 'Storage', value: 'Store in cool, dry place' },
      { label: 'Maintenance', value: 'Minimal' },
      { label: 'Lifespan', value: isFootwear ? '300-500 miles' : 'Years of heavy use' },
    ],
  });

  // Warranty & Certifications
  specs.push({
    title: 'Warranty & Certifications',
    specs: [
      { label: 'Warranty', value: product.name.includes('Bicycle') ? 'Lifetime on Frame' : '2 Years' },
      { label: 'Quality Certifications', value: 'ISO 9001, CE' },
      { label: 'Safety Standards', value: hash % 2 === 0 ? 'ASTM Certified' : 'Tested to International Standards' },
      { label: 'Return Policy', value: '60 Days' },
    ],
  });

  return specs;
};

export const generateProductSpecifications = (product: Product): ProductSpecSection[] => {
  if (product.category === 'Electronics') {
    return generateElectronicsSpecs(product);
  } else if (product.category === 'Fashion') {
    return generateFashionSpecs(product);
  } else if (product.category === 'Home & Garden') {
    return generateHomeGardenSpecs(product);
  } else if (product.category === 'Sports') {
    return generateSportsSpecs(product);
  } else {
    // Generic specs for other categories
    const hash = generateUniqueValue(product.id, 50);
    return [
      {
        title: 'General Information',
        specs: [
          { label: 'Brand', value: 'NexusMarket' },
          { label: 'Model', value: `NM-${product.id.toUpperCase()}` },
          { label: 'Category', value: product.category },
          { label: 'Weight', value: `${2 + hash % 10} lbs` },
        ],
      },
      {
        title: 'Warranty & Support',
        specs: [
          { label: 'Warranty', value: '1 Year' },
          { label: 'Support', value: '24/7' },
          { label: 'Return Policy', value: '60 Days' },
        ],
      },
    ];
  }
};

// ===================================
// CATEGORY-SPECIFIC COMPARISON
// ===================================

export const generateComparisonData = (currentProduct: Product, allProducts: Product[]): ComparisonData => {
  const hash = generateUniqueValue(currentProduct.id, 99);

  // Get competitors from same category
  const competitorProducts = allProducts
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3);

  // Fill with mock competitors if not enough real products
  while (competitorProducts.length < 3) {
    competitorProducts.push({
      ...currentProduct,
      id: `mock-${competitorProducts.length}`,
      name: `Competitor ${String.fromCharCode(65 + competitorProducts.length)}`,
      price: currentProduct.price * (1.1 + competitorProducts.length * 0.05),
      rating: Math.max(3.5, currentProduct.rating - 0.3 - competitorProducts.length * 0.2),
    } as Product);
  }

  const competitorNames = competitorProducts.map((_, i) => ({
    name: `Competitor ${String.fromCharCode(65 + i)}`
  }));

  let features: ComparisonFeature[] = [];
  let advantages: string[] = [];

  // Category-specific comparison
  if (currentProduct.category === 'Electronics') {
    features = [
      {
        name: 'Price',
        current: `$${currentProduct.price.toFixed(2)}`,
        competitors: competitorProducts.map(c => `$${(c.price * (1.05 + hash % 20 / 100)).toFixed(2)}`),
        highlight: 'current',
      },
      {
        name: 'Rating',
        current: `${currentProduct.rating}/5.0`,
        competitors: competitorProducts.map((c, i) => `${Math.max(3.5, currentProduct.rating - 0.3 - (hash + i) % 10 / 10).toFixed(1)}/5.0`),
        highlight: 'current',
      },
      {
        name: 'Warranty',
        current: hash % 2 === 0 ? '3 Years' : '2 Years',
        competitors: ['1 Year', '1 Year', '90 Days'],
        highlight: 'current',
      },
      {
        name: 'Battery Life',
        current: `${36 + hash % 24} hours`,
        competitors: [`${20 + hash % 15} hours`, `${24 + hash % 12} hours`, `${18 + hash % 10} hours`],
        highlight: 'current',
      },
      {
        name: 'Water Resistance',
        current: hash % 3 === 0 ? 'IP68' : 'IP67',
        competitors: ['IP67', 'IP65', 'IP54'],
        highlight: hash % 3 === 0 ? 'current' : undefined,
      },
      {
        name: 'Fast Charging',
        current: `${45 + (hash % 4) * 20}W`,
        competitors: ['30W', '25W', '18W'],
        highlight: 'current',
      },
      {
        name: 'Wireless Charging',
        current: hash % 2 === 0,
        competitors: [true, false, false],
        highlight: hash % 2 === 0 ? 'current' : undefined,
      },
      {
        name: '5G Support',
        current: hash % 3 !== 0,
        competitors: [false, hash % 2 === 0, false],
        highlight: hash % 3 !== 0 ? 'current' : undefined,
      },
      {
        name: 'Customer Support',
        current: '24/7',
        competitors: ['Business Hours', '24/7', 'Email Only'],
        highlight: 'current',
      },
      {
        name: 'Free Shipping',
        current: true,
        competitors: [false, true, false],
        highlight: 'current',
      },
    ];

    advantages = [
      `Best warranty coverage - ${hash % 2 === 0 ? '3' : '2'} full years of protection`,
      `Superior battery life - Up to ${36 + hash % 24} hours of use`,
      '24/7 customer support always available',
      'Free shipping included - No hidden costs',
      hash % 2 === 0 ? 'Wireless charging supported' : 'Fast charging technology',
    ];
  } else if (currentProduct.category === 'Fashion') {
    features = [
      {
        name: 'Price',
        current: `$${currentProduct.price.toFixed(2)}`,
        competitors: competitorProducts.map(c => `$${(c.price * (1.08 + hash % 15 / 100)).toFixed(2)}`),
        highlight: 'current',
      },
      {
        name: 'Rating',
        current: `${currentProduct.rating}/5.0`,
        competitors: competitorProducts.map((c, i) => `${Math.max(3.8, currentProduct.rating - 0.2 - (hash + i) % 8 / 10).toFixed(1)}/5.0`),
        highlight: 'current',
      },
      {
        name: 'Material Quality',
        current: 'Premium Genuine Leather',
        competitors: ['Faux Leather', 'Synthetic Blend', 'Standard Leather'],
        highlight: 'current',
      },
      {
        name: 'Fit Options',
        current: 'XS to 3XL',
        competitors: ['S to XL', 'M to XXL', 'S to L'],
        highlight: 'current',
      },
      {
        name: 'Sustainability',
        current: true,
        competitors: [false, false, hash % 2 === 0],
        highlight: 'current',
      },
      {
        name: 'Handcrafted',
        current: true,
        competitors: [false, hash % 2 === 0, false],
        highlight: 'current',
      },
      {
        name: 'Return Period',
        current: '60 Days',
        competitors: ['30 Days', '30 Days', '14 Days'],
        highlight: 'current',
      },
      {
        name: 'Free Size Exchange',
        current: true,
        competitors: [hash % 2 === 0, false, false],
        highlight: 'current',
      },
      {
        name: 'Care Instructions',
        current: 'Easy Care',
        competitors: ['Dry Clean Only', 'Hand Wash', 'Dry Clean Only'],
      },
      {
        name: 'Warranty',
        current: '1 Year',
        competitors: ['90 Days', '6 Months', 'No Warranty'],
        highlight: 'current',
      },
    ];

    advantages = [
      'Premium genuine leather - Superior quality and durability',
      'Widest size range - XS to 3XL available',
      '60-day return policy - Longest in category',
      'Sustainably sourced materials - Eco-friendly production',
      'Free size exchange - Perfect fit guaranteed',
    ];
  } else if (currentProduct.category === 'Home & Garden') {
    features = [
      {
        name: 'Price',
        current: `$${currentProduct.price.toFixed(2)}`,
        competitors: competitorProducts.map(c => `$${(c.price * (1.12 + hash % 18 / 100)).toFixed(2)}`),
        highlight: 'current',
      },
      {
        name: 'Rating',
        current: `${currentProduct.rating}/5.0`,
        competitors: competitorProducts.map((c, i) => `${Math.max(3.6, currentProduct.rating - 0.3 - (hash + i) % 9 / 10).toFixed(1)}/5.0`),
        highlight: 'current',
      },
      {
        name: 'Warranty',
        current: hash % 2 === 0 ? '5 Years' : '7 Years',
        competitors: ['1 Year', '2 Years', '1 Year'],
        highlight: 'current',
      },
      {
        name: 'Weight Capacity',
        current: '300 lbs',
        competitors: ['250 lbs', '275 lbs', '200 lbs'],
        highlight: 'current',
      },
      {
        name: 'Assembly Time',
        current: '15-30 minutes',
        competitors: ['45 minutes', '60 minutes', '90 minutes'],
        highlight: 'current',
      },
      {
        name: 'Energy Efficient',
        current: true,
        competitors: [false, hash % 2 === 0, false],
        highlight: 'current',
      },
      {
        name: 'Eco-Friendly Materials',
        current: true,
        competitors: [false, false, hash % 2 === 0],
        highlight: 'current',
      },
      {
        name: 'Tools Included',
        current: true,
        competitors: [false, hash % 2 === 0, false],
        highlight: 'current',
      },
      {
        name: 'Free Shipping',
        current: true,
        competitors: [false, true, false],
        highlight: 'current',
      },
      {
        name: 'Customer Support',
        current: '24/7',
        competitors: ['Business Hours', 'Email Only', 'Business Hours'],
        highlight: 'current',
      },
    ];

    advantages = [
      `Industry-best ${hash % 2 === 0 ? '5' : '7'}-year warranty`,
      'Highest weight capacity - Supports up to 300 lbs',
      'Quickest assembly - Ready in 15-30 minutes',
      'Energy efficient - ENERGY STAR certified',
      'All assembly tools included',
    ];
  } else if (currentProduct.category === 'Sports') {
    features = [
      {
        name: 'Price',
        current: `$${currentProduct.price.toFixed(2)}`,
        competitors: competitorProducts.map(c => `$${(c.price * (1.15 + hash % 20 / 100)).toFixed(2)}`),
        highlight: 'current',
      },
      {
        name: 'Rating',
        current: `${currentProduct.rating}/5.0`,
        competitors: competitorProducts.map((c, i) => `${Math.max(3.7, currentProduct.rating - 0.2 - (hash + i) % 8 / 10).toFixed(1)}/5.0`),
        highlight: 'current',
      },
      {
        name: 'Professional Grade',
        current: true,
        competitors: [false, hash % 2 === 0, false],
        highlight: 'current',
      },
      {
        name: 'Warranty',
        current: 'Lifetime on Frame',
        competitors: ['2 Years', '1 Year', '90 Days'],
        highlight: 'current',
      },
      {
        name: 'Durability',
        current: 'Commercial Grade',
        competitors: ['Standard', 'Residential', 'Standard'],
        highlight: 'current',
      },
      {
        name: 'Weight',
        current: `${195 + hash % 30}g`,
        competitors: [`${220 + hash % 40}g`, `${210 + hash % 35}g`, `${240 + hash % 50}g`],
        highlight: 'current',
      },
      {
        name: 'Performance Tested',
        current: true,
        competitors: [hash % 2 === 0, false, false],
        highlight: 'current',
      },
      {
        name: 'Eco-Friendly',
        current: true,
        competitors: [false, false, hash % 2 === 0],
        highlight: 'current',
      },
      {
        name: 'Free Shipping',
        current: true,
        competitors: [false, hash % 2 === 0, false],
        highlight: 'current',
      },
      {
        name: 'Customer Support',
        current: '24/7',
        competitors: ['Business Hours', 'Business Hours', 'Email Only'],
        highlight: 'current',
      },
    ];

    advantages = [
      'Professional-grade quality used by athletes',
      'Lifetime warranty on frame/structure',
      'Commercial-grade durability',
      `Lightest in class - Only ${195 + hash % 30}g`,
      'Performance tested by professionals',
    ];
  } else {
    // Generic comparison for other categories
    features = [
      {
        name: 'Price',
        current: `$${currentProduct.price.toFixed(2)}`,
        competitors: competitorProducts.map(c => `$${(c.price * (1.1 + hash % 15 / 100)).toFixed(2)}`),
        highlight: 'current',
      },
      {
        name: 'Rating',
        current: `${currentProduct.rating}/5.0`,
        competitors: competitorProducts.map((c, i) => `${Math.max(3.5, currentProduct.rating - 0.3 - (hash + i) % 10 / 10).toFixed(1)}/5.0`),
        highlight: 'current',
      },
      {
        name: 'Warranty',
        current: '2 Years',
        competitors: ['1 Year', '1 Year', '90 Days'],
        highlight: 'current',
      },
      {
        name: 'Free Shipping',
        current: true,
        competitors: [false, hash % 2 === 0, false],
        highlight: 'current',
      },
      {
        name: 'Customer Support',
        current: '24/7',
        competitors: ['Business Hours', 'Email Only', 'Business Hours'],
        highlight: 'current',
      },
    ];

    advantages = [
      'Best value for money',
      '2-year comprehensive warranty',
      'Free shipping included',
      '24/7 customer support',
    ];
  }

  return {
    current: { name: currentProduct.name },
    competitors: competitorNames,
    features,
    advantages,
  };
};
