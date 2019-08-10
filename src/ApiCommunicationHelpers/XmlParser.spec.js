import { ParseArxivXml } from './XmlParser;'

describe('XmlParser - ParseArxivXml', () => {
    it('should return an object', () => {
        const result = ParseArxivXml('');

        expect(result).toEqual({});
    });
});