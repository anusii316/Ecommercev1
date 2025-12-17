import { Product } from '../stores/productsStore';

export interface DetailedReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
  images?: string[];
}

const generateUniqueSeed = (productId: string, index: number): number => {
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0) * (index + 1), 0);
  return hash % 1000;
};

const reviewers = [
  { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
  { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
  { name: 'David Thompson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { name: 'Jessica Martinez', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop' },
  { name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
  { name: 'Amanda Lee', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop' },
  { name: 'Robert Garcia', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
  { name: 'Lisa Anderson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' },
  { name: 'Christopher Brown', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop' },
  { name: 'Jennifer Taylor', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop' },
  { name: 'Matthew Davis', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop' },
  { name: 'Ashley White', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop' },
  { name: 'Daniel Moore', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop' },
  { name: 'Sophia Thomas', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop' },
  { name: 'William Jackson', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop' },
  { name: 'Olivia Harris', avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop' },
  { name: 'Ethan Martin', avatar: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=150&h=150&fit=crop' },
  { name: 'Isabella Clark', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop' },
  { name: 'Alexander Lewis', avatar: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=150&h=150&fit=crop' },
  { name: 'Mia Walker', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop' },
  { name: 'Noah Hall', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop' },
  { name: 'Ava Young', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop' },
  { name: 'Liam King', avatar: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=150&h=150&fit=crop' },
  { name: 'Emma Wright', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
  { name: 'Lucas Scott', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&h=150&fit=crop' },
  { name: 'Charlotte Green', avatar: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=150&h=150&fit=crop' },
  { name: 'Mason Baker', avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=150&h=150&fit=crop' },
  { name: 'Harper Adams', avatar: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=150&h=150&fit=crop' },
  { name: 'Logan Nelson', avatar: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=150&h=150&fit=crop' },
];

// Category-specific positive review templates
const electronicsPositiveReviews = [
  {
    title: 'Exceptional performance and battery life',
    comment: 'The performance is outstanding. Battery life easily lasts all day with heavy use. The display is crisp and vibrant. Charging is incredibly fast with the included charger. Connectivity is rock solid with 5G and WiFi. Build quality feels premium with no creaking or flex. The cooling system keeps everything running smoothly even during intensive tasks. All ports and buttons are well-placed and responsive.',
  },
  {
    title: 'Best tech purchase this year',
    comment: 'Setup was incredibly easy right out of the box. The interface is intuitive and responsive. Processing power is impressive - multitasking is seamless. Sound quality exceeds expectations with clear highs and deep bass. The wireless connectivity never drops. Screen brightness is perfect even in direct sunlight. Camera quality is superb in both daylight and low light.',
  },
  {
    title: 'Premium quality at fair price',
    comment: 'The build quality rivals products costing twice as much. Screen resolution is razor sharp. Battery performance exceeds advertised specs. Fast charging gets me to 80% in under 40 minutes. The processor handles everything I throw at it without lag. Storage speed is blazing fast. All features work flawlessly including biometric security.',
  },
];

const fashionPositiveReviews = [
  {
    title: 'Perfect fit and amazing quality',
    comment: 'The fit is absolutely perfect - true to size as advertised. The leather quality is exceptional with a beautiful finish. Stitching is impeccable with reinforced seams. The material feels luxurious and substantial. Comfort level is outstanding even after hours of wear. The design is timeless and versatile. Hardware like zippers and buttons are high quality. The lining is soft and well-finished.',
  },
  {
    title: 'Exceeded expectations in every way',
    comment: 'The craftsmanship is immediately apparent. Material quality is top-notch - genuine leather that smells amazing. The fit is exactly as described in the size chart. Color is rich and true to photos. Comfort is exceptional with no break-in period needed. Styling is elegant and works for both casual and formal occasions. Details like pockets and closures are thoughtfully designed.',
  },
  {
    title: 'Best fashion purchase in years',
    comment: 'The quality of the materials is outstanding. Fit is perfection - ordered my usual size and fits perfectly. The leather has a beautiful texture and patina. Construction quality is excellent with strong stitching throughout. Very comfortable from day one. The style is classic and timeless. Received so many compliments. Worth every penny.',
  },
];

const homeGardenPositiveReviews = [
  {
    title: 'Sturdy, functional, and easy to assemble',
    comment: 'Assembly took only 20 minutes with clear instructions. All parts fit perfectly with no issues. The build quality is exceptional - feels very sturdy and well-made. Materials are high quality and durable. Functionality exceeds expectations with smooth adjustments. Weight capacity is more than adequate. Finish is beautiful with no imperfections. Takes up minimal space while maximizing utility.',
  },
  {
    title: 'Outstanding quality and performance',
    comment: 'The construction is rock solid with premium materials throughout. Performance is excellent - powerful and efficient. Very quiet operation even at high settings. Energy efficiency is noticeable on my electric bill. All features work perfectly as advertised. Easy to clean and maintain. The design is both functional and aesthetically pleasing. Warranty coverage provides great peace of mind.',
  },
  {
    title: 'Best value for money',
    comment: 'Quality is far better than expected at this price point. Assembly was straightforward with all hardware included. The build is incredibly sturdy with no wobbling. Adjustability features work smoothly. Materials feel premium and durable. Functionality is excellent for daily use. The ergonomic design really makes a difference. Customer service was responsive and helpful.',
  },
];

const sportsPositiveReviews = [
  {
    title: 'Professional quality equipment',
    comment: 'The build quality is exceptional - clearly professional-grade. Performance has noticeably improved my workouts. Comfort level is outstanding even during extended use. Materials are durable and well-constructed. Grip is excellent with no slipping. The design is ergonomic and well-thought-out. Cushioning provides perfect support without being too soft. Traction is superb on all surfaces. Breathability keeps everything cool and dry.',
  },
  {
    title: 'Game changer for my training',
    comment: 'This has completely transformed my training routine. The quality is immediately apparent - built to last. Comfort during use is exceptional with no hot spots or rubbing. Performance features work exactly as advertised. Durability is impressive even with daily intense use. Fit is perfect with adjustable features. Materials are high quality and breathable. Support and cushioning are ideal for my needs.',
  },
  {
    title: 'Worth every penny',
    comment: 'The quality rivals equipment at professional gyms. Construction is solid with premium materials. Performance is outstanding for all training types. Comfort level makes long sessions enjoyable. Durability is exceptional - shows no wear after months of heavy use. Adjustability features provide perfect customization. The grip/traction is excellent. Design is both functional and attractive.',
  },
];

const genericPositiveReviews = [
  {
    title: 'Excellent product, highly recommend',
    comment: 'Quality exceeds expectations for the price point. Build is solid with no defects or issues. Performance is reliable and consistent. Easy to use right out of the box. Customer service was helpful and responsive. Packaging was secure and professional. Arrived quickly with careful handling. Would definitely purchase again.',
  },
  {
    title: 'Great purchase, very satisfied',
    comment: 'This product delivers exactly what it promises. Quality is good with attention to detail. Functions work reliably every time. Setup was simple and straightforward. Value for money is excellent. No regrets with this purchase. Customer support answered my questions promptly. Shipping was fast and item arrived in perfect condition.',
  },
];

const electronicsGoodReviews = [
  {
    title: 'Solid performance with minor quirks',
    comment: 'Overall a great device with excellent battery life and fast performance. The display is beautiful and responsive. Build quality is good though not quite premium. Charging speed is impressive. The only minor issue is the interface could be more intuitive in places. Camera quality is very good in good lighting. For the price, this is an excellent value.',
  },
  {
    title: 'Good tech for the money',
    comment: 'Performance is solid for everyday tasks. Battery life meets expectations. Screen quality is very good. Build feels sturdy though shows fingerprints easily. Connectivity is reliable. Speakers are decent but not exceptional. Overall very happy with this purchase. A few minor software quirks but nothing major.',
  },
];

const fashionGoodReviews = [
  {
    title: 'Great quality, fit runs slightly large',
    comment: 'The leather quality is excellent and looks beautiful. Construction is solid with good stitching. Very comfortable to wear. My only note is it runs slightly large - consider sizing down. The color is rich and true to photos. Style is classic and versatile. Overall very pleased with this purchase. Would buy again.',
  },
  {
    title: 'Beautiful piece, minor fit issues',
    comment: 'Material quality is outstanding - genuine leather as described. Craftsmanship is excellent. The fit is mostly good but slightly snug in the shoulders for me. Color and finish are beautiful. Comfort improves after a few wears. Style is timeless. Very happy overall despite minor fit consideration.',
  },
];

const homeGardenGoodReviews = [
  {
    title: 'Good quality, assembly takes time',
    comment: 'The build quality is very good with solid materials. Once assembled, everything is sturdy and functional. Assembly took longer than expected - about 45 minutes. Instructions could be clearer. Performance is excellent once set up. Adjustments work smoothly. For the price, this is good value. Very satisfied with the final result.',
  },
  {
    title: 'Works well, slightly noisy',
    comment: 'Performance is very good - powerful and effective. Build quality is solid. Easy to use with intuitive controls. The only downside is slightly higher noise than expected during operation. Energy efficiency seems good. Easy to clean and maintain. Overall a good purchase for the price.',
  },
];

const sportsGoodReviews = [
  {
    title: 'Great for beginners, good quality',
    comment: 'Quality is good for the price point. Comfort is decent though takes some getting used to. Performance is solid for regular workouts. Durability seems promising so far. Fit is mostly true to size. Materials are good quality. Support is adequate for moderate use. Would recommend for beginners or casual use.',
  },
  {
    title: 'Solid equipment, minor comfort issues',
    comment: 'Build quality is good with durable materials. Performance meets expectations. The only issue is comfort during extended use - may need adjustment period. Fit is accurate to size chart. Design is functional. Good value for the price. Would recommend with minor comfort caveat.',
  },
];

const electronicsAverageReviews = [
  {
    title: 'Decent but battery disappoints',
    comment: 'Performance is okay for basic tasks but lags with multiple apps. Display quality is acceptable. Battery life is shorter than advertised - barely makes it through a day. Build quality is average. Charging is reasonably fast. Connectivity works but occasionally drops. For the price, expected better.',
  },
];

const fashionAverageReviews = [
  {
    title: 'Quality okay, fit is off',
    comment: 'The leather quality is acceptable but not premium. Fit is problematic - runs small and tight in some areas. Stitching is okay but not exceptional. Color is close to photos. Comfort is just okay. Style is nice. For the price, expected better fit and finish. Might return for size issues.',
  },
];

const homeGardenAverageReviews = [
  {
    title: 'Works but quality concerns',
    comment: 'Assembly was frustrating with unclear instructions. Some parts did not align perfectly. Once together, everything is functional but not as sturdy as hoped. Materials feel average quality. Adjustments are stiff. For the price, quality should be better. Does the job but nothing special.',
  },
];

const sportsAverageReviews = [
  {
    title: 'Okay for light use',
    comment: 'Quality is average - acceptable for occasional use. Comfort is lacking for longer sessions. Materials feel cheaper than expected. Durability is questionable. Fit is somewhat true to size. Performance is okay for light workouts. Not suitable for serious training. Price should reflect the quality better.',
  },
];

const electronicsNegativeReviews = [
  {
    title: 'Battery life is terrible',
    comment: 'Very disappointed with the battery performance - barely lasts half a day with normal use. Build quality feels cheaper than the price suggests. Display has mediocre brightness. Charging is slow despite claims. Connectivity issues are frequent. Interface is laggy and unresponsive. Customer support was unhelpful. Would not recommend.',
  },
];

const fashionNegativeReviews = [
  {
    title: 'Poor quality, sizing way off',
    comment: 'The leather quality is disappointing - feels synthetic despite claims. Sizing is completely off - runs two sizes small. Stitching is already coming loose in places. Color does not match photos. Very uncomfortable with stiff material. Not worth the price at all. Returning immediately.',
  },
];

const homeGardenNegativeReviews = [
  {
    title: 'Flimsy and difficult to assemble',
    comment: 'Assembly was a nightmare with missing parts and poor instructions. Build quality is very disappointing - feels flimsy and unstable. Materials are cheap. Adjustments do not work smoothly. Makes concerning noises during use. Not at all worth the price. Very disappointed with this purchase.',
  },
];

const sportsNegativeReviews = [
  {
    title: 'Broke after two weeks',
    comment: 'Quality is extremely poor - broke after just two weeks of normal use. Materials are cheap and flimsy. Comfort was never good. Fit is inaccurate. Construction is shoddy. Performance was mediocre at best. Not durable at all. Complete waste of money. Do not buy.',
  },
];

export const generateProductReviews = (product: Product, count: number = 40): DetailedReview[] => {
  const reviews: DetailedReview[] = [];
  const productRating = product.rating;

  // Determine review distribution based on rating
  let fiveStarCount = 0;
  let fourStarCount = 0;
  let threeStarCount = 0;
  let twoStarCount = 0;

  if (productRating >= 4.7) {
    fiveStarCount = Math.floor(count * 0.70);
    fourStarCount = Math.floor(count * 0.20);
    threeStarCount = Math.floor(count * 0.07);
    twoStarCount = count - fiveStarCount - fourStarCount - threeStarCount;
  } else if (productRating >= 4.5) {
    fiveStarCount = Math.floor(count * 0.60);
    fourStarCount = Math.floor(count * 0.25);
    threeStarCount = Math.floor(count * 0.10);
    twoStarCount = count - fiveStarCount - fourStarCount - threeStarCount;
  } else if (productRating >= 4.0) {
    fiveStarCount = Math.floor(count * 0.50);
    fourStarCount = Math.floor(count * 0.30);
    threeStarCount = Math.floor(count * 0.13);
    twoStarCount = count - fiveStarCount - fourStarCount - threeStarCount;
  } else {
    fiveStarCount = Math.floor(count * 0.40);
    fourStarCount = Math.floor(count * 0.30);
    threeStarCount = Math.floor(count * 0.20);
    twoStarCount = count - fiveStarCount - fourStarCount - threeStarCount;
  }

  // Select category-specific templates
  let positiveTemplates = genericPositiveReviews;
  let goodTemplates = [
    {
      title: 'Very good product overall',
      comment: 'This is a solid product that does what it promises. Build quality is good and performance is reliable. Setup was straightforward. Good value for the money.',
    },
  ];
  let averageTemplates = [
    {
      title: 'It is okay, not great',
      comment: 'This product is decent but nothing special. Works as described but does not impress. Quality is average for the price. Gets the job done.',
    },
  ];
  let negativeTemplates = [
    {
      title: 'Disappointed with quality',
      comment: 'Quality is below expectations. Several issues during use. Build quality is lacking. Customer support was unhelpful. Would not recommend.',
    },
  ];

  if (product.category === 'Electronics') {
    positiveTemplates = electronicsPositiveReviews;
    goodTemplates = electronicsGoodReviews;
    averageTemplates = electronicsAverageReviews;
    negativeTemplates = electronicsNegativeReviews;
  } else if (product.category === 'Fashion') {
    positiveTemplates = fashionPositiveReviews;
    goodTemplates = fashionGoodReviews;
    averageTemplates = fashionAverageReviews;
    negativeTemplates = fashionNegativeReviews;
  } else if (product.category === 'Home & Garden') {
    positiveTemplates = homeGardenPositiveReviews;
    goodTemplates = homeGardenGoodReviews;
    averageTemplates = homeGardenAverageReviews;
    negativeTemplates = homeGardenNegativeReviews;
  } else if (product.category === 'Sports') {
    positiveTemplates = sportsPositiveReviews;
    goodTemplates = sportsGoodReviews;
    averageTemplates = sportsAverageReviews;
    negativeTemplates = sportsNegativeReviews;
  }

  let reviewIndex = 0;

  // Generate 5-star reviews
  for (let i = 0; i < fiveStarCount; i++) {
    const seed = generateUniqueSeed(product.id, reviewIndex);
    const reviewer = reviewers[seed % reviewers.length];
    const template = positiveTemplates[seed % positiveTemplates.length];
    const daysAgo = seed % 120;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `${product.id}-review-${reviewIndex}`,
      author: reviewer.name,
      avatar: reviewer.avatar,
      rating: 5,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: template.title,
      comment: template.comment,
      helpful: 50 + (seed % 500),
      notHelpful: seed % 15,
      verified: seed % 10 !== 0,
    });
    reviewIndex++;
  }

  // Generate 4-star reviews
  for (let i = 0; i < fourStarCount; i++) {
    const seed = generateUniqueSeed(product.id, reviewIndex);
    const reviewer = reviewers[seed % reviewers.length];
    const template = goodTemplates[seed % goodTemplates.length];
    const daysAgo = seed % 120;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `${product.id}-review-${reviewIndex}`,
      author: reviewer.name,
      avatar: reviewer.avatar,
      rating: 4,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: template.title,
      comment: template.comment,
      helpful: 30 + (seed % 300),
      notHelpful: seed % 20,
      verified: seed % 8 !== 0,
    });
    reviewIndex++;
  }

  // Generate 3-star reviews
  for (let i = 0; i < threeStarCount; i++) {
    const seed = generateUniqueSeed(product.id, reviewIndex);
    const reviewer = reviewers[seed % reviewers.length];
    const template = averageTemplates[seed % averageTemplates.length];
    const daysAgo = seed % 120;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `${product.id}-review-${reviewIndex}`,
      author: reviewer.name,
      avatar: reviewer.avatar,
      rating: 3,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: template.title,
      comment: template.comment,
      helpful: 15 + (seed % 150),
      notHelpful: seed % 30,
      verified: seed % 5 !== 0,
    });
    reviewIndex++;
  }

  // Generate 2-star reviews
  for (let i = 0; i < twoStarCount; i++) {
    const seed = generateUniqueSeed(product.id, reviewIndex);
    const reviewer = reviewers[seed % reviewers.length];
    const template = negativeTemplates[seed % negativeTemplates.length];
    const daysAgo = seed % 120;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `${product.id}-review-${reviewIndex}`,
      author: reviewer.name,
      avatar: reviewer.avatar,
      rating: 2,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: template.title,
      comment: template.comment,
      helpful: 10 + (seed % 100),
      notHelpful: seed % 40,
      verified: seed % 6 !== 0,
    });
    reviewIndex++;
  }

  return reviews.sort((a, b) => b.helpful - a.helpful);
};
