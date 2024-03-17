package main

import (
	"os"
	"github.com/sirupsen/logrus"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
  "github.com/toorop/gin-logrus"
	"github.com/joho/godotenv"
)

func init() {
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetOutput(os.Stdout)
	logrus.SetLevel(logrus.DebugLevel)
}

func proxy(c *gin.Context, remote *url.URL) {
	proxy := httputil.NewSingleHostReverseProxy(remote)
	proxy.Director = func(req *http.Request) {
		req.Header = c.Request.Header
		req.Host = remote.Host
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
		req.URL.Path = c.Param("proxyPath")
	}

	proxy.ServeHTTP(c.Writer, c.Request)
}

func main() {
	log := logrus.New()

	err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }

	port := os.Getenv("PORT")
	registry_url, err := url.Parse(os.Getenv("REGISTRY_URL"))
	if err != nil {
		panic(err)
	}

	r := gin.Default()
	r.Use(ginlogrus.Logger(log), gin.Recovery())

	// GET /ping
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	});

	r.Any("/registry/*proxyPath", func(c *gin.Context) {
		proxy(c, registry_url)
	})

	r.Run(":" + port)
}