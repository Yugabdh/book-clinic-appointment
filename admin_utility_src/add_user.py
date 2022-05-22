import tkinter as tk
from tkinter.messagebox import showerror, showinfo
from firebase_admin import auth
from firebase_admin import firestore


class AddUser(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.parent = master
        self.data = self.parent.get_store()

        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)

        if self.parent.get_store():

            self.phoneNumber_label = tk.Label(
                self, text="Phone number: " + self.data["phoneNumber"], font=("Lato", 14))
            self.phoneNumber_label.grid(
                row=0, column=0, sticky=tk.W, padx=10, pady=10)

            self.firstName_label = tk.Label(
                self, text="First Name:", font=("Lato", 14))
            self.firstName_label.grid(
                row=1, column=0, sticky=tk.W, padx=10, pady=10)
            self.firstName_entry = tk.Entry(self, borderwidth=1)
            self.firstName_entry.grid(
                row=2, column=0, sticky=tk.W, padx=10, pady=0, ipadx=100, ipady=5)
            self.firstName_entry.focus()

            self.lastName_label = tk.Label(
                self, text="Last Name:", font=("Lato", 14))
            self.lastName_label.grid(
                row=3, column=0, sticky=tk.W, padx=10, pady=10)
            self.lastName_entry = tk.Entry(self, borderwidth=1)
            self.lastName_entry.grid(
                row=4, column=0, sticky=tk.W, padx=10, pady=0, ipadx=100, ipady=5)

            self.age_label = tk.Label(self, text="Age:", font=("Lato", 14))
            self.age_label.grid(row=5, column=0, sticky=tk.W, padx=10, pady=10)
            self.age_entry = tk.Entry(self, borderwidth=1)
            self.age_entry.grid(row=6, column=0, sticky=tk.W,
                                padx=10, pady=0, ipadx=100, ipady=5)

            genders = ["Male", "Female", "Other"]

            # radio buttons
            self.gender_btn = tk.StringVar()
            for index, gender in enumerate(genders):
                r = tk.Radiobutton(
                    self,
                    text=gender,
                    value=gender,
                    variable=self.gender_btn,
                    selectcolor="#007bff"
                )
                r.grid(row=7+index, column=0, sticky=tk.W, padx=10, pady=5)

            self.label_error = tk.Label(self, foreground='red')
            self.label_error.grid(
                row=10, column=1, sticky=tk.W,  padx=10, pady=10)

            self.add_user_btn = tk.Button(
                self, text="Add user", bg="#007bff", command=self.add_user)
            self.add_user_btn.grid(
                row=11, column=0, sticky=tk.W, padx=10, pady=10)

    def add_user(self):
        firstName = self.firstName_entry.get()
        lastName = self.lastName_entry.get()
        age = self.age_entry.get()
        gender = self.gender_btn.get()

        msg = ""

        if len(firstName) < 1:
            msg += "Please enter valid first name\n"
        if len(lastName) < 1:
            msg += "Please enter valid last name\n"
        if len(age) < 1:
            msg += "Please enter age\n"
        if len(gender) < 1:
            msg += "Please select gender\n"

        self.label_error['text'] = msg
        if len(msg) < 1:
            user = auth.create_user(phone_number=self.data["phoneNumber"])
            db = firestore.client()
            doc_ref = db.collection(u'users').document(user.uid)
            doc_ref.set({
                u'firstName': firstName,
                u'lastName': lastName,
                u'age': age,
                u'fullName': firstName + " " + lastName,
                u'fullNameLower': firstName.lower() + " " + lastName.lower(),
                u'phoneNumber': self.data["phoneNumber"],
                u'uid': user.uid,
                u'gender': gender
            })
            showinfo("Success", "User Added")
        else:
            showerror(title="Error", message="Invalid phone number.")
