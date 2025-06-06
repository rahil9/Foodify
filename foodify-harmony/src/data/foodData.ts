
import { Category, Restaurant, MenuItem } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Burgers', image: '/images/burger.jpg' },
  { id: '2', name: 'Pizza', image: '/images/pizza.jpg' },
  { id: '3', name: 'Biryani', image: '/images/biryani.jpg' },
  { id: '4', name: 'Chinese', image: '/images/chinese.jpg' },
  { id: '5', name: 'Desserts', image: '/images/dessert.jpg' },
  { id: '6', name: 'South Indian', image: '/images/south-indian.jpg' },
  { id: '7', name: 'North Indian', image: '/images/north-indian.jpg' },
  { id: '8', name: 'Thali', image: '/images/thali.jpg' },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger King',
    image: 'https://b.zmtcdn.com/data/pictures/chains/1/49781/15918ea9293921d6ee0518f78f630e1b_featured_v2.jpg',
    cuisine: 'Burgers',
    rating: 4.2,
    deliveryTime: '30-40 min',
    minOrder: 150,
    description: 'Home of the Whopper, Burger King offers flame-grilled burgers, crispy fries, and refreshing beverages in a casual setting.',
    categories: ['Burgers', 'Fast Food'],
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: '/images/restaurant-2.jpg',
    cuisine: 'Pizza',
    rating: 4.0,
    deliveryTime: '35-45 min',
    minOrder: 200,
    description: 'Pizza Hut is an American restaurant chain and international franchise founded in 1958. Known for its Italian-American cuisine including pizza and pasta.',
    categories: ['Pizza', 'Italian'],
  },
  {
    id: '3',
    name: 'Biryani House',
    image: '/images/restaurant-3.jpg',
    cuisine: 'Biryani',
    rating: 4.5,
    deliveryTime: '25-35 min',
    minOrder: 250,
    description: 'Authentic Hyderabadi biryani made with fragrant basmati rice, tender meat, and signature spices. Every bite is a flavorful journey.',
    categories: ['Biryani', 'North Indian'],
  },
  {
    id: '4',
    name: 'China Town',
    image: '/images/restaurant-4.jpg',
    cuisine: 'Chinese',
    rating: 4.1,
    deliveryTime: '30-40 min',
    minOrder: 200,
    description: 'Experience the authentic flavors of Chinese cuisine with our extensive menu of stir-fries, noodles, and signature dishes.',
    categories: ['Chinese', 'Asian'],
  },
  {
    id: '5',
    name: 'Sweet Tooth',
    image: '/images/restaurant-5.jpg',
    cuisine: 'Desserts',
    rating: 4.7,
    deliveryTime: '20-30 min',
    minOrder: 150,
    description: 'Indulge in a variety of decadent desserts including cakes, pastries, ice creams, and traditional Indian sweets.',
    categories: ['Desserts', 'Bakery'],
  },
  {
    id: '6',
    name: 'Dosa Corner',
    image: '/images/restaurant-6.jpg',
    cuisine: 'South Indian',
    rating: 4.3,
    deliveryTime: '25-35 min',
    minOrder: 150,
    description: 'Authentic South Indian cuisine featuring crispy dosas, fluffy idlis, and flavorful vadas served with signature chutneys and sambar.',
    categories: ['South Indian', 'Vegetarian'],
  },
  {
    id: '7',
    name: 'Punjabi Dhaba',
    image: '/images/restaurant-7.jpg',
    cuisine: 'North Indian',
    rating: 4.4,
    deliveryTime: '30-40 min',
    minOrder: 250,
    description: 'Traditional North Indian cuisine with rich gravies, tandoori specialties, and hearty vegetarian and non-vegetarian options.',
    categories: ['North Indian', 'Punjabi'],
  },
  {
    id: '8',
    name: 'Thali Palace',
    image: '/images/restaurant-8.jpg',
    cuisine: 'Thali',
    rating: 4.6,
    deliveryTime: '25-35 min',
    minOrder: 200,
    description: 'Complete meal experience with our signature thalis featuring a balanced selection of dishes representing regional Indian cuisines.',
    categories: ['Thali', 'North Indian', 'South Indian'],
  },
];

