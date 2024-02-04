import express from "express";
import bodyParser from "body-parser";
//Best way how to import lodash
import _ from "lodash";


const app = express();
const port = 3000;

//Create a Global Variable
let posts = [];


const homeStartingContent = "The web blog community serves as a platform for communication, knowledge sharing, and discourse shaping. It connects individuals globally, enabling expression, learning, and engagement with diverse perspectives, enriching the digital landscape and fostering personal and professional growth opportunities.💻"
const aboutContent = "WEBBLOG is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen."
const contactContent = "Web Blog Community would love ❤️ to hear from you."

//To restart the server type rs

//Get the static file
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));
//Use the route for home page
//Get the value for the home Content by passing the object
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        homeContent:homeStartingContent,
        posts : posts
        
    }
    )
    // console.log(posts)
})

app.get("/about",(req,res)=>{
    res.render("about.ejs",{
        aboutCountentText:aboutContent
    })
})


app.get("/contact",(req,res)=>{
    res.render("contact.ejs",{
        contactText:contactContent
    })
})

app.get("/compose",(req,res)=>{
    res.render("compose.ejs");
})



//To post inside the router.
app.post("/compose",(req,res)=>{
    const postCompose = {
        title: req.body.postTitle,
        content: req.body.postBody}

        //Adding objects to the empty global array
        posts.push(postCompose)

        //Sending back the objectes or data to the home page
        res.redirect("/")

    })


    //Using express using parameters where you can use more than one param
app.get("/posts/:postName",(req,res)=>{
    // console.log(req.params.postName)

    //Convert the title into lowercase using lodash
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach((post)=>{
        
        const storedFile = _.lowerCase(post.title );

        if( storedFile === requestedTitle ){
            res.render("post.ejs",{
                title:post.title,
                content:post.content
            })
        }
    })


    
})
// Route to Delete by using the post method and the filter function
app.post("/posts/:postName", (req, res) => {
    // Convert the title into lowercase using lodash
    const deletePost = _.lowerCase(req.params.postName);

    // Filter out the post to be deleted and update the posts array
    posts = posts.filter(post => _.lowerCase(post.title) !== deletePost);

    // Redirect back to the home page after deleting the post
    res.redirect("/");
});

    









app.listen(port,()=>{
    console.log(`Serving running on port ${port}.`)
})