import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const itineraries = await prisma.itinerary.findMany({
      include: {
        days: true,
      },
    });

    const itinerariesWithTotalDays = itineraries.map((itinerary) => ({
      ...itinerary,
    }));

    return {
      itineraries: itinerariesWithTotalDays,
    };
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    event.node.res.statusCode = 500;
    return { error: "Internal Server Error" };
  } finally {
    await prisma.$disconnect();
  }
});
