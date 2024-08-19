from services import Spotify
from fastapi import APIRouter

router = APIRouter(
    prefix='/api/spotify'
)

@router.get('/playlist/search')
def spotify_search(q: str, page: int = 1):
    spotify = Spotify()
    return spotify.search(q=q, page=page)

@router.get('/playlist/{playlist_id}/tracks')
def list_tracks(playlist_id: str, page: int = 1):
    spotify = Spotify()
    return spotify.list_tracks(playlist_id=playlist_id, page=page)

@router.get('/playlist/{playlist_id}')
def get_playlist(playlist_id: str):
    spotify = Spotify()
    return spotify.get_playlist(playlist_id=playlist_id)