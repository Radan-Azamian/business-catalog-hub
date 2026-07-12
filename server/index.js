require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
//i got this part of seeding from gemini:

const seedDatabase = async () => {
    try {
        const Item = require('./models/Item');
        
        const count = await Item.count();
        if (count === 0) {
            await Item.bulkCreate([
    {
        title: "Espresso Blend Bags",
        description: "Premium dark roast coffee beans with hints of dark chocolate and caramel.",
        category: "Coffee Beans",
        price: 15.00,
        imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
        features: "Dark Roast, 100% Arabica, Weight: 250g" // 🌟 Changed from array to a standard string text
    },
    {
        title: "Cold Brew Special",
        description: "Smooth, cold-steeped signature blend, ready to serve over ice.",
        category: "Cold Drinks",
        price: 5.50,
        imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
        features: "Low Acidity, Served Chilled, 16 oz" // 🌟 Changed from array to string
    },
    {
        title: "Classic Hot Latte",
        description: "Rich espresso combined with steamed milk and a thin layer of foam.",
        category: "Hot Drinks",
        price: 4.75,
        imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500",
        features: "Creamy Texture, Freshly Brewed, 12 oz" // 🌟 Changed from array to string
    },
    {
        title: "Chocolate Almond Croissant",
        description: "Flaky artisan pastry filled with sweet almond paste and premium chocolate lines.",
        category: "Bakery",
        price: 4.25,
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500",
        features: "Freshly Baked Daily, Contains Nuts" // 🌟 Changed from array to string
    },
    {
    title: "Vanilla Cold Brew",
    description: "Slow-steeped for 20 hours, infused with natural Madagascar vanilla bean syrup and cream.",
    category: "Cold Drinks",
    price: 5.50,
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500",
    features: "Low acidity, smooth finish"
  },
  {
    title: "Matcha Latte",
    description: "Premium stone-ground Japanese Uji matcha whisked with velvety steamed oat milk.",
    category: "Hot Drinks",
    price: 5.75,
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500",
    features: "Antioxidant rich, ceremonial grade"
  },
  {
    title: "Ethiopian Yirgacheffe",
    description: "Light roast whole beans featuring vibrant floral aromas and distinct citrus tasting notes.",
    category: "Coffee Beans",
    price: 18.00,
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
    features: "100% Arabica, Single Origin"
  },
  {
    title: "Almond Croissant",
    description: "Twice-baked flaky French pastry layered with rich frangipane almond cream and topped with sliced almonds.",
    category: "Bakery",
    price: 4.75,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500",
    features: "Baked fresh daily"
  },
  {
    title: "Iced Caramel Macchiato",
    description: "Rich espresso layered over cold milk and sweet vanilla syrup, finished with a heavy drizzle of buttery caramel.",
    category: "Cold Drinks",
    price: 5.95,
    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500",
    features: "Sweet and layered"
  }
]);
            console.log("☕ Database seeded with initial cafe menu items successfully!");
        } else {
            console.log("📊 Items already exist in PostgreSQL. Skipping seeding.");
        }
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
    }
};

const startServer = async () => {
    await connectDB();     // Step 1: Establish the database handshake
    await seedDatabase();  // Step 2: Seed the tables immediately after
};
startServer();

app.get('/', (req, res) => {
    res.send('server is running smooth');
});

app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});