import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true
        },
    description: { 
        type: String,
        required: true
    },
    criteria: { 
        type: String,
        required: true
    }, // like - web dev
    icon: { type: String }, // URL for the badge image
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
