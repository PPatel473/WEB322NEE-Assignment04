/********************************************************************************
*  WEB322 – Assignment 04
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
const dataService = require("./data-service"); // Ensure this module exists and is implemented correctly

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set up static file serving for CSS, JS, images, etc.
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (req, res) => res.render("home", { page: "home" }));
app.get("/about", (req, res) => res.render("about", { page: "about" }));

// Route to get all sites and filter by region or province/territory
app.get("/sites", async (req, res) => {
    try {
        const { region, provinceOrTerritory } = req.query;
        let sites;

        if (region?.trim()) {
            sites = await dataService.getSitesByRegion(region.trim());
        } else if (provinceOrTerritory?.trim()) {
            sites = await dataService.getSitesByProvinceOrTerritoryName(provinceOrTerritory.trim());
        } else {
            sites = await dataService.getAllSites();
        }

        if (!sites || sites.length === 0) {
            return res.status(404).render("404", { page: "sites", message: "No sites found." });
        }

        res.render("sites", { page: "sites", sites });
    } catch (err) {
        console.error("Error fetching site data: ", err);
        res.status(500).render("404", { page: "sites", message: `Error fetching site data: ${err.message}` });
    }
});

// Route to get a site by ID
app.get("/sites/:id", async (req, res) => {
    try {
        const siteId = req.params.id;
        const site = await dataService.getSiteById(siteId);

        if (!site) {
            return res.status(404).render("404", { page: "sites", message: "Site not found." });
        }

        res.render("site", { page: "sites", site });
    } catch (err) {
        console.error("Error fetching site by ID: ", err);
        res.status(500).render("404", { page: "sites", message: `Error fetching site by ID: ${err.message}` });
    }
});

// Handle 404 errors for unmatched routes
app.use((req, res) => {
    res.status(404).render("404", { page: "error", message: "Page not found" });
});

// Initialize data service before starting server
dataService.initialize()
    .then(() => {
        console.log("Data service initialized successfully.");
    })
    .catch(err => {
        console.error("Failed to initialize data service: ", err);
    });

// Export the Express app as a serverless function handler
module.exports = app;
