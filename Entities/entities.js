// User entity
const user = {
  id: 1,
  username: "admin",
  password: "admin123",
  email: "admin@example.com",
  phone: "00201100000000",
  fname: "Ahmed",
  lname: "Samy",
  dob: "01-01-1970",
  sex: "Male", // or "Female"
  address: "Cairo",
  role: "admin", // or 'customer'
};

// Product entity
const product = {
  id: 1,
  name: "Product 1",
  description: "Description for Product 1",
  price: 19.99,
  quantity: 50,
  categoryId: 1,
  image: "path/to/product1-image.jpg", // Example path to the product image
};

// Category entity
const category = {
  id: 1,
  name: "Category 1",
  description: "Description for Category 1",
};

// Order entity
const order = {
  id: 1,
  customerId: 1,
  status: "pending", // or 'confirmed', 'rejected'
  date: "23-12-2023",
  totalPrice: 59.97,
  orderItems: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

// Wish List entity
const wishList = {
  id: 1,
  customerId: 1,
  productId: 1,
};

// Shopping Cart entity
const shoppingCart = {
  id: 1,
  customerId: 1,
  productId: 1,
  quantity: 3,
};
