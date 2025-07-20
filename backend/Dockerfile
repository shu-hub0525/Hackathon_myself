FROM python:3.11

WORKDIR /code

COPY ./backend/requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend/ /code/
