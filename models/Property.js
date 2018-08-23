var db = require('../dbconnection');
var Property = {

    allFields: `Property.idProperty,
    Property.name,
    Property.status,
    Property.address,
    Property.bedrooms,
    Property.colonia,
    Property.delegacion,
    Property.floor,
    Property.floorPlanPath,
    Property.googleMapsLocation,
    Property.mainImagePath,
    Property.surfaceArea,
    Property.otherFeatures,
    Property.parkingSpaces,
    Property.parkingDescription,
    Property.propertyGroup,
    Property.salesDescription,
    Property.zipCode `,
    getAllProperties:function(callback){
        return db.query('Select '+this.allFields+' from Property where status ="available"', callback);
    },
    getPropertyById:function(id, callback){
        return db.query('Select '+this.allFields+' from Property where idProperty=? and status ="available"', [id], callback);
    }
}
module.exports = Property;