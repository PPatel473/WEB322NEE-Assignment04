/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Prince Prakashbhai Patel Student ID: 182063214 Date: 02/02/2025
*
********************************************************************************/

const express = require("express");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set up static file serving
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => res.render("about"));
app.use((req, res) => res.status(404).render("404", { message: "Page not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Default route (root) - Serve home.html
res.render("home");

// About page route
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Route to get all sites (returns JSON)
app.get("/sites", async (req, res) => {
    try {
        const { region, provinceOrTerritory } = req.query;

        if (region) {
            const sites = await dataService.getSitesByRegion(region);
            if (sites.length === 0) {
                res.status(404).send("No sites found for the given region.");
            } else {
                res.json(sites);
            }
        } else if (provinceOrTerritory) {
            const sites = await dataService.getSitesByProvinceOrTerritoryName(provinceOrTerritory);
            if (sites.length === 0) {
                res.status(404).send("No sites found for the given province/territory.");
            } else {
                res.json(sites);
            }
        } else {
            const sites = await dataService.getAllSites();
            res.json(sites);
        }
    } catch (err) {
        res.status(500).send("Error fetching site data: " + err);
    }
});

// Route to get a site by dynamic ID (example: /sites/AB001)
app.get("/sites/:id", async (req, res) => {
    try {
        const site = await dataService.getSiteById(req.params.id);
        if (!site) {
            res.status(404).send("Site not found");
        } else {
            res.json(site);
        }
    } catch (err) {
        res.status(404).send("Error fetching site by ID: " + err);
    }
});

// Handle 404 errors by serving the 404.html page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

// Initialize the data service before starting the server
dataService.initialize()
    .then(() => {
        console.log("Data service initialized successfully.");
    })
    .catch(err => {
        console.error("Failed to initialize data service: ", err);
    });

// Export app for Vercel
module.exports = app;
