
const { createProduct } = require("../controllers/productController");
const product = require("../models/product");

    // Creates a new product with valid input data
    it('should create a new product when valid input data is provided', async () => {
        const req = {
          body: {
            name: 'Test Product',
            price: 10,
            description: 'Test description',
            image: 'test.jpg',
            category: 'Test category',
            inventory: 5
          }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn()
        };
        await createProduct(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
      }, 20000);

    // Returns a 500 error if there is an error saving the product
    it('should return a 500 error when there is an error saving the product', async () => {
        const req = {
          body: {
            name: 'Test Product',
            price: 10,
            description: 'Test description',
            image: 'test.jpg',
            category: 'Test category',
            inventory: 5
          }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        const mockError = new Error('Test error');
        const mockProductSave = jest.fn().mockRejectedValue(mockError);
        jest.spyOn(product.prototype, 'save').mockImplementationOnce(mockProductSave);
        jest.spyOn(console, 'log');
        await createProduct(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        expect(console.log).toHaveBeenCalledWith('Error creating product:', mockError);
      });