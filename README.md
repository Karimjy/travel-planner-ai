# Installation web nuxt3

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

# Installation LLM

The folder /LLM_AI_trip/ contains the LLM (Cohere for this prototype)

## Create a new python environment

```bash
conda create -n name_env

conda activate name_env
```

## Install the dependencies

```bash
pip install -r /LLM_AI_trip/requirements.txt
```

## Run it

```bash
fastapi dev /LLM_AI_trip/src/main.py
```
