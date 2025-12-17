export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  specs: { [key: string]: string };
  rating: number;
  reviews: any[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];

interface ProductData {
  name: string;
  category: string;
  images: string[];
}

const productData: ProductData[] = [
  {
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617625802912-cdf085c4fb2b?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598331638053-f525d9a9d7a0?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'USB-C Charging Cable',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591290619762-d23f3ba0e544?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Wireless Gaming Mouse',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1613141411244-0e4ac50963c0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'HD Webcam',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1635514569146-9a9607ecf303?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622800779775-94a43d8e0275?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1616627064300-8d56a0d1a166?w=800&h=800&fit=crop',
    ],
  },
  {
    name: '4K Action Camera',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1606510907744-6b1c1c7e0b6d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Phone Stand Holder',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1544451256-d79ab5fd8c17?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609902726285-00668009f004?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598662957477-06398609f0c2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Laptop Cooling Pad',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Cotton T-Shirt',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Denim Jeans',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Running Shoes',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Winter Jacket',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1548126032-079859e0c071?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544923246-77315f95b57f?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Leather Wallet',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612015670817-0127d66d5b39?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1607206482579-0368aa30a1d7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608060270960-d4c4125ac5c6?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Sports Cap',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1589307357838-450e1d787d4f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Canvas Backpack',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Sunglasses',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Wrist Watch',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585200254761-5cdf0b5b0e8f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Belt',
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583f2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605733513597-a8f08e87842b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1624222247344-550fb60583f2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1624028469869-32a53e9329f5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Coffee Maker',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585516173956-610ff47bdb00?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Blender',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591910998018-90ea02f1b1e7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610824351043-cc2d3c893f47?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Air Purifier',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1631722645911-b97d1d80e2b6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1635611986001-95de7db49a12?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Desk Lamp',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1550985543-49bee3167284?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Wall Clock',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513735539099-cf6e5d583b87?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577811812050-ab0dd7858f9f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612198791941-13c7ace55c10?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Photo Frame',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1582053433188-0697772b3189?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591330001123-f01d1af6dc46?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Throw Pillow',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603899904428-3b4d4ed2e28d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612240498936-6d073e4c6e7d?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Area Rug',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1597310365949-e1cf39bcf422?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604403428907-673e7f4cd087?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Curtains',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585128903994-03a0f3faaf52?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594733408364-d501c1c7fc34?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Plant Pot',
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593691509543-c55fb32d8ce5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502310200428-a0b4e11fb3b0?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Yoga Mat',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Dumbbell Set',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Jump Rope',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Resistance Bands',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611395362468-d8e1e0e7bbe3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1619451683991-c0a8fb0bc96e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Tennis Racket',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617882793122-7d46c6543c43?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Basketball',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1627627256672-027a4613d028?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Soccer Ball',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Golf Balls',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593111774240-d529f12c0f14?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Swimming Goggles',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591635756909-2e3a0778f0c2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Bike Helmet',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1506968430-ee6f5f5ba9b4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1557716568-2a22dfd20c4f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610448721566-a6bf8c95ca91?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1589118949060-c1a576e6a99c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556316384-12c35d30afa4?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Mystery Novel',
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Cookbook',
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590760668209-1d257e4a29dd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Travel Guide',
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1569592608916-0e2e4c3b2f6e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565731910988-f1d8f1a7abb9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Self-Help Book',
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Science Magazine',
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600783245777-cf14c0c02103?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522316778615-a74fb8c2f7fb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606327054629-64de8d799b44?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'LEGO Set',
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582051879372-dad98d62ac69?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1613963761144-9e9d8f6fe776?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Board Game',
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Puzzle 1000pc',
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609602005921-fe5609cef7e5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1550011308-904769b5a7c5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Action Figure',
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1624365169817-aaf5b81f49e6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Stuffed Animal',
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551212191-2aaa151d7f0c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&h=800&fit=crop',
    ],
  },
];

export const products: Product[] = productData.map((data, index) => {
  const price = Math.round((Math.random() * 200 + 20) * 83 * 100) / 100;
  const hasDiscount = Math.random() > 0.5;
  const originalPrice = hasDiscount ? Math.round(price * 1.3 * 100) / 100 : undefined;

  return {
    id: `product-${index + 1}`,
    name: data.name,
    price,
    originalPrice,
    category: data.category,
    image: data.images[0],
    gallery: data.images,
    description: `High quality ${data.name.toLowerCase()} with premium features and excellent build quality. Perfect for everyday use and designed to last.`,
    specs: {},
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviews: [],
    isNew: index < 10,
    isBestSeller: index % 5 === 0,
    isTrending: index % 7 === 0,
  };
});
