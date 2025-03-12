const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: {
      coordinates: [-118.7798, 34.0259]
    }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: {
      coordinates: [-74.006, 40.7128]
    }
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: {
      coordinates: [-106.8175, 39.1911]
    }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: {
      coordinates: [11.2558, 43.7696]
    }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    geometry: {
      coordinates: [-122.675, 45.5051]
    }
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: {
      coordinates: [-86.8515, 21.1619]
    }
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geometry: {
      coordinates: [-119.9772, 39.0968]
    }
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    geometry: {
      coordinates: [-118.2437, 34.0522], // Longitude, Latitude for Los Angeles
    },
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    geometry: {
      coordinates: [7.2266, 46.0961], // Longitude, Latitude for Verbier
    },
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    geometry: {
      coordinates: [34.6857, -2.1540], // Longitude, Latitude for Serengeti
    },
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: {
      coordinates: [4.8952, 52.3702], // Longitude, Latitude for Amsterdam
    },
  },
  {
    title: "Beachfront Bungalow",
    description: "Relax by the ocean in this peaceful beachfront bungalow with direct access to the shore.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Bali",
    country: "Indonesia",
    geometry: {
      coordinates: [115.1889, -8.4095], // Longitude, Latitude for Bali
    },
  },
  {
    title: "Cozy Cabin in the Woods",
    description: "Escape the hustle and bustle in this cozy off-grid cabin surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Banff",
    country: "Canada",
    geometry: {
      coordinates: [-115.5708, 51.1784], // Longitude, Latitude for Banff
    },
  },
  {
    title: "Tokyo High-Rise Apartment",
    description: "Enjoy stunning skyline views from this modern high-rise apartment in the heart of Tokyo.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564501049412-61c2a3083793?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Tokyo",
    country: "Japan",
    geometry: {
      coordinates: [139.6917, 35.6895], // Longitude, Latitude for Tokyo
    },
  },
  {
    title: "Countryside Vineyard Estate",
    description: "Unwind in this charming vineyard estate, surrounded by rolling hills and lush vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3300,
    location: "Tuscany",
    country: "Italy",
    geometry: {
      coordinates: [11.2558, 43.7696], // Longitude, Latitude for Tuscany
    },
  },
  {
    title: "Modern Loft in New York",
    description: "Stay in a stylish loft in downtown Manhattan, close to everything the city has to offer.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560185007-cdfiles65f52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "New York",
    country: "United States",
    geometry: {
      coordinates: [-74.006, 40.7128], // Longitude, Latitude for New York
    },
  },
  {
    title: "Mountain View Retreat",
    description: "Breathtaking mountain views and fresh air make this retreat perfect for relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519678489646-d1eb25fe375f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Aspen",
    country: "United States",
    geometry: {
      coordinates: [-106.8175, 39.1911], // Longitude, Latitude for Aspen
    },
  }
  ];
  
  module.exports = { Initdata: sampleListings };