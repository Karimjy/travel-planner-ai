import {
    PrismaClient
} from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const itinerary = await prisma.itinerary.create({
        data: {
            city: 'Paris',
            country: 'France',
            latitude: 48.8566,
            longitude: 2.3522,
            image: 'https://example.com/paris.jpg',
            days: {
                create: [{
                        day: 1,
                        activities: {
                            create: [{
                                    title: 'Visit Eiffel Tower',
                                    description: 'Enjoy the view from the top of the Eiffel Tower',
                                    link: 'https://www.toureiffel.paris/en',
                                    startTime: '09:00',
                                    endTime: '11:00',
                                    latitude: 48.8584,
                                    longitude: 2.2945
                                },
                                {
                                    title: 'Louvre Museum',
                                    description: 'Explore world-famous artworks including the Mona Lisa',
                                    link: 'https://www.louvre.fr/en',
                                    startTime: '13:00',
                                    endTime: '17:00',
                                    latitude: 48.8606,
                                    longitude: 2.3376
                                }
                            ]
                        }
                    },
                    {
                        day: 2,
                        activities: {
                            create: [{
                                    title: 'Notre-Dame Cathedral',
                                    description: 'Visit the famous medieval Catholic cathedral',
                                    link: 'https://www.notredamedeparis.fr/en/',
                                    startTime: '10:00',
                                    endTime: '12:00',
                                    latitude: 48.8530,
                                    longitude: 2.3499
                                },
                                {
                                    title: 'Seine River Cruise',
                                    description: 'Enjoy a scenic boat tour along the Seine River',
                                    link: 'https://www.bateauxparisiens.com/en/',
                                    startTime: '14:00',
                                    endTime: '16:00',
                                    latitude: 48.8589,
                                    longitude: 2.3469
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })

    console.log('Seed data created successfully')
    console.log(JSON.stringify(itinerary, null, 2))
}

try {
    await seed();
    await prisma.$disconnect();
} catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}