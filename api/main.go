package main

import (
	"context"
	"io"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func validateApiKey(c *gin.Context) {
	log.Info("Validating API key...")
	APIKey := c.GetHeader("X-API-Key")
	log.Debug("API key: " + APIKey)
	if APIKey != os.Getenv("API_KEY") {
		c.AbortWithStatusJSON(401, gin.H{
			"message": "Invalid API key.",
		})
	}
}

type Post struct {
	Title string `bson:"title" json:"title"`
	Date string `bson:"date" json:"date"`
	ContentURL string `bson:"contentURL" json:"contentURL"`
	Type string `bson:"type" json:"type"`
	Id primitive.ObjectID `bson:"_id" json:"id"`
}

func getPost(c *gin.Context) {
	log.Info("Getting post...")
	filename := c.Param("filename")
	c.File("./static/posts/" + filename)
}

func getImage(c *gin.Context) {
	log.Info("Getting image...")
	filename := c.Param("filename")
	c.File("./static/images/compressed/" + filename)
}

func getPosts(client *mongo.Client, postType string) []Post {
	log.Info("Getting posts...")
	collection := client.Database("blog").Collection("posts")
	filter := bson.D{{Key: "type", Value: postType}}
	posts, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	var results []Post
	for posts.Next(context.Background()) {
		var post Post
		err := posts.Decode(&post)
		if err != nil {
			log.Fatal(err)
		}
		if post.Type == postType {
			results = append(results, post)
		}
	}
	return results
}

func getPostById(client *mongo.Client, postId string) Post {
	log.Debugf("Getting post with id %s...", postId)
	collection := client.Database("blog").Collection("posts")
	docID, err := primitive.ObjectIDFromHex(postId)
	if err != nil {
		log.Fatal(err)
	}
	filter := bson.D{{Key: "_id", Value: docID}}
	var post Post
	err = collection.FindOne(context.Background(), filter).Decode(&post)
	if err != nil {
		log.Fatal(err)
	}
	return post
}

func init() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}

func main() {
	log.Info("Loading environment variables...")
	port := os.Getenv("PORT")
	connectionUri := os.Getenv("CONNECTION_URI")

	log.Info("Connecting to database...")

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(connectionUri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}

	log.Info("Starting server...")

	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/", func(c *gin.Context) {
		// Hello world
		c.JSON(200, gin.H{
			"message": "Hello world!",
		})
	})

	static := r.Group("/static")
	{
		static.GET("/images/:filename", getImage)
		static.GET("/posts/:filename", getPost)
	}

	api := r.Group("/api")
	{
		api.GET("/posts/:type", func(c *gin.Context) {
			log.Info("Getting posts...")
			postType := c.Param("type")
			c.JSON(200, getPosts(client, postType))
		})

		api.GET("/post/:id", func(c *gin.Context) {
			log.Info("Getting post...")
			postId := c.Param("id")
			c.JSON(200, getPostById(client, postId))
		})

		static := api.Group("/static")
		{
			static.GET("/images/:filename", getImage)
			static.GET("/posts/:filename", getPost)
		}

		email := api.Group("/email")
		{
			email.POST("/", func(c *gin.Context) {
				log.Info("Subscribing to newsletter...")
				collection := client.Database("blog").Collection("emails")
				var email bson.M
				err := c.BindJSON(&email)
				if err != nil {
					log.Fatal(err)
				}
				_, err = collection.InsertOne(context.Background(), email)
				if err != nil {
					log.Fatal(err)
				}
				c.JSON(200, gin.H{
					"message": "Successfully subscribed to newsletter.",
				})
			})
		}

		// Gopher task service
		gopher := api.Group("/gopher")
		{
			// TODO: Make these facade functions
			gopher.GET("/", validateApiKey, func(c *gin.Context) {
				log.Info("Getting gopher...")
				gopher_url := os.Getenv("GOPHER_URL")
				log.Debug("Gopher URL: " + gopher_url)
				gopher_response, err := http.Get(gopher_url)
				if err != nil {
					log.Fatal(err)
				}
				defer gopher_response.Body.Close()

				if gopher_response.StatusCode == http.StatusOK {
					bodyBytes, err := io.ReadAll(gopher_response.Body)
					if err != nil {
						log.Fatal(err)
					}
					bodyString := string(bodyBytes)
					c.JSON(200, gin.H{
						"message": bodyString,
					})
				} else {
					log.Fatal(gopher_response.Status)
					c.JSON(500, gin.H{
						"message": "Internal server error.",
					})
				}
			})

			gopher.POST("/", validateApiKey, func(c *gin.Context) {
				log.Info("Add jobs...")
				gopher_url := os.Getenv("GOPHER_URL")+"/addTasks"
				log.Debug("Gopher URL: " + gopher_url)
				gopher_response, err := http.Post(gopher_url, "application/json", c.Request.Body)
				if err != nil {
					log.Fatal(err)
				}
				defer gopher_response.Body.Close()

				if gopher_response.StatusCode == http.StatusOK {
					bodyBytes, err := io.ReadAll(gopher_response.Body)
					if err != nil {
						log.Fatal(err)
					}
					bodyString := string(bodyBytes)
					c.JSON(200, gin.H{
						"message": bodyString,
					})
				} else {
					log.Fatal(gopher_response.Status)
					c.JSON(500, gin.H{
						"message": "Internal server error.",
					})
				}
			})
		}

		// Gpt4All service
		gpt4all := api.Group("/gpt4all")
		{
			gpt4all.GET("/", validateApiKey, func(c *gin.Context) {
				log.Info("Getting gpt4all...")
				gpt4all_url := os.Getenv("GPT4ALL_URL")
				log.Debug("Gpt4all URL: " + gpt4all_url)
				gpt4all_response, err := http.Get(gpt4all_url)
				if err != nil {
					log.Fatal(err)
				}
				defer gpt4all_response.Body.Close()

				if gpt4all_response.StatusCode == http.StatusOK {
					bodyBytes, err := io.ReadAll(gpt4all_response.Body)
					if err != nil {
						log.Fatal(err)
					}
					bodyString := string(bodyBytes)
					c.JSON(200, gin.H{
						"message": bodyString,
					})
				} else {
					log.Fatal(gpt4all_response.Status)
					c.JSON(500, gin.H{
						"message": "Internal server error.",
					})
				}
			})

			gpt4all.POST("/", validateApiKey, func(c *gin.Context) {
				log.Info("Generating response...")
				gpt4all_url := os.Getenv("GPT4ALL_URL")+"/generate"
				log.Debug("Gpt4all URL: " + gpt4all_url)
				gpt4all_response, err := http.Post(gpt4all_url, "application/json", c.Request.Body)
				if err != nil {
					log.Fatal(err)
				}
				defer gpt4all_response.Body.Close()

				if gpt4all_response.StatusCode == http.StatusOK {
					c.Header("Content-Type", "application/json")
					io.Copy(c.Writer, gpt4all_response.Body)
				} else {
					log.Fatal(gpt4all_response.Status)
					c.JSON(500, gin.H{
						"message": "Internal server error.",
					})
				}
			})
		}
	}

	r.Run(":" + port)
}