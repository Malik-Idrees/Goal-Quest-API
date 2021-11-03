import mongoose from 'mongoose'

const userProfileSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        profession: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
            default: 'beginner',
        },
        weekltime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const userProfile = mongoose.model('UserProfile', userProfileSchema)

export default userProfile
