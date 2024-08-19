from services import YoutubeMusic, Spotify
from routes import spotify_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(spotify_router)

# service = YoutubeMusic()
# res = service.search('itzy wannabe')

# with open('test.json', 'w') as f:
#     json.dump(res, f)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)