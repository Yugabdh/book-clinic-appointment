import tkinter as tk
from tkinter.messagebox import showerror, showwarning, askyesno
from firebase_admin import auth

from make_changes import MakeChangesInUser
from add_user import AddUser


class CheckUser(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.parent = master

        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)

        self.phoneNumber_label = tk.Label(self, text="Phone number", font=("Lato", 14))
        self.phoneNumber_label.grid(row=0, column=0, sticky=tk.W, padx=10, pady=10)

        self.phoneNumber_entry = tk.Entry(self, borderwidth=1)
        self.phoneNumber_entry.grid(row=1, column=0, sticky=tk.W, padx=10, pady=0, ipadx=100, ipady=5)
        self.phoneNumber_entry.focus()

        self.phoneNumber_label_help = tk.Label(self, text="Enter 10 digit valid number", font=("Lato", 8))
        self.phoneNumber_label_help.grid(row=2, column=0, sticky=tk.W, padx=10, pady=0)

        self.get_user_btn = tk.Button(self, text="Check user", bg="#007bff", command=self.check_user)
        self.get_user_btn.grid(row=3, column=0, sticky=tk.W, padx=10, pady=10)

    def check_user(self):
        phone_number = self.phoneNumber_entry.get()
        if len(phone_number) != 10:
            showerror(
                title="Error",
                message="Invalid phone number.")
        else:
            try:
                user = auth.get_user_by_phone_number("+91" + phone_number)
                print("Successfully fetched user data: {0}".format(user.uid))
                if user:
                    data = self.parent.get_store()
                    data["phoneNumber"] = "+91" + phone_number
                    data["user"] = user
                    self.parent.set_store(data)
                    print(self.parent.get_store())
                    answer = askyesno(
                        title="Confirmation",
                        message="User is present. Want to perform actions on this user?")

                    if answer:
                        self.parent.switch_frame(MakeChangesInUser)

            except auth.UserNotFoundError:
                answer = askyesno(
                        title="User not found",
                        message="User not found with phone number: " + phone_number+ ". Do you want to add this user?")

                if answer:
                    data = self.parent.get_store()
                    data["phoneNumber"] = "+91" + phone_number
                    self.parent.set_store(data)
                    self.parent.switch_frame(AddUser)

