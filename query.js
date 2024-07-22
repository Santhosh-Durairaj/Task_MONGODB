db.products.find({})

db.products.find({
    product_price: { $gte: 400, $lte: 800 }
})

db.products.find({
    product_price: { $not: { $gte: 400, $lte: 600 } }
})

db.products.find({
    product_price: { $gt: 500 }
}).limit(4)

db.products.find({}, {
    product_name: 1,
    product_material: 1,
    _id: 0
})

db.products.find({
    id: "10"
})

db.products.find({}, {
    product_name: 1,
    product_material: 1,
    _id: 0
})

db.products.find({
    product_material: "Soft"
})

db.products.find({
    product_color: "indigo",
    product_price: 492.00
})

var duplicates = db.products.aggregate([
    {
        $group: {
            _id: "$product_price",
            count: { $sum: 1 },
            ids: { $push: "$_id" }
        }
    },
    {
        $match: {
            count: { $gt: 1 }
        }
    }
]).toArray();


duplicates.forEach(function(doc) {
    doc.ids.shift(); // Keep one document
    db.products.deleteMany({
        _id: { $in: doc.ids }
    });
});