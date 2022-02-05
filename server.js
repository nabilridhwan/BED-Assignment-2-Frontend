const {
    ok
} = require("assert");
const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path")
const PORT = 5050;

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/login", (req, res) => {
    res.sendFile("login.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/register", (req, res) => {
    res.sendFile("register.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/products", (req, res) => {
    if (req.query.action == "add") {
        return res.sendFile("addproduct.html", {
            root: path.join(__dirname + "/public")
        });
    }

    return res.sendFile("products.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/discounts", (req, res) => {
    return res.sendFile("adddiscount.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/categories", (req, res) => {

    if (req.query.action == "add") {
        return res.sendFile("addcategory.html", {
            root: path.join(__dirname + "/public")
        });
    }
    return res.sendFile("categories.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/category", (req, res) => {
    return res.sendFile("category.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/cart", (req, res) => {
    return res.sendFile("cart.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/product", (req, res) => {

    if (req.query.action == "edit") {
        return res.sendFile("edit-product.html", {
            root: path.join(__dirname + "/public")
        });
    }

    return res.sendFile("single-product.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/profile", (req, res) => {
    res.sendFile("profile.html", {
        root: path.join(__dirname + "/public")
    });
})

app.get("/logout", (req, res) => {
    res.sendFile("logout.html", {
        root: path.join(__dirname + "/public")
    });
})

app.listen(PORT, () => console.log("Frontend server is running on port: " + PORT))