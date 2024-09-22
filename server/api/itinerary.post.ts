import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.city || !body.country) {
    event.node.res.statusCode = 400
    return { error: 'City and date are required' }
  }

  try {
    // Call the external API
    const externalApiResponse = await axios.get('http://127.0.0.1:8000/itinerary/', {
      params: {
        country: body.country,
        city: body.city,
        num_days: body.num_days,
      }
    })

    // Process the external API response
    const apiData = externalApiResponse.data

    const ImageResponse = await axios.get('http://127.0.0.1:8000/generate_image/', {
      params: {
        country: body.country,
        city: body.city,
      }
    })

    // Create the itinerary in the database
    const itinerary = await prisma.itinerary.create({
      data: {
        city: apiData.output.city,
        country: apiData.output.country,
        latitude: apiData.output.location.latitude,
        longitude: apiData.output.location.longitude,
        image: ImageResponse.data,
        days: {
          create: apiData.output.days.map((day) => ({
            day: day.day,
            activities: {
              create: day.activities.map((activity) => ({
                title: activity.title,
                description: activity.description,
                link: activity.link,
                startTime: activity.start_time,
                endTime: activity.end_time,
                latitude: activity.location.latitude,
                longitude: activity.location.longitude
              }))
            }
          }))
        }
      },
      include: {
        days: {
          include: {
            activities: true
          }
        }
      }
    })

    return {
      itinerary
    }

  } catch (error) {
    console.error('Error creating itinerary:', error)
    event.node.res.statusCode = 500
    return { error: 'Internal Server Error' }
  } finally {
    await prisma.$disconnect()
  }
})
