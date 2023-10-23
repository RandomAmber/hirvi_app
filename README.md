# Hirvi App

Web portal for Finnish learners with games, articles and interesting news. Target levels are A2-B2.

## Install

#### FAST API

1. Install conda. If you don't have conda on your computer - install it. Read more about conda installation [here](https://docs.conda.io/projects/conda/en/23.1.x/user-guide/install/index.html).
2. Install all dependicies to a new environment:
    >conda env create -f scripts/environment.yml
3. Activate the environment.
    >conda activate hirvi
4. Initialize data and run server:
    >cd scripts
    >python3 initial_data.py
    >uvicorn sql_app.main:app

#### Web application

To be continued...

## Documentation