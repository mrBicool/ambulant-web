/* This is the format of data to be send for order adding/updating */
{
    "instruction" : "",
    "is_take_out" : true/false,
    "head_counts : {
        "regular" : 0,
        "senior" : 0,
        "pwd" : 0
    },
    "items" : [
        { 
            "product_id" : 1,
            "name" : "",
            "price" : 0.00,
            "qty" : 1,
            "main_product_id" : 1,
            "main_product_component_id" : 1,
            "main_product_component_qty" : 1,
            "total" : 1
        },
    ],
    "loyalty" : {
        "type" : "",
        "identification":"",
        "name"
    }
}
/* =====E N D===== */