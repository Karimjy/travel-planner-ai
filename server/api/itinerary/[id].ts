import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    event.node.res.statusCode = 400;
    return { error: "Itinerary ID is required" };
  }

  try {
    const itinerary = await prisma.itinerary.findUnique({
      where: { id: parseInt(id) },
      include: {
        days: {
          include: {
            activities: true,
          },
        },
      },
    });

    if (!itinerary) {
      event.node.res.statusCode = 404;
      return { error: "Itinerary not found" };
    }

    return itinerary;
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    event.node.res.statusCode = 500;
    return { error: "Internal Server Error" };
  } finally {
    await prisma.$disconnect();
  }
});
