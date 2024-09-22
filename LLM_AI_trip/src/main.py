import os
from models.trip_model import Itinerary
from langchain.output_parsers import PydanticOutputParser
from langchain_cohere import ChatCohere
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

from prompts.prompt import (PROMPT_ITINERARY)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import torch
from diffusers import StableDiffusionPipeline

from huggingface_hub import login
from datetime import datetime

from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/src/generated_images", StaticFiles(directory="src/generated_images"), name="generated_images")

# Support CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv()

login(token = os.environ.get("HUGGINGFACE_TOKEN"))


@app.get("/itinerary/")
def get_itinerary(country: str, city: str, num_days: int):
    # Define the parser
    parser = PydanticOutputParser(pydantic_object=Itinerary)

    chat = ChatCohere()

    #  Define the LangChain model
    prompt = ChatPromptTemplate.from_template(PROMPT_ITINERARY)
    chain = prompt | chat | parser

    output = chain.invoke({"num_days": num_days, "city": city, "country": country, 'format_instructions': parser.get_format_instructions()})
    return {'output': output}

@app.get("/generate_image/")
def generate_image(country: str, city: str, request: Request):
    model_id = "CompVis/stable-diffusion-v1-4"
    device = "cuda"

    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe = pipe.to(device)

    prompt = f"A good view in {country} {city}, beautiful, warm"
    image = pipe(
        prompt,
        height=1024,
        width=1024,
    ).images[0]

    # Generate a unique filename using timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"src/generated_images/image_{timestamp}.png"
    
    # Save the image
    image.save(filename)

    return f"{request.base_url}{filename}"