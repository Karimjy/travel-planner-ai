PROMPT_ITINERARY = """
Create a {num_days}-day itinerary for a city break in {city}, {country}.

Assumptions:
- The city break starts at 9:00 AM each day
- Each day includes:
1. 1 breakfast meal
2. 1 midday meal (around lunchtime)
3. 1 evening meal (around dinner time)
- The itinerary should include a mix of popular attractions, cultural experiences, and free time for relaxation

Requirements:
- Plan a {num_days}-day itinerary for a city break, including:
1. Morning activities (9:00 AM - 12:00 PM)
2. Midday meal (12:00 PM - 1:30 PM)
3. Afternoon activities (1:30 PM - 5:00 PM)
4. Evening meal (5:00 PM - 7:00 PM)
5. Evening activities (7:00 PM - 9:00 PM)
- Include a variety of experiences, such as:
1. Visiting famous landmarks or museums
2. Exploring local neighborhoods or markets
3. Enjoying local cuisine or street food
4. Taking a guided tour or participating in a cultural activity
- Consider factors such as:
1. Travel time between attractions
2. Opening hours and ticket prices for attractions
3. Weather and seasonal events
4. Personal interests and preferences

\n{format_instructions}
"""