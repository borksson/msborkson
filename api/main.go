package main

import (
	"context"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	log "github.com/sirupsen/logrus"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// func validateApiKey(c *gin.Context) {
// 	APIKey := c.GetHeader("X-API-Key")
// 	if APIKey != os.Getenv("API_KEY") {
// 		c.AbortWithStatusJSON(401, gin.H{
// 			"message": "Invalid API key.",
// 		})
// 	}
// }

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
	//log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}

func main() {
	log.Info("Loading environment variables...")
	port := os.Getenv("API_PORT")
	connectionUri := os.Getenv("DB_CONNECTION_URL")

	log.Info("Connecting to database...")
	log.Info("Connection URI: " + connectionUri)
	log.Info("Port: " + port)

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
	}

	r.Run(":" + port)
}