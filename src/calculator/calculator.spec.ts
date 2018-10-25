import { expect } from 'chai';
import { describe, it } from 'mocha';

import { helloWorld } from './calculator';

describe('calculator', () => {
    it('should return "Hello, World!"', () => {
        expect(helloWorld()).to.equal('Hello, World!');
    });
});
