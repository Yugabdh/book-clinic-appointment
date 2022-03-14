import tkinter as tk

from common import geometry_string_to_center_window
from check_user import CheckUser

class App(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)

        # To store data
        self.store = dict()

        self.title("Admin utility")
        self.resizable(False, False)

        screenwidth = self.winfo_screenwidth()
        screenheight = self.winfo_screenheight()

        # setting size of window and centering it
        self.geometry(geometry_string_to_center_window(
            screenwidth, screenheight))
        self.resizable(False, False)
        self.attributes("-topmost", 1)
        self._frame = None
        self.switch_frame(CheckUser)


    def switch_frame(self, frame_class):
        new_frame = frame_class(self)
        if self._frame is not None:
            self._frame.destroy()
        self._frame = new_frame
        self._frame.pack(side="top", expand=True)

    def get_store(self):
        return self.store

    def set_store(self, data):
        self.store = data