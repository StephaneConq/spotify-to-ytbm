from ytmusicapi import YTMusic

class YoutubeMusic:

    _service = None

    def __init__(self) -> None:
        self._service = YTMusic('oauth.json')

    def search(self, q):
        return self._service.search(q)