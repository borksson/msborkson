FROM python:3.11

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 3020

CMD ["flask", "run", "--host", "0.0.0.0", "--debug"]