export const menuItems: MenuItem[] = [
  // Burger King Menu
  {
    id: 'bk1',
    restaurantId: '1',
    name: 'Whopper',
    description: 'Our signature flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    price: 199,
    image: '/images/menu-whopper.jpg',
    category: 'Burgers',
    isVeg: false,
  },
  {
    id: 'bk2',
    restaurantId: '1',
    name: 'Chicken Whopper',
    description: 'Flame-grilled chicken patty topped with fresh lettuce, tomatoes, creamy mayonnaise, and crunchy pickles on a toasted sesame seed bun.',
    price: 179,
    image: '/images/menu-chicken-whopper.jpg',
    category: 'Burgers',
    isVeg: false,
  },
  {
    id: 'bk3',
    restaurantId: '1',
    name: 'Veggie Burger',
    description: 'Crispy vegetable patty topped with fresh lettuce, juicy tomatoes, creamy mayonnaise, and crunchy pickles on a toasted sesame seed bun.',
    price: 149,
    image: '/images/menu-veggie-burger.jpg',
    category: 'Burgers',
    isVeg: true,
  },
  {
    id: 'bk4',
    restaurantId: '1',
    name: 'French Fries',
    description: 'Golden, crispy, thick-cut French fries seasoned with just the right amount of salt.',
    price: 99,
    image: '/images/menu-fries.jpg',
    category: 'Sides',
    isVeg: true,
  },
  {
    id: 'bk5',
    restaurantId: '1',
    name: 'Pepsi',
    description: 'Refreshing cola beverage served ice cold.',
    price: 59,
    image: '/images/menu-pepsi.jpg',
    category: 'Beverages',
    isVeg: true,
  },

  // Pizza Hut Menu
  {
    id: 'ph1',
    restaurantId: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza topped with our signature tomato sauce, mozzarella cheese, and fresh basil leaves.',
    price: 249,
    image: '/images/menu-margherita.jpg',
    category: 'Pizza',
    isVeg: true,
  },
  {
    id: 'ph2',
    restaurantId: '2',
    name: 'Pepperoni Pizza',
    description: 'Our signature pizza sauce topped with mozzarella cheese and spicy pepperoni slices.',
    price: 349,
    image: '/images/menu-pepperoni.jpg',
    category: 'Pizza',
    isVeg: false,
  },
  {
    id: 'ph3',
    restaurantId: '2',
    name: 'Veggie Supreme',
    description: 'Loaded with bell peppers, onions, mushrooms, olives, and corn on our signature sauce and cheese blend.',
    price: 299,
    image: '/images/menu-veggie-supreme.jpg',
    category: 'Pizza',
    isVeg: true,
  },
  {
    id: 'ph4',
    restaurantId: '2',
    name: 'Garlic Breadsticks',
    description: 'Freshly baked breadsticks topped with garlic butter and herbs, served with our special dip.',
    price: 149,
    image: '/images/menu-breadsticks.jpg',
    category: 'Sides',
    isVeg: true,
  },
  {
    id: 'ph5',
    restaurantId: '2',
    name: 'Choco Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center, dusted with powdered sugar.',
    price: 99,
    image: '/images/menu-choco-lava.jpg',
    category: 'Desserts',
    isVeg: true,
  },

  // Biryani House Menu
  {
    id: 'bh1',
    restaurantId: '3',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken pieces, herbs, and signature spices in the traditional Hyderabadi style.',
    price: 249,
    image: '/images/menu-chicken-biryani.jpg',
    category: 'Biryani',
    isVeg: false,
  },
  {
    id: 'bh2',
    restaurantId: '3',
    name: 'Mutton Biryani',
    description: 'Fragrant basmati rice layered with tender mutton pieces and cooked with authentic spices and herbs.',
    price: 299,
    image: '/images/menu-mutton-biryani.jpg',
    category: 'Biryani',
    isVeg: false,
  },
  {
    id: 'bh3',
    restaurantId: '3',
    name: 'Veg Biryani',
    description: 'Basmati rice cooked with mixed vegetables, herbs, and traditional spices for a flavorful vegetarian delight.',
    price: 199,
    image: '/images/menu-veg-biryani.jpg',
    category: 'Biryani',
    isVeg: true,
  },
  {
    id: 'bh4',
    restaurantId: '3',
    name: 'Chicken 65',
    description: 'Spicy, deep-fried chicken bites seasoned with aromatic spices and curry leaves.',
    price: 199,
    image: '/images/menu-chicken65.jpg',
    category: 'Starters',
    isVeg: false,
  },
  {
    id: 'bh5',
    restaurantId: '3',
    name: 'Raita',
    description: 'Refreshing yogurt with mixed vegetables and mild spices, the perfect accompaniment to biryani.',
    price: 49,
    image: '/images/menu-raita.jpg',
    category: 'Sides',
    isVeg: true,
  },
];

export const getRestaurantsByCategory = (categoryName: string): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.categories.some(category => 
      category.toLowerCase() === categoryName.toLowerCase()
    )
  );
};

export const getMenuItemsByRestaurant = (restaurantId: string): MenuItem[] => {
  return menuItems.filter(item => item.restaurantId === restaurantId);
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getAllRestaurants = (): Restaurant[] => {
  return restaurants;
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};
