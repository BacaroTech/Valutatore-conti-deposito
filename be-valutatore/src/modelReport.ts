import mongoose from 'mongoose';

export const ReportSchema  = new mongoose.Schema({
    id: {
        required: true,
        type: Number,
        unique: true,
    },
    generatedAt: {
        required: true,
        type: Date,
        default: new Date(),
    },
    base: {
        required: true,
        type: Number
    }, 
    percentuale: {
        required: true,
        type: Number
    }, 
    anni: {
        required: true,
        type: Number
    },    
})


