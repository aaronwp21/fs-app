import mongoose from 'mongoose';
import '../products/model';
const { Schema } = mongoose;

export const orderSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  receiptURL: {
    type: String,
    required: true,
  },
});

const Order = mongoose?.models?.Order || mongoose.model('Order', orderSchema);
export default Order;
