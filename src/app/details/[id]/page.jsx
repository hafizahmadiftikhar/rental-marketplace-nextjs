import PropertyDetails from "./PropertyDetails";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;  // ✅ Await params first
    await connectDB();
    const property = await Property.findById(id).lean();

    if (!property) {
      return {
        title: "Property Not Found - RevoRent",
      };
    }

    const price = property.rentMin
      ? property.rentMin === property.rentMax
        ? `$${property.rentMin}`
        : `$${property.rentMin} - $${property.rentMax}`
      : "Contact for Rent";

    return {
      title: `${property.propertyName} | ${price} - RevoRent`,
      description:
        property.description?.substring(0, 160) ||
        "Discover amazing properties for rent",
      openGraph: {
        title: `${property.propertyName} | ${price}`,
        description: `${property.location?.fullAddress || ""} • ${property.beds || "N/A"} Beds • ${property.baths || "N/A"} Baths`,
        images: [
          {
            url: property.photos?.[0] || "/default-property.jpg",
            width: 1200,
            height: 630,
            alt: property.propertyName,
          },
        ],
        type: "website",
        siteName: "RevoRent",
      },
      twitter: {
        card: "summary_large_image",
        title: `${property.propertyName} | ${price}`,
        description: property.location?.fullAddress || "View property details",
        images: [property.photos?.[0] || "/default-property.jpg"],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: "Property - RevoRent",
    };
  }
}

export default function Page() {
  return <PropertyDetails />;
}