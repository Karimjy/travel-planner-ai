from pydantic import BaseModel, Field

class Activity(BaseModel):
    title: str = Field(None, description="The title of the activity")
    description: str = Field(None, description="A brief description of the activity")
    link: str = Field(None, description="A link to more information about the activity")
    start_time: str = Field(None, description="The start time of the activity")
    end_time: str = Field(None, description="The end time of the activity")
    location: dict = Field(None, description="A dictionary containing the latitude and longitude of the activity location")

class Day(BaseModel):
    day: int = Field(None, description="The day number")
    activities: list[Activity] = Field(None, description="A list of activities for the day")

class Itinerary(BaseModel):
    """Itinerary of a trip."""
    
    city: str = Field(None, description="The city name")
    country: str = Field(None, description="The country name")
    location: dict = Field(None, description="A dictionary containing the latitude and longitude of the city location")
    days: list[Day] = Field(None, description="A list of days in the itinerary")