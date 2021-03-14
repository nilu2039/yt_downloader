import youtube_dl
import requests
import sys
ydl_opts = {}
x = []


def yt():
    x = requests.post("http://localhost:5000/download")
    if(not x):
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            meta = ydl.extract_info(
                'https://www.youtube.com/watch?v=X3QM6Ap6u-4&t=307s', download=False)
            formats = meta.get('formats', [meta])
        for f in formats:
            x.append({
                "extension": f['ext'],
                "format": f['format_note'],
                "audio": f['acodec'],
                "code": f['format_id']
            })
    # print(x)
    # return requests.post("http://localhost:5000/name", json=x)


yt()


x = requests.post("http://localhost:5000/download")
print(x.text)
if(x):
    ydl_opts1 = {
        "format": x.text
    }
    with youtube_dl.YoutubeDL(ydl_opts1) as ydl1:
        ydl1.download(['https://www.youtube.com/watch?v=X3QM6Ap6u-4&t=307s'])
