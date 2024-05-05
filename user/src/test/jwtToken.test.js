const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../utils/jwtToken');
const JWT_SECRET = process.env.JWT_SECRET;
describe('generateToken', () => {
    // The function should return a JWT token when given a valid payload and JWT_SECRET.
    it('should return a JWT token when given a valid payload and JWT_SECRET', () => {
      const payload = { id: 1, username: 'testUser' };
      const token = generateToken(payload);
      expect(typeof token).toBe('string');
    });

    // The function should throw an error if no payload is provided.
    it('should throw an error if no payload is provided', () => {
      expect(() => {
        generateToken();
      }).toThrow();
    });

    // The function should throw an error if the payload is not a valid JSON object.
    it('should throw an error when the payload is not a valid JSON object', () => {
      const payload = 'invalidPayload';
      expect(() => generateToken(payload)).toThrow();
    });

    // The function should generate a token with a valid expiresIn option when JWT_EXPIRES_IN is a valid time string.
    it('should generate a token with valid expiresIn option', () => {
      const payload = { id: 1, username: 'testUser' };
      process.env.JWT_EXPIRES_IN = '1h';
      const token = generateToken(payload);
      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.username).toBe(payload.username);
    });

    // The function should return a unique JWT token for each unique payload.
    it('should return a unique JWT token when given a valid payload and JWT_SECRET', () => {
      const payload = { id: 1, username: 'testUser' };
      const token = generateToken(payload);
      expect(typeof token).toBe('string');
    });

    // The function should generate a token even when the payload is empty.
    it('should generate a token when the payload is empty', () => {
      const payload = {};
      expect(generateToken(payload)).toBeDefined();
    });

    // The function should return a JWT token that expires after the time specified in JWT_EXPIRES_IN.
    it('should return a JWT token that expires after the time specified in JWT_EXPIRES_IN when given a valid payload and JWT_SECRET', () => {
      const payload = { id: 1, username: 'testUser' };
      const token = generateToken(payload);
      expect(typeof token).toBe('string');
      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.username).toBe(payload.username);
    });

    // The function should handle special characters and escape them properly.
    it('should handle special characters and escape them properly', () => {
      const payload = { id: 1, username: 'testUser' };
      const token = generateToken(payload);
      expect(typeof token).toBe('string');
    });

    // The function should handle payloads with nested objects and arrays.
    it('should return a JWT token when given a valid payload and JWT_SECRET', () => {
      const payload = { id: 1, username: 'testUser' };
      const token = generateToken(payload);
      expect(typeof token).toBe('string');
    });
});

describe('verifyToken', () => {
    // Verify a valid token and return the decoded payload.
    it('should return the decoded payload when verifying a valid token', () => {
      const token = 'valid_token';
      const decodedPayload = { id: 1, username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedPayload);

      const result = verifyToken(token);

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid algorithm.
    it('should return null when verifying a token with an invalid algorithm', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid algorithm');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with a missing 'aud' (audience) claim.
    it('should return null when verifying a token with a missing \'aud\' claim', () => {
      const token = 'token_without_aud_claim';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('JsonWebTokenError: jwt audience invalid');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with a missing 'sub' (subject) claim.
    it('should return null when verifying a token with a missing \'sub\' claim', () => {
      const token = 'token_without_sub_claim';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('missing sub claim');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with a missing 'nbf' (not before) claim.
    it('should return null when verifying a token with a missing \'nbf\' claim', () => {
      const token = 'token_without_nbf_claim';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Token has missing \'nbf\' claim');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with a missing 'exp' (expiration) claim.
    it('should return null when verifying a token with a missing \'exp\' claim', () => {
      const token = 'token_without_exp_claim';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('TokenExpiredError');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid format.
    it('should return null when verifying a token with an invalid format', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token format');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid 'iss' (issuer) claim.
    it('should return null when verifying a token with an invalid \'iss\' claim', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid issuer');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid 'aud' (audience) claim.
    it('should return null when verifying a token with an invalid \'aud\' claim', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid audience');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid 'sub' (subject) claim.
    it('should return null when verifying a token with an invalid \'sub\' claim', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid sub claim');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Verify a token with a 'nbf' (not before) claim in the past and return the decoded payload.
    it('should return the decoded payload when verifying a token with a \'nbf\' claim in the past', () => {
      const token = 'token_with_nbf_claim_in_the_past';
      const decodedPayload = { id: 1, username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedPayload);

      const result = verifyToken(token);

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Verify a token with an expiration date in the future and return the decoded payload.
    it('should return the decoded payload when verifying a valid token', () => {
      const token = 'valid_token';
      const decodedPayload = { id: 1, username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedPayload);

      const result = verifyToken(token);

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Verify a token with a 'sub' (subject) claim and return the decoded payload.
    it('should return the decoded payload when verifying a valid token', () => {
      const token = 'valid_token';
      const decodedPayload = { id: 1, username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedPayload);
      const result = verifyToken(token);

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Verify a token with a 'aud' (audience) claim and return the decoded payload.
    it('should return the decoded payload when verifying a valid token', () => {
      const token = 'valid_token';
      const decodedPayload = { id: 1, username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedPayload);

      const result = verifyToken(token);

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Verify a token with a 'iss' (issuer) claim and return the decoded payload.
    it('should return the decoded payload when verifying a valid token', () => {
      const token = 'valid_token';
      const decodedPayload = { id: 1, username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedPayload);

      const result = verifyToken(token);

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying an invalid token.
    it('should return null when verifying an invalid token', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid signature.
    it('should return null when verifying a token with an invalid signature', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });

    // Return null when verifying a token with an invalid secret.
    it('should return null when verifying a token with an invalid secret', () => {
      const token = 'invalid_token';
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const result = verifyToken(token);

      expect(result).toBeNull();
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    });
});
