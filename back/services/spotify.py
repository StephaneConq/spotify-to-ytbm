import requests
import json
import time

class Spotify:
    _credentials = None
    _access_token = None
    _access_token_expiry = None

    def __init__(self) -> None:
        with open('spotify.json', 'r') as f:
            self._credentials = json.load(f)

    def _is_expired(self):
        if not self._access_token_expiry:
            return True
        return time.time() > self._access_token_expiry

    def auth(self):
        r = requests.post('https://accounts.spotify.com/api/token', 
                          headers={
                              "Content-Type": "application/x-www-form-urlencoded"
                          },
                          data={
                              "grant_type": "client_credentials",
                              "client_id": self._credentials.get('client_id'),
                              "client_secret": self._credentials.get('client_secret')
                            })
        res = r.json()
        if r.status_code != 200:
            print("error fetching token spotify", res)
            raise
        self._access_token = res.get('access_token')
        self._access_token_expiry = time.time() + res.get('expires_in')

    def search(self, q, limit=10, page=1):
        if q in ['', None]:
            return []

        if self._is_expired():
            self.auth()

        params = {
            "type": "playlist",
            "q": q,
            "limit": limit,
            "offset": limit * (page - 1),
            "market": "FR"
        }

        r = requests.get('https://api.spotify.com/v1/search', 
                         params=params, 
                         headers={
                            "Authorization": f"Bearer {self._access_token}"
                        })
        res = r.json()

        if r.status_code != 200:
            print("error searching playlist spotify", res)
            return []

        return res.get('playlists', {}).get('items', [])
    
    def list_tracks(self, playlist_id, page=1, limit=50):
        if self._is_expired():
            self.auth()
        
        params = {
            "limit": limit,
            "offset": limit * (page - 1)
        }
        
        r = requests.get(f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks', 
                         headers={
                            "Authorization": f"Bearer {self._access_token}"
                        },
                        params=params)
        res = r.json()

        if r.status_code != 200:
            print('error fetching tracks playlist spotify', res)
            raise

        return res.get('items')
    
    def get_playlist(self, playlist_id):
        if self._is_expired():
            self.auth()

        r = requests.get(f'https://api.spotify.com/v1/playlists/{playlist_id}', 
                         headers={
                            "Authorization": f"Bearer {self._access_token}"
                        },
                        params={
                            "fields": "id,name,images,description"
                        })
        res = r.json()

        if r.status_code != 200:
            print('error fetching playlist spotify', res)
            raise

        return res