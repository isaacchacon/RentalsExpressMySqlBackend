var db = require('../dbconnection');
var Property = {

    allPropertyFields: `Property.idProperty,
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
    Property.zipCode`,
    allImageFields:"Images.imagePath, Images.order, Images.title, Images.description",
    getAllProperties:function(callback){
        return db.query('Select '+this.allPropertyFields+' from Property where status ="available"', callback);
    },

    getPropertyById:function(id, callback){
        return db.query('Select '+this.allPropertyFields+', '+this.allImageFields+' from Property  left join Images on Images.IdProperty = Property.idProperty where Property.idProperty=? and status ="available" order by Images.Order', [id], 
        function(err, rows){
            if(err||(!rows)||(!rows.length))
            callback(err,rows);
            else{
                let finalResult ={}
                //first populate external properties.
                for (var k in rows[0]) {
                    if((k=='order')||(k=='title'||k=='description'||k=='imagePath'))
                    continue;
                    if (!finalResult[k]) finalResult[k] = rows[0][k];
                 }
                finalResult.images = [];
                const response = rows.reduce((acc, row) => {
                    let imageObject = {};
                    if(row.imagePath){
                        imageObject.imagePath =row.imagePath;
                        imageObject.title = row.title;
                        imageObject.description = row.description;
                        acc.images.push(imageObject);
                    }
                      return acc;  
                }, finalResult);
                callback(err, response);
            }
        });
    }
}
module.exports = Property;