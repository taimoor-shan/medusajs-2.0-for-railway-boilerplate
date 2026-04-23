import csv
import json

products = [
    {
        "handle": "emerald-bonsai-zen",
        "title": "Emerald Bonsai",
        "subtitle": "Handmade Masterpiece / Zen Bonsai",
        "description": "Discover a truly exceptional handmade artificial bonsai tree, designed to bring timeless elegance and natural harmony into any interior. Each tree is individually handcrafted, making every piece a unique one-of-one creation. With a real wood trunk, high-quality artificial leaves for a beautifully natural appearance, and a golden brushed stainless steel 304 flower pot, this bonsai combines authentic materials with lasting sophistication.\n\nThe result is a refined designer piece that feels both organic and luxurious — ideal for hotels, villas, living rooms, reception areas, lounges, and exclusive interior spaces.",
        "length": "125",
        "width": "125",
        "height": "220",
        "variants": [
            {"color": "Gold", "price": "4350"}
        ],
        "pot_meta": {"width": 47, "depth": 47, "height": 82.5, "unit": "cm", "material": "Stainless steel 304", "finish": "Brushed Gold", "care": "To keep the pot shiny, place only indoors. Not recommended for wet areas."},
        "features_meta": ["Handmade artificial tree.", "Every bonsai tree is unique and one of a kind (1/1).", "Real wood trunk for authentic texture and natural character.", "Highest quality artificial leaves for a realistic and elegant look.", "Brushed stainless steel 304 flower pot.", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium bonsai tree is in a size range of 200 cm to 240 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting and natural growth of the trunk.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial tree all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens. Perfect for sensitive places and especially well suited for hotels, hospitality spaces and designer homes or offices who want a beautiful green atmosphere all year long without the responsibilities of a living plant. The tree is designed for indoor use. While it is generally resistant to sun and moisture, permanent outdoor exposure is not recommended, as long-term hot and cold conditions may affect the materials over time."
    },
    {
        "handle": "verdant-harmony-ficus-bonsai",
        "title": "Verdant Harmony Tree",
        "subtitle": "Ficus Bonsai Handmade Masterpiece",
        "description": "Elevate your interior with this striking artificial Ficus bonsai tree, crafted to bring lush greenery and organic elegance into modern living spaces. Its beautifully twisted natural wood trunk and full canopy of vibrant green leaves create a serene, lifelike presence that feels both timeless and contemporary.\n\nThe elegant white or black planter provides a clean, minimalist base, enhancing the tree's sculptural form. This premium piece is perfect for living rooms, offices, lounges, restaurants, hotels and upscale hospitality environments, adding effortless nature to any design.",
        "length": "120",
        "width": "120",
        "height": "220",
        "variants": [
            {"color": "White", "price": "3450"},
            {"color": "Black", "price": "3450"}
        ],
        "pot_meta": {"width": 40, "depth": 40, "height": 80, "unit": "cm", "material": "High-quality luxury glossy acrylic", "finish": "Glossy", "care": "To keep the pot shiny it should be placed only inside and it is not recommended to place in wet areas."},
        "features_meta": ["Handmade artificial tree.", "Every Ficus Bonsai tree is unique and one of a kind (1/1).", "Real wood trunk for authentic texture and natural character.", "Highest quality artificial leaves for a realistic and elegant look.", "Black or white glossy luxury pot", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium Ficus Bonsai Tree is in a size range of 200 cm to 240 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting and natural growth of the trunk.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial tree all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens. Perfect for sensitive places and especially well suited for hotels, hospitality spaces and designer homes or offices who want a beautiful green atmosphere all year long without the responsibilities of a living plant."
    },
    {
        "handle": "red-zen-maple-majesty",
        "title": "Red Zen Maple Majesty",
        "subtitle": "Red Velvet - Handmade Masterpiece",
        "description": "Make a bold statement with this extraordinary artificial handmade maple tree, designed to bring sculptural elegance and modern luxury into any interior. Featuring a beautifully twisted natural wood trunk and vibrant red artificial foliage, it captures the drama of a living centerpiece without requiring any maintenance.\n\nEach tree is individually handcrafted, making every piece a unique one-of-one creation. With a real wood trunk, high-quality artificial leaves for a beautifully natural appearance, and a golden brushed stainless steel 304 flower pot, this bonsai combines authentic materials with lasting sophistication.\n\nThe result is a refined designer piece that feels both organic and luxurious — ideal for hotels, villas, living rooms, reception areas, lounges, and exclusive interior spaces.",
        "length": "125",
        "width": "125",
        "height": "220",
        "variants": [
            {"color": "Gold", "price": "3450"}
        ],
        "pot_meta": {"width": 47, "depth": 47, "height": 82.5, "unit": "cm", "material": "Stainless steel 304", "finish": "Brushed Gold", "care": "To keep the pot shiny, place only indoors. Not recommended for wet areas."},
        "features_meta": ["Handmade artificial tree.", "Every maple tree is unique and one of a kind (1/1).", "Real wood trunk for authentic texture and natural character.", "Highest quality artificial leaves for a realistic and elegant look.", "Brushed stainless steel 304 flower pot.", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium maple tree is in a size range of 200 cm to 240 cm height. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting and natural growth of the trunk.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial tree all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens. Perfect for sensitive places and especially well suited for hotels, hospitality spaces and designer homes or offices who want a beautiful red atmosphere all year long without the responsibilities of a living plant."
    },
    {
        "handle": "dual-pink-sakura-tree",
        "title": "Dual Pink Sakura Tree",
        "subtitle": "Cherry Blossom Handmade unique",
        "description": "Bring a soft, romantic touch to your space with this elegant artificial cherry blossom tree pink, designed to capture the delicate beauty of spring all year round. Its full pink blossom canopy and natural wood trunk create a graceful, lifelike look that adds warmth and sophistication to any interior.\n\nThe glossy black or white planter gives the piece a modern, luxurious finish, while the sculptural shape of the tree makes it a true statement element for living rooms, bedrooms, lounges, boutiques, and refined hospitality spaces. It delivers lasting beauty without any maintenance, making it ideal for stylish interiors that deserve a calm and polished atmosphere.",
        "length": "120",
        "width": "120",
        "height": "220",
        "variants": [
            {"color": "White", "price": "2450"},
            {"color": "Black", "price": "2450"}
        ],
        "pot_meta": {"width": 66, "depth": 66, "height": 55, "unit": "cm", "material": "High-quality luxury glossy acrylic", "finish": "Glossy", "care": "To keep the pot shiny it should be placed only inside and it is not recommended to place in wet areas."},
        "features_meta": ["Handmade artificial tree.", "Every Cherry Blossom tree pink is unique and one of a kind (1/1).", "Real wood trunk for authentic texture and natural character.", "Highest quality artificial leaves for a realistic and elegant look.", "Black or white glossy luxury pot", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium Cherry Blossom tree pink is in a size range of 200 cm to 240 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting and natural growth of the trunk.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial tree all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."
    },
    {
        "handle": "white-bloom-majesty",
        "title": "White Bloom Majesty",
        "subtitle": "Snow Blossom Cherry - Handmade unique",
        "description": "Bring timeless elegance into your interior with this stunning artificial flowering tree, designed to create a refined and natural atmosphere in any luxury space. With its detailed natural wood trunk and full canopy of soft white blossoms, it delivers the beauty of a blooming tree without any seasonal limits or maintenance.\n\nThe sleek black or white planter adds a modern contrast, making this piece feel both contemporary and sophisticated. Its tall silhouette and airy floral crown make it an ideal decorative feature for entrance areas, living spaces, hotels, boutiques, and high-end commercial interiors.",
        "length": "120",
        "width": "120",
        "height": "220",
        "variants": [
            {"color": "White", "price": "2450"},
            {"color": "Black", "price": "2450"}
        ],
        "pot_meta": {"width": 40, "depth": 40, "height": 80, "unit": "cm", "material": "High-quality luxury glossy acrylic", "finish": "Glossy", "care": "To keep the pot shiny it should be placed only inside and it is not recommended to place in wet areas."},
        "features_meta": ["Handmade artificial tree.", "Every tree is unique and one of a kind (1/1).", "Real wood trunk for authentic texture and natural character.", "Highest quality artificial leaves for a realistic and elegant look.", "Black or white glossy luxury pot", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium Cherry Blossom tree white is in a size range of 200 cm to 240 cm height. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting and natural growth of the trunk.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial tree all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."
    },
    {
        "handle": "orchid-cascade-grande",
        "title": "Orchid Cascade Grande",
        "subtitle": "Handmade - Orchid Grande Majestic orange",
        "description": "Infuse your space with vibrant luxury using this breathtaking artificial orchid arrangement, designed to command attention with its bold color and elegant form. Cascading clusters of vivid orchids create a tropical paradise vibe, perfect for elevating high-rise interiors or sophisticated settings.\n\nThe tall black planter offers a high luxury contrast and modern polish, making this piece a true showstopper. Ideal for penthouse living rooms, luxury hotels, upscale offices, luxury boutiques, designer homes or elegant restaurants.",
        "length": "90",
        "width": "90",
        "height": "195",
        "variants": [
            {"color": "Black", "price": "1950"}
        ],
        "pot_meta": {"width": 72, "depth": 72, "height": 127, "unit": "cm", "material": "High-quality oversized luxury glossy acrylic", "finish": "Glossy Black", "care": "To keep the pot shiny it should be placed only inside and it is not recommended to place in wet areas."},
        "features_meta": ["Handmade artificial flower plant.", "Different colors", "Authentic texture and natural character.", "Highest quality artificial leaves and flowers for a realistic and natural look.", "Shiny black acrylic flower pot.", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium Orchid Cascade Grande is in a size range of 190 cm to 200 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial plant all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."
    },
    {
        "handle": "paradise-leaf-giant",
        "title": "Paradise Leaf Giant",
        "subtitle": "Handmade - Tropical Strelitzia Majesty",
        "description": "Transform your office or living space with this vibrant artificial bird of paradise tree, blending tropical allure with sophisticated design. Its large, lush green leaves and striking red ginger flowers create a bold, exotic statement, paired with a natural authentic texture.\n\nThe glossy black planter adds a sleek, contemporary edge, making it the ultimate centerpiece for modern interiors. Perfect for executive offices, luxury apartments, hotel lobbies, restaurants, and high-end commercial settings with stunning city views.",
        "length": "110",
        "width": "110",
        "height": "235",
        "variants": [
            {"color": "Black", "price": "1950"}
        ],
        "pot_meta": {"width": 80, "depth": 80, "height": 60, "unit": "cm", "material": "High-quality XL luxury glossy acrylic", "finish": "Glossy Black", "care": "To keep the pot shiny it should be placed only inside and it is not recommended to place in wet areas."},
        "features_meta": ["Handmade artificial plant.", "Authentic texture and natural character.", "Highest quality artificial leaves for a realistic and elegant look.", "Shiny black acrylic flower pot.", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium Tropical Strelitzia is in a size range of 220 cm to 250 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial plant all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."
    },
    {
        "handle": "flora-prestige-rose-royale",
        "title": "Flora Prestige - Rose Royale",
        "subtitle": "Handmade",
        "description": "Introduce a touch of romantic elegance with this luxurious artificial flower arrangement, featuring a stunning mix of roses, hydrangeas, orchids and delicate flowers for a full, opulent bouquet. The soft tones and lush blooms create a dreamy, feminine vibe that's both timeless and refined.\n\nThe tall white planter adds a clean, architectural base, making it a perfect focal point for contemporary interiors. Ideal for living rooms, bedrooms, events, weddings, entrances, boutiques, salons, and high-end hospitality spaces.",
        "length": "75",
        "width": "75",
        "height": "120",
        "variants": [
            {"color": "White", "price": "950"},
            {"color": "Golden White", "price": "1050"}
        ],
        "pot_meta": {"width": 40, "depth": 40, "height": 80, "unit": "cm", "material": "High-quality luxury glossy acrylic", "finish": "Glossy", "care": "To keep the pot shiny it should be placed only inside and it is not recommended to place in wet areas."},
        "features_meta": ["Handmade artificial plant.", "Different colors", "Authentic texture and natural character.", "Highest quality artificial leaves and flowers for a realistic and elegant look.", "Luxury glossy white or golden white pot", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts, it will need to be assembled by the customer following the included installation instructions.",
        "unique_meta": "This premium Rose Royale is in a size range of 70 cm to 80 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial plant all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."
    },
    {
        "handle": "zen-magnolia-bloom",
        "title": "Zen Magnolia Bloom",
        "subtitle": "Pink Magnolia Art (Grace) (Handmade - Table flower)",
        "description": "Add a burst of exotic romance with this exquisite artificial magnolia branch arrangement, showcasing vibrant pink magnolia buds, fresh green leaves, and a striking monstera leaf for beautiful texture. The natural wood branch adds an organic, sculptural element, evoking springtime luxury in a compact design.\n\nPresented in a clear glass vase, it offers a fresh, water-like illusion that enhances its lifelike appeal. Perfect for tabletops, consoles, dining areas, bathrooms, boutiques and premium interior styling.",
        "length": "60",
        "width": "60",
        "height": "60",
        "variants": [
            {"color": "Glass", "price": "430"}
        ],
        "pot_meta": {"width": 30, "depth": 30, "height": 30, "unit": "cm", "material": "Premium Glass", "finish": "Clear", "care": "Its smooth finish and sturdy construction make it a stylish addition to any indoor space, adding a touch of sophistication to your decor."},
        "features_meta": ["Handmade artificial plant", "Real wood for authentic texture and natural character.", "Highest quality artificial leaves and flowers for a realistic and elegant look.", "Elegant glass flower pot.", "Maintenance-free: no watering - no sun - no care and Hypoallergenic"],
        "pkg_meta": "The product is delivered in special protective packaging. If the item is supplied in multiple parts.",
        "unique_meta": "This premium Zen Magnolia Bloom is in a size range of 50 cm to 70 cm. Pictures above shows a sample, every product is unique handmade and can slightly be different through handcrafting.",
        "care_meta": "Maintenance-free elegance: Enjoy the beauty of this artificial plant all year round, without any ongoing care or seasonal changes - no watering - no sun - no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."
    }
]

headers = [
    "Product Id", "Product Handle", "Product Title", "Product Subtitle", "Product Description", 
    "Product Status", "Product Thumbnail", "Product Weight", "Product Length", "Product Width", 
    "Product Height", "Product HS Code", "Product Origin Country", "Product MID Code", "Product Material", 
    "Shipping Profile Id", "Product Sales Channel 1", "Product Collection Id", "Product Type Id", 
    "Product Tag 1", "Product Discountable", "Product External Id", "Variant Id", "Variant Title", 
    "Variant SKU", "Variant Barcode", "Variant Allow Backorder", "Variant Manage Inventory", 
    "Variant Weight", "Variant Length", "Variant Width", "Variant Height", "Variant HS Code", 
    "Variant Origin Country", "Variant MID Code", "Variant Material", "Variant Price EUR", 
    "Variant Price USD", "Variant Option 1 Name", "Variant Option 1 Value", "Product Image 1 Url", 
    "Product Image 2 Url", "Product Metadata"
]

rows = []
for p in products:
    for i, v in enumerate(p['variants']):
        row = {h: "" for h in headers}
        
        row["Product Handle"] = p["handle"]
        row["Product Title"] = p["title"]
        row["Product Subtitle"] = p["subtitle"]
        row["Product Description"] = p["description"]
        row["Product Status"] = "published"
        row["Product Length"] = p["length"]
        row["Product Width"] = p["width"]
        row["Product Height"] = p["height"]
        # Left empty: Product Sales Channel 1, Product Tag 1
        row["Product Discountable"] = "FALSE"
        
        # Merge all custom data into a single Product Metadata column as a JSON string
        meta_dict = {
            "pot": json.dumps(p["pot_meta"]),
            "key_features": json.dumps(p["features_meta"]),
            "packaging_info": p["pkg_meta"],
            "uniqueness_note": p["unique_meta"],
            "care_instructions": p["care_meta"]
        }
        row["Product Metadata"] = json.dumps(meta_dict)
        
        row["Variant Title"] = v["color"]
        row["Variant Allow Backorder"] = "FALSE"
        row["Variant Manage Inventory"] = "TRUE"
        row["Variant Price EUR"] = v["price"]
        
        if "Magnolia" in p["title"]:
            row["Variant Option 1 Name"] = "Pot Type"
        else:
            row["Variant Option 1 Name"] = "Pot Color"
            
        row["Variant Option 1 Value"] = v["color"]
        
        rows.append(row)

with open("/Users/macbookpro/Documents/Work/practice/medusa-towels/medus-amono/medusa-products.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

print("CSV generated successfully!")
