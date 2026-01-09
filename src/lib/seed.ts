import { storage } from "./storage";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  try {
    // Check if assets already exist
    const existingAssets = await storage.getAssets();
    if (existingAssets.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Seeding database...");

    // Create demo users
    console.log("Creating demo users...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    await storage.createUserWithPassword(
      "admin@mantlemuse.com",
      adminPassword,
      "Admin User",
      "admin",
    );

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 10);
    await storage.createUserWithPassword(
      "user@mantlemuse.com",
      userPassword,
      "Demo User",
      "user",
    );

    console.log("✅ Demo users created");
    console.log("Seeding assets...");

    // 20 Base Assets - Mix of Art and Music
    const baseAssets = [
      // Art Assets (10)
      {
        name: "Basquiat: Warrior (1982)",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000",
        description:
          "A seminal work from Jean-Michel Basquiat's most coveted year. 'Warrior' represents a powerful symbol of overcoming oppression and features his signature neo-expressionist style.",
        returnType: "growth",
        riskLevel: "medium",
        minInvestment: "500",
        targetReturn: "12-18%",
        payoutFrequency: "exit-based",
        totalValue: "12000000",
        pricePerShare: "100",
        availableShares: 50000,
        story:
          "Acquired from a private collection in Geneva. Authenticated by the Basquiat estate with full provenance documentation.",
        isFeatured: true,
      },
      {
        name: "Warhol: Marilyn Monroe (Pink)",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1578321272128-181b5d1e263a?auto=format&fit=crop&q=80&w=1000",
        description:
          "Iconic screen print of Marilyn Monroe from Andy Warhol's most celebrated series. One of the most recognizable images in 20th-century art.",
        returnType: "growth",
        riskLevel: "low",
        minInvestment: "1000",
        targetReturn: "8-12%",
        payoutFrequency: "exit-based",
        totalValue: "4500000",
        pricePerShare: "250",
        availableShares: 10000,
        story:
          "Excellent provenance. Previous ownership includes prominent NY gallery. Recent appraisal increased valuation by 15%.",
        isFeatured: true,
      },
      {
        name: "Picasso: Blue Period Sketch",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1547891303-47206199a071?auto=format&fit=crop&q=80&w=1000",
        description:
          "Rare sketch from Pablo Picasso's Blue Period (1901-1904). Features characteristic melancholic themes and monochromatic palette.",
        returnType: "growth",
        riskLevel: "low",
        minInvestment: "800",
        targetReturn: "10-15%",
        payoutFrequency: "exit-based",
        totalValue: "3200000",
        pricePerShare: "160",
        availableShares: 12000,
        story:
          "Recently discovered in a private European collection. Authenticated by Picasso estate experts.",
      },
      {
        name: "Banksy: Love is in the Air",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000",
        description:
          "Banksy's iconic stencil work featuring a masked protestor throwing flowers instead of a molotov cocktail. Powerful commentary on peace and protest.",
        returnType: "growth",
        riskLevel: "medium",
        minInvestment: "400",
        targetReturn: "15-22%",
        payoutFrequency: "exit-based",
        totalValue: "2800000",
        pricePerShare: "80",
        availableShares: 18000,
        story:
          "Original street installation documented and authenticated. Banksy's work continues to appreciate rapidly.",
      },
      {
        name: "Yayoi Kusama: Pumpkin Series",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1000",
        description:
          "Vibrant polka-dotted pumpkin sculpture from Japan's most celebrated contemporary artist. Part of her iconic infinity series.",
        returnType: "growth",
        riskLevel: "medium",
        minInvestment: "600",
        targetReturn: "10-16%",
        payoutFrequency: "exit-based",
        totalValue: "1800000",
        pricePerShare: "120",
        availableShares: 8500,
        story:
          "Direct from Kusama's Tokyo studio. Exhibited at major museums worldwide. Strong collector demand.",
      },
      {
        name: "Rothko: Orange and Yellow",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80&w=1000",
        description:
          "Mark Rothko's luminous color field painting. Large-scale canvas featuring his signature rectangular blocks of warm hues.",
        returnType: "growth",
        riskLevel: "low",
        minInvestment: "1500",
        targetReturn: "9-13%",
        payoutFrequency: "exit-based",
        totalValue: "8500000",
        pricePerShare: "300",
        availableShares: 15000,
        story:
          "Museum-quality piece with impeccable conservation. Featured in multiple retrospectives.",
        isFeatured: true,
      },
      {
        name: "Hockney: A Bigger Splash",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=1000",
        description:
          "David Hockney's iconic California pool painting. Brilliant blues and geometric composition capture 1960s LA lifestyle.",
        returnType: "growth",
        riskLevel: "low",
        minInvestment: "900",
        targetReturn: "8-14%",
        payoutFrequency: "exit-based",
        totalValue: "5500000",
        pricePerShare: "180",
        availableShares: 16000,
        story:
          "One of the most recognizable works from the Pop Art movement. Recently exhibited at Tate Modern.",
      },
      {
        name: "Koons: Balloon Dog (Orange)",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1561214128-a9b678c0f1fc?auto=format&fit=crop&q=80&w=1000",
        description:
          "Jeff Koons' mirror-polished stainless steel sculpture. Monumental piece from the celebrated Celebration series.",
        returnType: "growth",
        riskLevel: "medium",
        minInvestment: "1200",
        targetReturn: "11-17%",
        payoutFrequency: "exit-based",
        totalValue: "6200000",
        pricePerShare: "220",
        availableShares: 14000,
        story:
          "Limited edition of 5. Previous sale set auction record for living artist. Strong institutional interest.",
      },
      {
        name: "Richter: Abstract Painting 829-3",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=1000",
        description:
          "Gerhard Richter's masterful abstract work created with his signature squeegee technique. Layers of vibrant color and texture.",
        returnType: "growth",
        riskLevel: "low",
        minInvestment: "1100",
        targetReturn: "9-15%",
        payoutFrequency: "exit-based",
        totalValue: "7800000",
        pricePerShare: "260",
        availableShares: 13000,
        story:
          "From Richter's peak abstract period. Museum acquisition interest documented.",
      },
      {
        name: "Pollock: Number 17A",
        type: "art",
        imageUrl:
          "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1000",
        description:
          "Jackson Pollock's explosive drip painting. Represents the pinnacle of Abstract Expressionism with dynamic energy and movement.",
        returnType: "growth",
        riskLevel: "medium",
        minInvestment: "2000",
        targetReturn: "10-16%",
        payoutFrequency: "exit-based",
        totalValue: "15000000",
        pricePerShare: "400",
        availableShares: 20000,
        story:
          "Authenticated by Pollock-Krasner Foundation. Exhibited at MoMA. Blue-chip investment opportunity.",
        isFeatured: true,
      },

      // Music Royalties (10)
      {
        name: "Summer Haze Catalog",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
        description:
          "Collection of 3 platinum-certified pop hits from 2018-2020. Consistent streaming revenue from global markets across all platforms.",
        returnType: "income",
        riskLevel: "low",
        minInvestment: "100",
        targetReturn: "7-9%",
        payoutFrequency: "quarterly",
        totalValue: "850000",
        pricePerShare: "50",
        availableShares: 8500,
        royaltySource: "Spotify, Apple Music, BMI",
        story:
          "Rights holder liquidating portion of catalog for capital injection. Steady 4-year performance history.",
        isFeatured: true,
      },
      {
        name: "Future Bass Anthology",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=1000",
        description:
          "High-energy electronic catalog with strong sync licensing history in sports and gaming. 12 tracks with consistent placements.",
        returnType: "income",
        riskLevel: "medium",
        minInvestment: "250",
        targetReturn: "9-14%",
        payoutFrequency: "monthly",
        totalValue: "320000",
        pricePerShare: "25",
        availableShares: 6400,
        royaltySource: "Sync Licensing (ESPN, EA Sports), Streaming",
        story:
          "Niche but high-yield catalog with consistent Q4 performance. Gaming industry growth driver.",
      },
      {
        name: "Classic Rock Anthems Vol. 1",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1000",
        description:
          "Timeless rock classics from the 1970s. 8 evergreen tracks with multi-generational appeal and consistent radio play.",
        returnType: "income",
        riskLevel: "low",
        minInvestment: "500",
        targetReturn: "6-8%",
        payoutFrequency: "quarterly",
        totalValue: "1200000",
        pricePerShare: "75",
        availableShares: 10000,
        royaltySource: "Radio, Streaming, ASCAP",
        story:
          "Catalog has generated steady returns for 40+ years. Recent resurgence in streaming among younger audiences.",
        isFeatured: true,
      },
      {
        name: "Lo-Fi Hip Hop Beats 2024",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1000",
        description:
          "Curated collection of chill beats featured on major study and relaxation playlists. Massive streaming numbers.",
        returnType: "income",
        riskLevel: "low",
        minInvestment: "150",
        targetReturn: "8-11%",
        payoutFrequency: "monthly",
        totalValue: "420000",
        pricePerShare: "35",
        availableShares: 7500,
        royaltySource: "Spotify, YouTube, Apple Music",
        story:
          "Genre experiencing explosive growth. Featured on Spotify's top playlists with 50M+ followers combined.",
      },
      {
        name: "Reggaeton Global Hits",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1000",
        description:
          "5 chart-topping reggaeton tracks with international appeal. Strong performance in Latin America, US, and European markets.",
        returnType: "income",
        riskLevel: "medium",
        minInvestment: "300",
        targetReturn: "10-15%",
        payoutFrequency: "quarterly",
        totalValue: "980000",
        pricePerShare: "65",
        availableShares: 9200,
        royaltySource: "Global Streaming, ASCAP, SACM",
        story:
          "Reggaeton continues global expansion. Catalog includes collaboration with major Latin artists.",
      },
      {
        name: "Synthwave Sunset Catalog",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80&w=1000",
        description:
          "Retro-futuristic electronic music with strong sync licensing in film and TV. 15 tracks evoking 1980s nostalgia.",
        returnType: "income",
        riskLevel: "medium",
        minInvestment: "200",
        targetReturn: "9-13%",
        payoutFrequency: "monthly",
        totalValue: "380000",
        pricePerShare: "40",
        availableShares: 6000,
        royaltySource: "Sync (Netflix, HBO), Streaming",
        story:
          "Genre popularity boosted by Stranger Things and Drive. Active placement in streaming content.",
      },
      {
        name: "Neo-Soul Sessions",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1000",
        description:
          "Smooth contemporary R&B and soul catalog. 10 tracks with strong streaming growth and playlist placements.",
        returnType: "income",
        riskLevel: "low",
        minInvestment: "180",
        targetReturn: "7-10%",
        payoutFrequency: "quarterly",
        totalValue: "540000",
        pricePerShare: "45",
        availableShares: 7200,
        royaltySource: "Spotify, Apple Music, BMI",
        story:
          "Growing genre with dedicated fanbase. Strong editorial playlist support driving discovery.",
      },
      {
        name: "Techno Underground Berlin",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80&w=1000",
        description:
          "Hard-hitting techno tracks from Berlin's legendary club scene. Strong European festival and DJ usage rights.",
        returnType: "income",
        riskLevel: "medium",
        minInvestment: "220",
        targetReturn: "8-12%",
        payoutFrequency: "monthly",
        totalValue: "450000",
        pricePerShare: "30",
        availableShares: 8500,
        royaltySource: "DJ Licensing, Streaming, Performance Rights",
        story:
          "Berlin techno exports globally. Tracks featured at major festivals including Berghain residents.",
      },
      {
        name: "Acoustic Folk Gems",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=1000",
        description:
          "Heartfelt acoustic singer-songwriter catalog. 12 tracks with strong sync history in commercials and indie films.",
        returnType: "income",
        riskLevel: "low",
        minInvestment: "160",
        targetReturn: "6-9%",
        payoutFrequency: "quarterly",
        totalValue: "390000",
        pricePerShare: "32",
        availableShares: 7000,
        royaltySource: "Sync Licensing, Streaming, ASCAP",
        story:
          "Authentic storytelling resonates across demographics. Recent Apple commercial placement boosted streams 300%.",
      },
      {
        name: "Epic Cinematic Scores",
        type: "music",
        imageUrl:
          "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=1000",
        description:
          "Orchestral composition library for film, TV, and trailers. 20+ tracks with active licensing to major studios.",
        returnType: "income",
        riskLevel: "low",
        minInvestment: "400",
        targetReturn: "8-12%",
        payoutFrequency: "quarterly",
        totalValue: "720000",
        pricePerShare: "60",
        availableShares: 9000,
        royaltySource: "Film/TV Sync, Trailer Licensing, BMI",
        story:
          "High-value sync market. Recent placements in major blockbuster trailers. Strong Hollywood relationships.",
        isFeatured: true,
      },
    ];

    // Insert all assets
    for (const asset of baseAssets) {
      await storage.createAsset(asset);
    }

    console.log(`✅ Successfully seeded ${baseAssets.length} assets`);
    console.log("\n🎉 Database seeding complete!");
    console.log("\nDemo Credentials:");
    console.log("Admin: admin@mantlemuse.com / admin123");
    console.log("User: user@mantlemuse.com / user123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}
