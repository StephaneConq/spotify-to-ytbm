from ytmusicapi import YTMusic

class YoutubeMusic:

    _service = None

    def __init__(self) -> None:
        self._service = YTMusic('oauth.json')

    def search_one(self, q):
        return self._service.search(
            q,
            filter="songs",
            limit=1,
        )

    def create_playlist(self, playlist_details):
        return self._service.create_playlist(playlist_details.get('name'), playlist_details.get('description'))
    
    def add_musics_to_playlists(self, playlist_id, musics):
        self._service.add_playlist_items(playlist_id, musics)