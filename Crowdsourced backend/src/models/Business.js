import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['restaurant', 'cafe', 'shop', 'service', 'other']
    },
    location: {
        type: String,
        required: true
    },
    phone: String,
    image: String,
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

businessSchema.index({ category: 1 });
businessSchema.index({ location: 1 });
businessSchema.index({ averageRating: -1 });

const Business = mongoose.model('Business', businessSchema);

export default Business;
