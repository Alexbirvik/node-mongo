const {Schema, model} = require('mongoose')

const schema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = model('Text', schema)