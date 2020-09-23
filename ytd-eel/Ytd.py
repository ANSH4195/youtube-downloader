from pytube import YouTube
import tkinter as tk
from tkinter import filedialog
import time
import eel

eel.init('web')

hq_size = 0
lq_size = 0

# Un-necessary comment


@eel.expose
def selectFolder():
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    directory_path = filedialog.askdirectory()
    return directory_path


@eel.expose
def getinfo(link):
    global hq_size, lq_size
    try:
        yt = YouTube(link)
        hq_size = yt.streams.get_by_resolution('720p').filesize
        lq_size = yt.streams.get_by_resolution('360p').filesize
        n = int(yt.length)
        if n < 3600:
            duration = time.strftime("%M:%S", time.gmtime(n))
        else:
            duration = time.strftime("%H:%M:%S", time.gmtime(n))

        return [yt.author, duration, yt.title, hq_size, lq_size]

    except Exception as e:
        return e


@eel.expose
def hqdownloader(link, folder):
    try:
        yt = YouTube(link)
        yt.streams.get_by_resolution('720p').download(folder)

    except Exception as e:
        return e


@eel.expose
def lqdownloader(link, folder):
    try:
        yt = YouTube(link)
        yt.streams.get_by_resolution('360p').download(folder)

    except Exception as e:
        return e


eel.start('index.html', size=(1000, 800))
