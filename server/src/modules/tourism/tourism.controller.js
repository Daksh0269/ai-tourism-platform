const tourismService = require('./tourism.service');

class TourismController {
  async create(req, res, next) {
    try {
      const attraction = await tourismService.createAttraction(req.body);
      res.status(201).json({ success: true, data: attraction });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const attraction = await tourismService.getAttraction(req.params.id);
      res.status(200).json({ success: true, data: attraction });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const attractions = await tourismService.filterAttractions(req.query);
      res.status(200).json({ success: true, data: attractions.documents, total: attractions.total });
    } catch (error) {
      next(error);
    }
  }

  // --- NEW SEED METHOD ---
  async seed(req, res, next) {
    try {
      const attractions = [
  // =========================================================
  // CHHATTISGARH
  // =========================================================

  {
    name: "Mahant Ghasidas Memorial Museum",
    description: "A museum preserving archaeological artifacts, sculptures, coins, inscriptions, tribal objects and historical collections of Chhattisgarh.",
    location: "Raipur, Chhattisgarh",
    lat: 21.2405,
    lng: 81.6367,
    categories: ["culture", "museum", "history"],
    averageVisitDuration: 120,
    entryFee: 50,
    status: "open"
  },
  {
    name: "Swami Vivekanand Sarovar (Budha Talab)",
    description: "One of Raipur's oldest lakes, popular for evening walks, recreation and the large Swami Vivekananda statue.",
    location: "Raipur, Chhattisgarh",
    lat: 21.2333,
    lng: 81.6297,
    categories: ["nature", "lake", "park", "leisure"],
    averageVisitDuration: 90,
    entryFee: 10,
    status: "open"
  },
  {
    name: "Purkhouti Muktangan",
    description: "An open-air cultural museum showcasing the tribal lifestyle, traditions, architecture and folk art of Chhattisgarh.",
    location: "Naya Raipur, Chhattisgarh",
    lat: 21.1444,
    lng: 81.7914,
    categories: ["culture", "museum", "park", "tribal", "art"],
    averageVisitDuration: 180,
    entryFee: 20,
    status: "open"
  },
  {
    name: "Nandan Van Zoo & Safari",
    description: "A large zoological park and safari area featuring diverse wildlife and natural habitats.",
    location: "Naya Raipur, Chhattisgarh",
    lat: 21.2001,
    lng: 81.5002,
    categories: ["wildlife", "zoo", "nature", "family"],
    averageVisitDuration: 240,
    entryFee: 100,
    status: "open"
  },
  {
    name: "MM Fun City",
    description: "A popular water amusement park near Raipur offering water rides, pools and family entertainment.",
    location: "Raipur, Chhattisgarh",
    lat: 21.2681,
    lng: 81.7674,
    categories: ["entertainment", "waterpark", "family", "leisure"],
    averageVisitDuration: 300,
    entryFee: 500,
    status: "open"
  },
  {
    name: "Rajiv Lochan Mandir",
    description: "A historic temple dedicated to Lord Vishnu located near the Mahanadi, Pairi and Sondhur river confluence.",
    location: "Rajim, Chhattisgarh",
    lat: 20.9602,
    lng: 81.8786,
    categories: ["temple", "religious", "history", "culture"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Sirpur Archaeological Site",
    description: "An ancient archaeological town containing Buddhist, Hindu and Jain monuments dating back many centuries.",
    location: "Sirpur, Chhattisgarh",
    lat: 21.3126,
    lng: 82.1926,
    categories: ["history", "archaeology", "culture", "heritage"],
    averageVisitDuration: 240,
    entryFee: 20,
    status: "open"
  },
  {
    name: "Chitrakote Waterfall",
    description: "A spectacular horseshoe-shaped waterfall on the Indravati River, often called the Niagara Falls of India.",
    location: "Bastar, Chhattisgarh",
    lat: 19.2069,
    lng: 81.7017,
    categories: ["waterfall", "nature", "adventure", "photography"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Tirathgarh Waterfall",
    description: "A scenic multi-tiered waterfall surrounded by dense forests in the Kanger Valley region.",
    location: "Bastar, Chhattisgarh",
    lat: 18.8972,
    lng: 81.8758,
    categories: ["waterfall", "nature", "adventure", "trekking"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Kanger Valley National Park",
    description: "A biodiversity-rich national park known for forests, caves, waterfalls and wildlife.",
    location: "Bastar, Chhattisgarh",
    lat: 18.8500,
    lng: 81.9000,
    categories: ["wildlife", "nature", "forest", "adventure"],
    averageVisitDuration: 360,
    entryFee: 50,
    status: "open"
  },
  {
    name: "Bhoramdeo Temple",
    description: "A historic temple complex famous for intricate stone carvings and architecture.",
    location: "Kawardha, Chhattisgarh",
    lat: 22.0646,
    lng: 81.1864,
    categories: ["temple", "history", "architecture", "heritage"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Danteshwari Temple",
    description: "One of the most important Shakti temples in Chhattisgarh and a major pilgrimage destination.",
    location: "Dantewada, Chhattisgarh",
    lat: 18.8990,
    lng: 81.3509,
    categories: ["temple", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Mainpat",
    description: "A scenic hill station known for forests, waterfalls, Tibetan settlements and cool weather.",
    location: "Mainpat, Chhattisgarh",
    lat: 22.7767,
    lng: 83.2500,
    categories: ["hill_station", "nature", "waterfall", "adventure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Ghatarani Waterfall",
    description: "A popular waterfall and picnic destination surrounded by lush greenery near Raipur.",
    location: "Gariaband, Chhattisgarh",
    lat: 21.2740,
    lng: 82.1070,
    categories: ["waterfall", "nature", "picnic", "adventure"],
    averageVisitDuration: 180,
    entryFee: 20,
    status: "open"
  },

  // =========================================================
  // MADHYA PRADESH
  // =========================================================

  {
    name: "Khajuraho Group of Monuments",
    description: "World-famous temple complex known for its magnificent medieval architecture and stone sculptures.",
    location: "Khajuraho, Madhya Pradesh",
    lat: 24.8318,
    lng: 79.9199,
    categories: ["heritage", "temple", "architecture", "history"],
    averageVisitDuration: 240,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Sanchi Stupa",
    description: "Ancient Buddhist monument and UNESCO World Heritage Site dating back to the Mauryan period.",
    location: "Sanchi, Madhya Pradesh",
    lat: 23.4870,
    lng: 77.7397,
    categories: ["heritage", "buddhist", "history", "architecture"],
    averageVisitDuration: 180,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Kanha National Park",
    description: "One of India's famous tiger reserves, known for tigers, barasingha, forests and wildlife safaris.",
    location: "Kanha, Madhya Pradesh",
    lat: 22.3345,
    lng: 80.6115,
    categories: ["wildlife", "safari", "nature", "adventure"],
    averageVisitDuration: 480,
    entryFee: 500,
    status: "open"
  },
  {
    name: "Bandhavgarh National Park",
    description: "A renowned tiger reserve with dense forests, wildlife safaris and an ancient hilltop fort.",
    location: "Umaria, Madhya Pradesh",
    lat: 23.6848,
    lng: 81.0270,
    categories: ["wildlife", "tiger", "safari", "adventure"],
    averageVisitDuration: 480,
    entryFee: 500,
    status: "open"
  },
  {
    name: "Ujjain Mahakaleshwar Temple",
    description: "One of the twelve Jyotirlinga temples and one of India's most important Hindu pilgrimage sites.",
    location: "Ujjain, Madhya Pradesh",
    lat: 23.1828,
    lng: 75.7682,
    categories: ["temple", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Pachmarhi",
    description: "A popular hill station surrounded by Satpura forests, waterfalls, caves and scenic viewpoints.",
    location: "Pachmarhi, Madhya Pradesh",
    lat: 22.4675,
    lng: 78.4346,
    categories: ["hill_station", "nature", "waterfall", "adventure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Bhojpur Temple",
    description: "Historic Shiva temple famous for its massive lingam and unfinished architectural structure.",
    location: "Bhojpur, Madhya Pradesh",
    lat: 23.1006,
    lng: 77.5848,
    categories: ["temple", "history", "architecture"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // RAJASTHAN
  // =========================================================

  {
    name: "Amber Fort",
    description: "Magnificent hilltop fort known for Rajput architecture, courtyards, palaces and panoramic views.",
    location: "Jaipur, Rajasthan",
    lat: 26.9855,
    lng: 75.8513,
    categories: ["fort", "heritage", "architecture", "history"],
    averageVisitDuration: 180,
    entryFee: 100,
    status: "open"
  },
  {
    name: "Hawa Mahal",
    description: "Iconic Jaipur palace famous for its distinctive honeycomb-like facade and historic architecture.",
    location: "Jaipur, Rajasthan",
    lat: 26.9239,
    lng: 75.8267,
    categories: ["palace", "heritage", "architecture", "photography"],
    averageVisitDuration: 90,
    entryFee: 50,
    status: "open"
  },
  {
    name: "City Palace Jaipur",
    description: "Historic royal complex featuring palaces, courtyards, museums and royal artifacts.",
    location: "Jaipur, Rajasthan",
    lat: 26.9258,
    lng: 75.8237,
    categories: ["palace", "museum", "heritage", "history"],
    averageVisitDuration: 180,
    entryFee: 300,
    status: "open"
  },
  {
    name: "Jantar Mantar Jaipur",
    description: "Historic astronomical observatory containing large-scale instruments built in the 18th century.",
    location: "Jaipur, Rajasthan",
    lat: 26.9247,
    lng: 75.8246,
    categories: ["science", "heritage", "history", "architecture"],
    averageVisitDuration: 90,
    entryFee: 50,
    status: "open"
  },
  {
    name: "Mehrangarh Fort",
    description: "Massive hilltop fort overlooking Jodhpur, containing palaces, museums and historic collections.",
    location: "Jodhpur, Rajasthan",
    lat: 26.2980,
    lng: 73.0185,
    categories: ["fort", "heritage", "museum", "history"],
    averageVisitDuration: 240,
    entryFee: 200,
    status: "open"
  },
  {
    name: "Jaisalmer Fort",
    description: "Living medieval fort rising from the Thar Desert and containing residences, temples and markets.",
    location: "Jaisalmer, Rajasthan",
    lat: 26.9124,
    lng: 70.9120,
    categories: ["fort", "heritage", "desert", "architecture"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "City Palace Udaipur",
    description: "Grand palace complex overlooking Lake Pichola, known for courtyards, museums and royal architecture.",
    location: "Udaipur, Rajasthan",
    lat: 24.5764,
    lng: 73.6835,
    categories: ["palace", "heritage", "museum", "lake"],
    averageVisitDuration: 180,
    entryFee: 300,
    status: "open"
  },
  {
    name: "Lake Pichola",
    description: "Scenic artificial lake surrounded by palaces, ghats and historic buildings.",
    location: "Udaipur, Rajasthan",
    lat: 24.5726,
    lng: 73.6813,
    categories: ["lake", "nature", "boating", "photography"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Pushkar Lake",
    description: "Sacred lake surrounded by temples and ghats and an important pilgrimage destination.",
    location: "Pushkar, Rajasthan",
    lat: 26.4897,
    lng: 74.5511,
    categories: ["lake", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // DELHI
  // =========================================================

  {
    name: "India Gate",
    description: "Iconic war memorial and one of Delhi's most recognizable landmarks.",
    location: "New Delhi, Delhi",
    lat: 28.6129,
    lng: 77.2295,
    categories: ["monument", "history", "photography", "landmark"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Red Fort",
    description: "Historic Mughal fort and UNESCO World Heritage Site representing India's architectural heritage.",
    location: "New Delhi, Delhi",
    lat: 28.6562,
    lng: 77.2410,
    categories: ["fort", "heritage", "history", "architecture"],
    averageVisitDuration: 180,
    entryFee: 35,
    status: "open"
  },
  {
    name: "Qutub Minar",
    description: "UNESCO World Heritage monument and one of India's most famous medieval towers.",
    location: "New Delhi, Delhi",
    lat: 28.5244,
    lng: 77.1855,
    categories: ["heritage", "history", "architecture", "monument"],
    averageVisitDuration: 120,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Humayun's Tomb",
    description: "Magnificent Mughal garden tomb and an important architectural precursor to the Taj Mahal.",
    location: "New Delhi, Delhi",
    lat: 28.5933,
    lng: 77.2507,
    categories: ["heritage", "history", "architecture", "garden"],
    averageVisitDuration: 120,
    entryFee: 35,
    status: "open"
  },

  // =========================================================
  // UTTAR PRADESH
  // =========================================================

  {
    name: "Taj Mahal",
    description: "World-famous marble mausoleum and UNESCO World Heritage Site, renowned for Mughal architecture.",
    location: "Agra, Uttar Pradesh",
    lat: 27.1751,
    lng: 78.0421,
    categories: ["heritage", "monument", "architecture", "romantic"],
    averageVisitDuration: 180,
    entryFee: 50,
    status: "open"
  },
  {
    name: "Agra Fort",
    description: "Massive Mughal fort containing palaces, courtyards and historic structures.",
    location: "Agra, Uttar Pradesh",
    lat: 27.1795,
    lng: 78.0211,
    categories: ["fort", "heritage", "history", "architecture"],
    averageVisitDuration: 150,
    entryFee: 50,
    status: "open"
  },
  {
    name: "Varanasi Ghats",
    description: "Historic riverfront ghats along the Ganges famous for spiritual ceremonies, culture and photography.",
    location: "Varanasi, Uttar Pradesh",
    lat: 25.3060,
    lng: 83.0100,
    categories: ["religious", "culture", "river", "spiritual"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Kashi Vishwanath Temple",
    description: "One of the most revered Shiva temples and an important pilgrimage destination.",
    location: "Varanasi, Uttar Pradesh",
    lat: 25.3109,
    lng: 83.0107,
    categories: ["temple", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Ayodhya Ram Mandir",
    description: "Major Hindu pilgrimage destination associated with Lord Ram and the ancient city of Ayodhya.",
    location: "Ayodhya, Uttar Pradesh",
    lat: 26.7950,
    lng: 82.1945,
    categories: ["temple", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // MAHARASHTRA
  // =========================================================

  {
    name: "Gateway of India",
    description: "Iconic waterfront monument overlooking Mumbai Harbour.",
    location: "Mumbai, Maharashtra",
    lat: 18.9220,
    lng: 72.8347,
    categories: ["monument", "heritage", "landmark", "photography"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Marine Drive",
    description: "Famous Mumbai waterfront promenade known for its sea views and evening atmosphere.",
    location: "Mumbai, Maharashtra",
    lat: 18.9430,
    lng: 72.8238,
    categories: ["beach", "leisure", "nature", "photography"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Elephanta Caves",
    description: "Ancient rock-cut cave complex containing remarkable sculptures and temples.",
    location: "Mumbai, Maharashtra",
    lat: 18.9633,
    lng: 72.9315,
    categories: ["caves", "heritage", "history", "architecture"],
    averageVisitDuration: 180,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Ajanta Caves",
    description: "Ancient Buddhist rock-cut caves famous for murals, sculptures and religious art.",
    location: "Aurangabad, Maharashtra",
    lat: 20.5519,
    lng: 75.7033,
    categories: ["caves", "heritage", "buddhist", "art"],
    averageVisitDuration: 240,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Ellora Caves",
    description: "UNESCO World Heritage cave complex featuring Buddhist, Hindu and Jain monuments.",
    location: "Aurangabad, Maharashtra",
    lat: 20.0268,
    lng: 75.1780,
    categories: ["caves", "heritage", "history", "architecture"],
    averageVisitDuration: 240,
    entryFee: 40,
    status: "open"
  },

  // =========================================================
  // GOA
  // =========================================================

  {
    name: "Baga Beach",
    description: "Popular North Goa beach known for water activities, restaurants and vibrant nightlife.",
    location: "Goa",
    lat: 15.5557,
    lng: 73.7517,
    categories: ["beach", "water_sports", "leisure", "nightlife"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Calangute Beach",
    description: "One of Goa's most popular beaches with water sports, restaurants and tourist facilities.",
    location: "Goa",
    lat: 15.5440,
    lng: 73.7553,
    categories: ["beach", "water_sports", "leisure"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Basilica of Bom Jesus",
    description: "Historic church and UNESCO World Heritage Site famous for its Baroque architecture.",
    location: "Old Goa, Goa",
    lat: 15.5009,
    lng: 73.9118,
    categories: ["church", "heritage", "architecture", "religious"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Dudhsagar Falls",
    description: "Spectacular multi-tiered waterfall surrounded by the forests of the Western Ghats.",
    location: "Goa",
    lat: 15.3144,
    lng: 74.3144,
    categories: ["waterfall", "nature", "adventure", "trekking"],
    averageVisitDuration: 360,
    entryFee: 500,
    status: "open"
  },

  // =========================================================
  // KARNATAKA
  // =========================================================

  {
    name: "Mysore Palace",
    description: "Grand royal palace famous for Indo-Saracenic architecture and illuminated evening views.",
    location: "Mysuru, Karnataka",
    lat: 12.3052,
    lng: 76.6552,
    categories: ["palace", "heritage", "history", "architecture"],
    averageVisitDuration: 150,
    entryFee: 100,
    status: "open"
  },
  {
    name: "Hampi",
    description: "UNESCO World Heritage archaeological site containing ruins of the Vijayanagara Empire.",
    location: "Hampi, Karnataka",
    lat: 15.3350,
    lng: 76.4600,
    categories: ["heritage", "ruins", "history", "architecture"],
    averageVisitDuration: 360,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Bengaluru Palace",
    description: "Historic Tudor-style palace and major heritage attraction in Bengaluru.",
    location: "Bengaluru, Karnataka",
    lat: 13.0035,
    lng: 77.5891,
    categories: ["palace", "heritage", "architecture", "history"],
    averageVisitDuration: 120,
    entryFee: 300,
    status: "open"
  },

  // =========================================================
  // KERALA
  // =========================================================

  {
    name: "Munnar",
    description: "Popular hill station famous for tea plantations, misty mountains and scenic landscapes.",
    location: "Munnar, Kerala",
    lat: 10.0889,
    lng: 77.0595,
    categories: ["hill_station", "nature", "tea", "adventure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Alleppey Backwaters",
    description: "Network of scenic waterways famous for houseboats, lagoons and traditional Kerala landscapes.",
    location: "Alappuzha, Kerala",
    lat: 9.4981,
    lng: 76.3388,
    categories: ["backwaters", "nature", "boating", "leisure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Fort Kochi",
    description: "Historic coastal neighborhood known for colonial architecture, Chinese fishing nets and cultural heritage.",
    location: "Kochi, Kerala",
    lat: 9.9658,
    lng: 76.2421,
    categories: ["heritage", "culture", "history", "coastal"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Varkala Beach",
    description: "Scenic beach surrounded by dramatic cliffs and popular for relaxation and sunsets.",
    location: "Varkala, Kerala",
    lat: 8.7379,
    lng: 76.7163,
    categories: ["beach", "nature", "leisure", "photography"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // TAMIL NADU
  // =========================================================

  {
    name: "Meenakshi Amman Temple",
    description: "Magnificent historic temple complex famous for towering gopurams and detailed sculptures.",
    location: "Madurai, Tamil Nadu",
    lat: 9.9195,
    lng: 78.1193,
    categories: ["temple", "religious", "heritage", "architecture"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Marina Beach",
    description: "One of India's most famous urban beaches stretching along the Chennai coastline.",
    location: "Chennai, Tamil Nadu",
    lat: 13.0500,
    lng: 80.2824,
    categories: ["beach", "nature", "leisure", "photography"],
    averageVisitDuration: 150,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Ooty",
    description: "Popular hill station known for tea gardens, pleasant weather, lakes and mountain scenery.",
    location: "Ooty, Tamil Nadu",
    lat: 11.4064,
    lng: 76.6932,
    categories: ["hill_station", "nature", "tea", "leisure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Ramanathaswamy Temple",
    description: "Historic Hindu temple in Rameswaram and an important pilgrimage destination.",
    location: "Rameswaram, Tamil Nadu",
    lat: 9.2881,
    lng: 79.3174,
    categories: ["temple", "religious", "pilgrimage", "architecture"],
    averageVisitDuration: 150,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // UTTARAKHAND
  // =========================================================

  {
    name: "Rishikesh",
    description: "Spiritual and adventure destination known for yoga, temples, river rafting and the Ganges.",
    location: "Rishikesh, Uttarakhand",
    lat: 30.0869,
    lng: 78.2676,
    categories: ["spiritual", "adventure", "river", "yoga"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Har Ki Pauri",
    description: "Famous Ganges riverfront ghat and major pilgrimage destination in Haridwar.",
    location: "Haridwar, Uttarakhand",
    lat: 29.9457,
    lng: 78.1642,
    categories: ["religious", "river", "pilgrimage", "culture"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Nainital Lake",
    description: "Beautiful mountain lake surrounded by hills and the popular hill town of Nainital.",
    location: "Nainital, Uttarakhand",
    lat: 29.3919,
    lng: 79.4542,
    categories: ["lake", "hill_station", "nature", "boating"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Mussoorie",
    description: "Popular Himalayan hill station known for mountain views, waterfalls and colonial-era attractions.",
    location: "Mussoorie, Uttarakhand",
    lat: 30.4598,
    lng: 78.0644,
    categories: ["hill_station", "nature", "mountains", "leisure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // HIMACHAL PRADESH
  // =========================================================

  {
    name: "Mall Road Shimla",
    description: "Popular pedestrian shopping and leisure street in the heart of Shimla.",
    location: "Shimla, Himachal Pradesh",
    lat: 31.1048,
    lng: 77.1734,
    categories: ["shopping", "hill_station", "leisure", "culture"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Rohtang Pass",
    description: "High mountain pass near Manali known for spectacular Himalayan landscapes and snow.",
    location: "Manali, Himachal Pradesh",
    lat: 32.3716,
    lng: 77.2496,
    categories: ["mountains", "adventure", "snow", "nature"],
    averageVisitDuration: 300,
    entryFee: 500,
    status: "open"
  },
  {
    name: "Solang Valley",
    description: "Scenic valley near Manali popular for adventure activities and mountain views.",
    location: "Manali, Himachal Pradesh",
    lat: 32.3167,
    lng: 77.1575,
    categories: ["adventure", "mountains", "nature", "sports"],
    averageVisitDuration: 240,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // JAMMU & KASHMIR
  // =========================================================

  {
    name: "Dal Lake",
    description: "Iconic Kashmir lake famous for houseboats, shikaras and spectacular mountain scenery.",
    location: "Srinagar, Jammu and Kashmir",
    lat: 34.0837,
    lng: 74.7973,
    categories: ["lake", "nature", "boating", "photography"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Gulmarg",
    description: "Famous mountain destination known for skiing, meadows, cable cars and Himalayan scenery.",
    location: "Gulmarg, Jammu and Kashmir",
    lat: 34.0484,
    lng: 74.3805,
    categories: ["mountains", "snow", "skiing", "adventure"],
    averageVisitDuration: 360,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // WEST BENGAL
  // =========================================================

  {
    name: "Victoria Memorial",
    description: "Grand marble monument and museum surrounded by gardens in central Kolkata.",
    location: "Kolkata, West Bengal",
    lat: 22.5448,
    lng: 88.3426,
    categories: ["museum", "heritage", "history", "architecture"],
    averageVisitDuration: 150,
    entryFee: 50,
    status: "open"
  },
  {
    name: "Howrah Bridge",
    description: "Iconic cantilever bridge and one of Kolkata's most recognizable landmarks.",
    location: "Kolkata, West Bengal",
    lat: 22.5851,
    lng: 88.3468,
    categories: ["landmark", "architecture", "engineering", "photography"],
    averageVisitDuration: 60,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Darjeeling Himalayan Railway",
    description: "Historic mountain railway famous for scenic journeys through the Himalayan foothills.",
    location: "Darjeeling, West Bengal",
    lat: 27.0410,
    lng: 88.2663,
    categories: ["heritage", "railway", "mountains", "experience"],
    averageVisitDuration: 240,
    entryFee: 1000,
    status: "open"
  },

  // =========================================================
  // ODISHA
  // =========================================================

  {
    name: "Jagannath Temple",
    description: "One of India's most important Hindu temples and the center of the famous Rath Yatra.",
    location: "Puri, Odisha",
    lat: 19.8049,
    lng: 85.8175,
    categories: ["temple", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 150,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Konark Sun Temple",
    description: "UNESCO World Heritage temple famous for its monumental chariot-shaped architecture.",
    location: "Konark, Odisha",
    lat: 19.8876,
    lng: 86.0945,
    categories: ["temple", "heritage", "architecture", "history"],
    averageVisitDuration: 150,
    entryFee: 40,
    status: "open"
  },
  {
    name: "Udayagiri and Khandagiri Caves",
    description: "Ancient rock-cut caves associated with Jain history and early Indian architecture.",
    location: "Bhubaneswar, Odisha",
    lat: 20.2624,
    lng: 85.7867,
    categories: ["caves", "history", "heritage", "jain"],
    averageVisitDuration: 120,
    entryFee: 20,
    status: "open"
  },

  // =========================================================
  // GUJARAT
  // =========================================================

  {
    name: "Statue of Unity",
    description: "World's tallest statue, dedicated to Sardar Vallabhbhai Patel and surrounded by a large tourism complex.",
    location: "Kevadia, Gujarat",
    lat: 21.8380,
    lng: 73.7191,
    categories: ["monument", "history", "engineering", "landmark"],
    averageVisitDuration: 300,
    entryFee: 150,
    status: "open"
  },
  {
    name: "Sabarmati Ashram",
    description: "Historic site associated with Mahatma Gandhi and India's freedom movement.",
    location: "Ahmedabad, Gujarat",
    lat: 23.0607,
    lng: 72.5803,
    categories: ["history", "museum", "heritage", "culture"],
    averageVisitDuration: 120,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // TELANGANA
  // =========================================================

  {
    name: "Charminar",
    description: "Iconic four-minaret monument and historic landmark in the heart of Hyderabad.",
    location: "Hyderabad, Telangana",
    lat: 17.3616,
    lng: 78.4747,
    categories: ["monument", "heritage", "history", "architecture"],
    averageVisitDuration: 120,
    entryFee: 25,
    status: "open"
  },
  {
    name: "Golconda Fort",
    description: "Historic fort complex famous for massive walls, architecture and panoramic views.",
    location: "Hyderabad, Telangana",
    lat: 17.3833,
    lng: 78.4011,
    categories: ["fort", "heritage", "history", "architecture"],
    averageVisitDuration: 180,
    entryFee: 25,
    status: "open"
  },

  // =========================================================
  // PUNJAB
  // =========================================================

  {
    name: "Golden Temple",
    description: "World-renowned Sikh shrine known for its golden architecture, sacred pool and spiritual atmosphere.",
    location: "Amritsar, Punjab",
    lat: 31.6200,
    lng: 74.8765,
    categories: ["religious", "temple", "pilgrimage", "culture"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Jallianwala Bagh",
    description: "Historic memorial commemorating the victims of the 1919 Jallianwala Bagh massacre.",
    location: "Amritsar, Punjab",
    lat: 31.6200,
    lng: 74.8800,
    categories: ["history", "memorial", "heritage", "culture"],
    averageVisitDuration: 90,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // BIHAR
  // =========================================================

  {
    name: "Mahabodhi Temple",
    description: "UNESCO World Heritage Buddhist temple marking the site associated with Buddha's enlightenment.",
    location: "Bodh Gaya, Bihar",
    lat: 24.6961,
    lng: 84.9912,
    categories: ["buddhist", "religious", "heritage", "pilgrimage"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // ANDHRA PRADESH
  // =========================================================

  {
    name: "Tirumala Venkateswara Temple",
    description: "One of India's most visited Hindu temples and an important pilgrimage destination.",
    location: "Tirupati, Andhra Pradesh",
    lat: 13.6833,
    lng: 79.3472,
    categories: ["temple", "religious", "pilgrimage", "culture"],
    averageVisitDuration: 240,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // ASSAM
  // =========================================================

  {
    name: "Kaziranga National Park",
    description: "UNESCO World Heritage wildlife reserve famous for the greater one-horned rhinoceros.",
    location: "Kaziranga, Assam",
    lat: 26.5775,
    lng: 93.1711,
    categories: ["wildlife", "national_park", "safari", "nature"],
    averageVisitDuration: 360,
    entryFee: 500,
    status: "open"
  },

  // =========================================================
  // SIKKIM
  // =========================================================

  {
    name: "Tsomgo Lake",
    description: "High-altitude glacial lake surrounded by mountains and a popular Sikkim tourist attraction.",
    location: "Gangtok, Sikkim",
    lat: 27.3746,
    lng: 88.7650,
    categories: ["lake", "mountains", "nature", "adventure"],
    averageVisitDuration: 180,
    entryFee: 0,
    status: "open"
  },

  // =========================================================
  // MEGHALAYA
  // =========================================================

  {
    name: "Living Root Bridges",
    description: "Unique bridges grown from living tree roots, representing the traditional ecological knowledge of Meghalaya.",
    location: "Cherrapunji, Meghalaya",
    lat: 25.2700,
    lng: 91.7300,
    categories: ["nature", "adventure", "heritage", "trekking"],
    averageVisitDuration: 300,
    entryFee: 50,
    status: "open"
  },

  // =========================================================
  // LADAKH
  // =========================================================

  {
    name: "Pangong Lake",
    description: "High-altitude Himalayan lake famous for its dramatic blue waters and surrounding mountains.",
    location: "Ladakh",
    lat: 33.7595,
    lng: 78.6670,
    categories: ["lake", "mountains", "nature", "photography"],
    averageVisitDuration: 240,
    entryFee: 0,
    status: "open"
  },
  {
    name: "Leh Palace",
    description: "Historic nine-storey palace offering panoramic views over Leh and the surrounding mountains.",
    location: "Leh, Ladakh",
    lat: 34.1654,
    lng: 77.5847,
    categories: ["palace", "heritage", "history", "mountains"],
    averageVisitDuration: 120,
    entryFee: 25,
    status: "open"
  }
];

      const created = [];
      for (const item of attractions) {
        created.push(await tourismService.createAttraction(item));
      }

      res.status(201).json({ 
        success: true, 
        message: 'Database seeded successfully with Raipur attractions.', 
        data: created 
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TourismController();