const { getProductById } = require("../controllers/productController");
const Product = require("../models/product");

describe('getProductById', () => {
    // Retrieves a product by its ID and returns it as JSON with a 200 status code.
    it('should retrieve a product by its ID and return it as JSON with a 200 status code', async () => {
      const req = {
        params: {
          productId: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
      const product = { id: '123', name: 'Test Product' };
      Product.findById = jest.fn().mockResolvedValue(product);

      await getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: product });
      expect(res.json).not.toHaveBeenCalled();
    });

    // Returns a 500 status code and an error message if an error occurs while fetching the product.
    it('should return a 500 status code and an error message if an error occurs while fetching the product', async () => {
      const req = {
        params: {
          productId: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
      const error = new Error('Internal server error');
      Product.findById = jest.fn().mockRejectedValue(error);

      await getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
      expect(res.send).not.toHaveBeenCalled();
    });
});
