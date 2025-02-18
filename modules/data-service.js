// Import required data
const siteData = require("../data/NHSiteData");
const provinceAndTerritoryData = require("../data/provinceAndTerritoryData");

// Initialize an empty sites array
let sites = [];

// Function to initialize the sites array
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            sites = siteData.map(site => {
                const provinceOrTerritoryObj = provinceAndTerritoryData.find(
                    province => province.code === site.provinceOrTerritoryCode
                );
                return { ...site, provinceOrTerritoryObj };
            });
            resolve();
        } catch (error) {
            reject("Failed to initialize sites array: " + error);
        }
    });
}

// Function to get all sites
function getAllSites() {
    return new Promise((resolve, reject) => {
        if (sites.length > 0) {
            resolve(sites);
        } else {
            reject("No sites available. Make sure to initialize the data first.");
        }
    });
}

// Function to get a site by its ID
function getSiteById(id) {
    return new Promise((resolve, reject) => {
        const site = sites.find(site => site.siteId === id);
        if (site) {
            resolve(site);
        } else {
            reject(`Site with ID ${id} not found.`);
        }
    });
}

// Function to get sites by province or territory name
function getSitesByProvinceOrTerritoryName(name) {
    return new Promise((resolve, reject) => {
        const matchedSites = sites.filter(site =>
            site.provinceOrTerritoryObj.name.toLowerCase().includes(name.toLowerCase())
        );
        if (matchedSites.length > 0) {
            resolve(matchedSites);
        } else {
            reject(`No sites found for province or territory name containing "${name}".`);
        }
    });
}

// Function to get sites by region
function getSitesByRegion(region) {
    return new Promise((resolve, reject) => {
        const matchedSites = sites.filter(site =>
            site.provinceOrTerritoryObj.region.toLowerCase().includes(region.toLowerCase())
        );
        if (matchedSites.length > 0) {
            resolve(matchedSites);
        } else {
            reject(`No sites found for region containing "${region}".`);
        }
    });
}

// Export all functions as a module
module.exports = {
    initialize,
    getAllSites,
    getSiteById,
    getSitesByProvinceOrTerritoryName,
    getSitesByRegion
};
