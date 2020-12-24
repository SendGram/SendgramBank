const mongoose = require('mongoose');
const crypto = require('crypto');

const resetPasswordSchema = new mongoose.Schema({
    resetToken: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
});

resetPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });

resetPasswordSchema.statics = {
    async generate(user) {
        const userId = user._id;
        const resetToken = crypto.randomBytes(4).toString('hex');
        const resetTokenObj = new ResetTokenPassword({
            resetToken,
            userId,
        });
        await resetTokenObj.save();
        return resetTokenObj;
    },
};

const ResetTokenPassword = mongoose.model('ResetTokenPassword', resetPasswordSchema);
module.exports = ResetTokenPassword;