# Admin utility
[![Python Version](https://img.shields.io/badge/python-3.6+-green)](https://www.python.org)

> __Note__:
> Create a Python virtual environment if you don't want to conflict with local packages and then install packages in that virtual environment. Also, install tkinter.

```
python3 -m venv venv
```
> Activate above created virtual environment.

##### Install Python packages
```
pip install -r requirements.txt
```

## Run

> __Note__:
> Create a directory structure as assets/data in admin_utility_src (./admin_utility_src/assets/data) and move ServiceAccountKey.json in it.
>[How to create ServiceAccountKey.json?](https://firebase.google.com/docs/admin/setup)

```
python3 main.py
```

## To generate EXE
```
pyinstaller --onefile --windowed --icon="assets/logo.ico" main.py
```