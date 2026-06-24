import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["STOCK_IN", "STOCK_OUT"],
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      required: true,
      enum: [
        "INITIAL_STOCK",
        "RESTOCK",
        "SALE",
        "DAMAGED",
        "RETURN",
        "ADJUSTMENT",
      ],
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const StockTransaction = mongoose.model(
  "StockTransaction",
  stockTransactionSchema
);

export default StockTransaction;