# syntax=docker/dockerfile:1

FROM golang:alpine
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /server
COPY ./.env /app/.env

CMD ["/server"]