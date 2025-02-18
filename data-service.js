const siteData = require("../data/NHSiteData");
const provinceAndTerritoryData = require("../data/provinceAndTerritoryData");

let sites = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            console.log("Initializing sites array...");
            sites = siteData.map(site => {
                const provinceOrTerritoryObj = provinceAndTerritoryData.find(
                    province => province.code === site.provinceOrTerritoryCode
                );
                return { ...site, provinceOrTerritoryObj };
            });
            console.log("Sites array initialized successfully.");
            resolve();
        } catch (error) {
            console.error("Error during initialization:", error);
            reject("Failed to initialize sites array: " + error);
        }
    });
}

function getAllSites() {
    return Promise.resolve(sites);
}

function getSiteById(id) {
    const site = sites.find(s => s.siteId === id);
    if (site) {
        return Promise.resolve(site);
    } else {
        return Promise.reject("Site not found");
    }
}

function getSitesByProvinceOrTerritoryName(name) {
    const sitesByProvince = sites.filter(s => {
        return (
            s.provinceOrTerritoryObj.name.toLowerCase().includes(name.toLowerCase())
        );
    });
    if (sitesByProvince.length > 0) {
        return Promise.resolve(sitesByProvince);
    } else {
        return Promise.reject("No sites found for the given province or territory");
    }
}

function getSitesByRegion(region) {
    const sitesByRegion = sites.filter(s => {
        return (
            s.provinceOrTerritoryObj.region.toLowerCase().includes(region.toLowerCase())
        );
    });
    if (sitesByRegion.length > 0) {
        return Promise.resolve(sitesByRegion);
    } else {
        return Promise.reject("No sites found for the given region");
    }
}

module.exports = { initialize, getAllSites, getSiteById, getSitesByProvinceOrTerritoryName, getSitesByRegion };
