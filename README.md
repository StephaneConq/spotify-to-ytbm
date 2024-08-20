# Spotify to YouTube Music Playlist Duplicator
=====================================================

This project allows users to search for Spotify playlists and duplicate them on YouTube Music using the Spotify API and YouTube Music API.

## Project Structure
-------------------

The project consists of two main folders:

* `front`: A Vue 3 / Vuetify project that handles the user interface and frontend logic.
* `back`: A Python 3.12 FastAPI project that handles the backend logic, including API calls to Spotify and YouTube Music.

## Installation and Running
-------------------------

### Frontend

1. Navigate to the `front` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following variable: `VUE_APP_API_URL=http://0.0.0.0:8000/api`.
4. Run `npm run serve` to start the frontend server.

### Backend

1. Navigate to the `back` folder.
2. Create a virtual environment using `python -m venv venv`.
3. Activate the virtual environment using `source venv/bin/activate`.
4. Install dependencies using `pip install -r requirements.txt`.
5. Generate an `oauth.json` file using the instructions provided by [ytmusicapi](https://ytmusicapi.readthedocs.io/en/stable/setup/oauth.html).
6. Create a `spotify.json` with `client_id` and `client_secret` filled with the Spotify credentials
7. Run the backend server using `uvicorn main:app --host 0.0.0.0 --port 8000` or via debugger in vscode.

## Usage
-----

Once both the frontend and backend servers are running, you can access the application by navigating to `http://localhost:8080` in your web browser. From there, you can search for Spotify playlists and duplicate them on YouTube Music (WIP).

## Technologies Used
--------------------

* Vue 3
* Vuetify
* Python 3.12
* FastAPI
* Spotify API
* YouTube Music API via ytmusicapi

## License
-------

This work by [Stephane Conq](https://stephaneconq.com/) is licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1) 
