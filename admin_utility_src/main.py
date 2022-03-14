import tkinter as tk

from app import App
from firebase_setup import initialize_app
from check_user import CheckUser


if __name__ == "__main__":
    initialize_app()
    main_app = App()
    frame = CheckUser(main_app)
    main_app.mainloop()

