import { ParseArxivXml } from './XmlParser';
import { MockApiResponse } from './testing/MockApiResponse';

describe('XmlParser - ParseArxivXml', () => {
    it(`should parse the search result's query info correctly`, () => {
        const result = ParseArxivXml(MockApiResponse);

        expect(result).toEqual({
            articlesPerPage: 10,
            currentPage: 0,
            totalArticles: 120839
        });
    });
});