# Travel Planner AI

This project (a prototype) is designed to generate a plan for a trip using AI. It consists of two main components:
1. A Large Language Model (LLM) backend written in Python
2. A web frontend built with Nuxt 3

## Project Structure

- `/LLM_AI_trip/`: Contains the Python-based LLM for trip planning
- `/`: Root directory contains the Nuxt 3 web application

## Installation and Setup

### Web Frontend (Nuxt 3)

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```
   The server will be available at `http://localhost:3000`

### LLM Backend

1. Create a new Python environment:
   ```bash
   conda create -n trip_planner_env
   conda activate trip_planner_env
   ```

2. Install the required dependencies:
   ```bash
   pip install -r /LLM_AI_trip/requirements.txt
   ```

3. Run the LLM backend:
   ```bash
   fastapi dev /LLM_AI_trip/src/main.py
   ```
