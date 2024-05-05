const { getAllProducts } = require("../controllers/productController");
const Product = require("../models/productModel");

describe('getAllProducts', () => {

    // Returns a list of all products when there are products in the database
    it('should return a list of all products when there are products in the database', async () => {
        const mockProduct = [{ name: 'Product 1' }, { name: 'Product 2' }];
        Product.find = jest.fn().mockResolvedValue(mockProduct);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        await getAllProducts({}, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ data: mockProduct });
    });

    // Returns a 500 status code when there is an error retrieving products from the database
    it('should return a 500 status code when there is an error retrieving products from the database', async () => {
        const mockError = new Error('Database error');
        Product.find = jest.fn().mockRejectedValue(mockError);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getAllProducts({}, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
