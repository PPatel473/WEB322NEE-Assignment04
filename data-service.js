const siteData = require("./data/NHSiteData.json");  // Import site data from JSON
const provinceAndTerritoryData = require("./data/provinceAndTerritoryData.json");  // Import province/territory data from JSON

let sites = [];  // Array to store combined site data

// Function to initialize the sites array by combining site data and province data
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            console.log("Initializing sites array...");

            // Map over the siteData and combine with corresponding provinceOrTerritory information
            sites = siteData.map(site => {
                // Find the corresponding province/territory data by matching the code
                const provinceOrTerritoryObj = provinceAndTerritoryData.find(
                    province => province.code === site.provinceOrTerritoryCode
                );

                // Return a new object that includes both site data and the province/territory object
                return { ...site, provinceOrTerritoryObj };
            });

            console.log("Sites array initialized successfully.");
            resolve();  // Resolve the promise once data is processed
        } catch (error) {
            console.error("Error during initialization:", error);
            reject("Failed to initialize sites array: " + error);  // Reject in case of error
        }
    });
}

// Function to get all sites
function getAllSites() {
    return Promise.resolve(sites);  // Return all sites as a resolved promise
}

// Function to get a site by its unique ID
function getSiteById(id) {
    const site = sites.find(s => s.siteId === id);  // Find site by siteId
    if (site) {
        return Promise.resolve(site);  // If found, return the site data
    } else {
        return Promise.reject("Site not found");  // Reject if site is not found
    }
}

// Function to get sites by the province or territory name
function getSitesByProvinceOrTerritoryName(name) {
    const sitesByProvince = sites.filter(s => {
        // Check if the name includes the given province or territory name (case insensitive)
        return s.provinceOrTerritoryObj.name.toLowerCase().includes(name.toLowerCase());
    });
    if (sitesByProvince.length > 0) {
        return Promise.resolve(sitesByProvince);  // Return sites matching the name
    } else {
        return Promise.reject("No sites found for the given province or territory");  // Reject if no sites found
    }
}

// Function to get sites by region
function getSitesByRegion(region) {
    const sitesByRegion = sites.filter(s => {
        // Check if the region matches the given region name (case insensitive)
        return s.provinceOrTerritoryObj.region.toLowerCase().includes(region.toLowerCase());
    });
    if (sitesByRegion.length > 0) {
        return Promise.resolve(sitesByRegion);  // Return sites matching the region
    } else {
        return Promise.reject("No sites found for the given region");  // Reject if no sites found
    }
}

// Export the functions so they can be used in other files
module.exports = {
    initialize,
    getAllSites,
    getSiteById,
    getSitesByProvinceOrTerritoryName,
    getSitesByRegion
};
