import tkinter as tk
from tkinter.messagebox import askyesno, showerror, showinfo
from firebase_admin import auth


class MakeChangesInUser(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.parent = master
        self.data = self.parent.get_store()

        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)

        if self.parent.get_store():
            self.phoneNumber_label = tk.Label(self,
                                              text="Phone number: " + self.data["phoneNumber"], font=("Lato", 14))
            self.phoneNumber_label.grid(
                row=0, column=0, sticky=tk.W, padx=10, pady=0)
            self.uid_label = tk.Label(
                self, text="UID: " + self.data["user"].uid, font=("Lato", 14))
            self.uid_label.grid(row=1, column=0, sticky=tk.W, padx=10, pady=0)

            claims = (("Receptionist", "receptionist"), ("Doctor", "doctor"),
                      ("Remove all (Removes any or all claims)", "remove"))

            self.claim_label = tk.Label(
                self, text="What role you want to allot to above user?", font=("Lato", 14))
            self.claim_label.grid(
                row=2, column=0, sticky=tk.W, padx=10, pady=15)

            self.current_status = tk.StringVar()
            self.current_claims()
            self.claim_label = tk.Label(
                self, textvariable=self.current_status, font=("Lato", 8))
            self.claim_label.grid(
                row=3, column=0, sticky=tk.W, padx=10, pady=15)

            # radio buttons
            self.custom_claim = tk.StringVar()
            for index, claim in enumerate(claims):
                r = tk.Radiobutton(
                    self,
                    text=claim[0],
                    value=claim[1],
                    variable=self.custom_claim,
                    selectcolor="#007bff"
                )
                r.grid(row=4+index, column=0, sticky=tk.W, padx=10, pady=5)

            self.get_user_btn = tk.Button(
                self, text="Update user", bg="#007bff", command=self.update_user)
            self.get_user_btn.grid(
                row=7, column=0, sticky=tk.W, padx=15, pady=10)
            self.get_user_btn = tk.Button(
                self, text="Back", bg="#007bff", command=self.back_to_main)
            self.get_user_btn.grid(
                row=7, column=1, sticky=tk.W, padx=15, pady=10)

    def back_to_main(self):
        from check_user import CheckUser
        self.data["user"] = None
        self.data["phoneNumber"] = ""
        self.parent.switch_frame(CheckUser)

    def current_claims(self):
        # Lookup the user associated with the specified uid.
        print(self.data['user'].uid)
        user = auth.get_user(self.data['user'].uid)
        if (user.custom_claims):
            # The claims can be accessed on the user record.
            receptionist = user.custom_claims.get("receptionist")
            doctor = user.custom_claims.get("doctor")
            if doctor:
                self.current_status.set("User profile level: Doctor")
            elif receptionist:
                self.current_status.set("User profile level: Receptionist")
            else:
                self.current_status.set("User profile level: None")
        else:
            self.current_status.set("User profile level: None")

    def update_user(self):
        # Check if radio button is selected
        if self.custom_claim.get():
            val = str(self.custom_claim.get())
            msg = "Change user profile as "+val
            if val == "remove":
                msg = "Remove all auth levels on profile."

            answer = askyesno(
                title="Confirmation",
                message="Do you want to update user? " + msg)

            if answer:
                self.set_custom_claims(val)

        else:
            showerror(title="Error", message="Invalid phone number.")

    def set_custom_claims(self, val: str):
        # Set admin privilege on the user corresponding to uid.
        if val == "remove":
            auth.set_custom_user_claims(self.data["user"].uid, {
                                        "receptionist": False, "doctor": False})
            # Lookup the user associated with the specified uid.
            user = auth.get_user(self.data["user"].uid)
            if not user.custom_claims.get("receptionist") and not user.custom_claims.get("doctor"):
                showinfo("Success", "All rights on user removed")
            else:
                showerror("Error", "User update failed")
        else:
            auth.set_custom_user_claims(self.data["user"].uid, {val: True})
            # Lookup the user associated with the specified uid.
            user = auth.get_user(self.data["user"].uid)
            # The claims can be accessed on the user record.
            if user.custom_claims.get(val):
                showinfo("Success", "User is now "+val)
            else:
                showerror("Error", "User update failed")

        self.data["user"] = user
        self.current_claims()
