import re
import urllib.request


def multimedia_search_service(search_keyword):
    search_keyword = str(search_keyword).replace(" ", "")
    search_song_url = urllib.request.urlopen(
        "https://www.youtube.com/results?search_query=" + search_keyword)
    video_ids = re.findall(r"watch\?v=(\S{11})", search_song_url.read().decode())
    urls = list()
    for video_id in video_ids:
        url = str("https://www.youtube.com/watch?v=" + video_id)
        urls.append(url)

    res = {"urls": urls}
    return res
