import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productosCollection = "productos";
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    thumbnails: {
        type: [String]
    },
});

productSchema.plugin(mongoosePaginate)



const ProductModel = mongoose.model(productosCollection, productSchema)


export default ProductModel;