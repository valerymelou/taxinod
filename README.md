# Welcome to Taxinod

Taxinod is an open source platform to find the cheapest taxi routes to a destination in your city.

Built with Python, Django, TypeScript and Angular.

[![codecov](https://codecov.io/gh/valerymelou/taxinod/branch/develop/graph/badge.svg?token=8XJD8VPN9F)](https://codecov.io/gh/valerymelou/taxinod) [![CI](https://github.com/valerymelou/taxinod/actions/workflows/ci.yml/badge.svg)](https://github.com/valerymelou/taxinod/actions/workflows/ci.yml)

## Project overview
### Project goal
Imagine you arrive in a city like Yaounde where taxis are usually shared [Taxi au Cameroun (Wikipedia)](https://fr.wikipedia.org/wiki/Taxi_au_Cameroun). Before going somewhere in taxi, you might want to know how much you should pay. Taxinod was created just for that. It tells you how much you should pay to go from one taxi stop to another one.

### How to use it
To search for a route in Taxinod, you need to select the origin and then the destination from the search form in the home page. The app will then list the route(s) between the selected origin and destination, plus how much it cost to go from one to another in taxi. The route(s) are also displayed on the map.

### Live project
You can checkout the live project [here](https://taxinod.com).

## Want to contribute?
Found a bug? A typo? Or do you want to add a taxi route with its price in the database? Then go ahead and create an issue. But please, do check the [code of conduct]() for rules and guidelines, and the [CONTRIBUTING.md file]() for the steps in order to contribute.

### Getting started

#### Stack
This project is built on top of:

* [Django]()
* [Angular]()
* [Angular Material]()
* [TailwindCSS]()

The backend and the frontend are all together in this repo, thanks to [NX](https://nx.dev).

#### Prerequisites
Before starting, please make sure you have the following available on your computer:

* [Python]()
* [Node]()
* [Yarn]()
* [Postgres SQL]()

#### Steps
1. [Fork](https://github.com/valerymelou/taxinod) this repository.
2. In your terminal, clone your fork:

`git clone <link to your fork>`

3. Navigate to the project directory:

`cd taxinod`

4. Install dependencies for the mono repo tooling and the frontend:

`yarn install`

5. Create a Python virtual environment:

`python -m venv <virtual env path>`

6. Activate the virtual env you just created:

`source <virtual env path>/bin/activate`

7. Install python dependencies:

`pip install -r requirements/local.txt`

8. Create a new PostreSQL database using [createdb](https://www.postgresql.org/docs/current/static/app-createdb.html)

`createdb --username=postgres taxinod`

9. Setup the environment variables

Create a `.env` file at the root of the project with the following environment variables defined in it:
```
DATABASE_URL=postgres://postgres:<password>@127.0.0.1:5432/taxinod
CELERY_BROKER_URL=redis://localhost:6379/0
NX_GOOGLE_MAPS_API_KEY=<your Google Maps API key>
```
