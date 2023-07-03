const mongoose = require("mongoose");

const wordsSchema = new mongoose.Schema({
  language: {
    type: {
      english: {
        type: {
          word: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: false,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          example: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
      spanish: {
        type: {
          word: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: false,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          example: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
      french: {
        type: {
          word: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: false,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          example: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
      german: {
        type: {
          word: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: false,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          example: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
      italian: {
        type: {
          word: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: false,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          example: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
      portuguese: {
        type: {
          word: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: false,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          example: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
    },
  },
});

module.exports.Words = mongoose.model("Words", wordsSchema);
