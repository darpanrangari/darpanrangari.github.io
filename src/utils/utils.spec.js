import {formatAsCurrency} from './utils';

describe('utils', ()=>{
    it('should check for if amount is returned in german locale',()=>{
        expect(formatAsCurrency(1234.00212)).toEqual("1,234.002")
    })
})
