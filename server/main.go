package main

import (
	"os"
	"github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
  "github.com/toorop/gin-logrus"
)

func init() {
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetOutput(os.Stdout)
	logrus.SetLevel(logrus.DebugLevel)
}

func main() {
	port := os.Getenv("PORT")

	log := logrus.New()

	r := gin.Default()
	r.Use(ginlogrus.Logger(log), gin.Recovery())

	// GET /ping
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	});

	r.Run(":" + port)
}