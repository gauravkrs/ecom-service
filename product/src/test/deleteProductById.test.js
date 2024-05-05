const { deleteProductById } = require("../controllers/productController");
const Product = require("../models/product");
describe('deleteProductById', () => {
    // Function successfully deletes a product with a valid productId
    it('should successfully delete a product with a valid productId', async () => {
      const req = {
        params: {
          productId: 'validProductId'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
      const product = { _id: 'validProductId' };
      Product.findByIdAndDelete = jest.fn().mockResolvedValue(product);

      await deleteProductById(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('validProductId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: product });
    });

    // Function throws an error when productId is not provided
    it('should throw an error when productId is not provided', async () => {
      const req = {
        params: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };

      // Mock the findByIdAndDelete method to return null
      Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });
});
