// ======================= Shared Product Data (Single Source of Truth) =======================
export const PRODUCTS = [
  {
    id: 1,
    name: "Oasis Bloom Kurta",
    price: 2699,
    originalPrice: 3299,
    image: "images/1.jpeg",
    isNew: true,
    description: "Escape to paradise with the Oasis Bloom Kurta. Featuring a vibrant, tropical print on a pristine white base with delicate schiffli embroidery, this piece is crafted from breathable cotton for ultimate comfort on warm, sunny days.",
    sizes: ["S", "M", "L"],
    colors: ["Tropical White"],
    category: "casual",
    rating: 4.9,
    reviews: [{ author: "Vikram R.", text: "The print is even more stunning in person. Perfect for a beach vacation!" }]
  },
  {
    id: 2,
    name: "Azure Paisley Kurta",
    price: 2499,
    originalPrice: 2999,
    image: "images/2.jpeg",
    isNew: true,
    description: "A modern take on a classic motif. This kurta, in a calming shade of azure green, features bold, contemporary paisley prints. The subtle, textured fabric adds a layer of sophistication, making it ideal for both casual outings and artistic events.",
    sizes: ["M", "L", "XL"],
    colors: ["Azure Green"],
    category: "festive",
    rating: 4.7,
    reviews: [{ author: "Sameer T.", text: "Love the unique design. It's a real head-turner." }]
  },
  {
    id: 3,
    name: "Sunset Ombre Kurta",
    price: 2899,
    originalPrice: 3499,
    image: "images/3.jpeg",
    isNew: false,
    description: "Capture the warmth of a desert sunset with this stunning ombre kurta. Transitioning from a soft cream to a rich mango yellow, it's adorned with delicate, silver elephant embroidery, adding a touch of royal charm.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mango Yellow"],
    category: "festive",
    rating: 4.8,
    reviews: [{ author: "Karan J.", text: "The color gradient is beautiful. Very elegant piece." }]
  },
  {
    id: 4,
    name: "Rosegold Festive Kurta",
    price: 3199,
    originalPrice: 3999,
    image: "images/4.jpeg",
    isNew: true,
    description: "Radiate elegance at your next celebration. This rosegold pink kurta features intricate mirror work on the yoke and a stunning, multi-colored embroidered border, making it a masterpiece of festive wear.",
    sizes: ["M", "L", "XL"],
    colors: ["Rosegold Pink"],
    category: "festive",
    rating: 4.9,
    reviews: [{ author: "Arjun M.", text: "Perfect for weddings. The detail on the border is incredible." }]
  },
  {
    id: 5,
    name: "Midnight Paisley Kurta",
    price: 2599,
    originalPrice: 3199,
    image: "images/5.jpeg",
    isNew: false,
    description: "Bold and charismatic, the Midnight Paisley Kurta is designed for the man who makes a statement. The deep black canvas is brought to life with striking white paisley embroidery, creating a powerful and sophisticated contrast.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black & White"],
    category: "classic",
    rating: 4.8,
    reviews: []
  },
  {
    id: 6,
    name: "Sterling Vine Kurta",
    price: 2799,
    originalPrice: 3399,
    image: "images/6.jpeg",
    isNew: true,
    description: "Subtle luxury defines the Sterling Vine Kurta. In a sophisticated shade of pale mint green, it features delicate, self-colored floral vine embroidery throughout. A perfect choice for daytime events and sophisticated gatherings.",
    sizes: ["S", "M", "L"],
    colors: ["Sterling Mint"],
    category: "classic",
    rating: 4.7,
    reviews: [{ author: "Rahul D.", text: "Very classy and understated. The fabric feels amazing." }]
  },
  {
    id: 7,
    name: "Smoked Steel Kurta",
    price: 2999,
    originalPrice: 3699,
    image: "images/7.jpeg",
    isNew: false,
    description: "A masterpiece of modern ethnic wear. This kurta showcases a stunning grey ombre effect, transitioning from a light silver to a deep charcoal, all adorned with an intricate geometric and floral pattern.",
    sizes: ["M", "L", "XL"],
    colors: ["Smoked Steel"],
    category: "classic",
    rating: 4.9,
    reviews: []
  },
  {
    id: 8,
    name: "Plum Noir Embroidered Kurta",
    price: 2699,
    originalPrice: 3299,
    image: "images/8.jpeg",
    isNew: false,
    description: "Deep, mysterious, and elegant. This rich plum-colored kurta is enhanced with fine black embroidery on the collar, placket, and a cascading pattern at the hem, offering a look of refined sophistication.",
    sizes: ["L", "XL", "XXL"],
    colors: ["Plum Noir"],
    category: "festive",
    rating: 4.8,
    reviews: [{ author: "Nikhil G.", text: "The color is very unique and looks very royal." }]
  },
  {
    id: 9,
    name: "Sandstone Texture Kurta",
    price: 2299,
    originalPrice: 2799,
    image: "images/9.jpeg",
    isNew: false,
    description: "Inspired by natural textures, this sandstone beige kurta features a subtle, vertically striated pattern. Its understated and earthy tone makes it a versatile piece for a variety of occasions, from casual to semi-formal.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sandstone Beige"],
    category: "casual",
    rating: 4.6,
    reviews: []
  }
];

// Simple helpers usable across pages
export const findProduct = (id) => PRODUCTS.find(p => p.id === id);
export const filterPRODUCTS = ({ category = '', size = '', maxPrice = Infinity, query = '' }) => {
  return PRODUCTS.filter(p => {
    const catOK = !category || p.category === category;
    const sizeOK = !size || (p.sizes || []).includes(size);
    const priceOK = p.price <= maxPrice;
    const queryOK = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return catOK && sizeOK && priceOK && queryOK;
  });
};
