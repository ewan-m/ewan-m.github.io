import { ParseArxivXml } from './XmlParser';
import { MockApiResponse } from './testing/MockApiResponse';

describe('XmlParser - ParseArxivXml', () => {
    describe('parsing the search query info', () => {
        it('should parse the articles per page', () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.articlesPerPage).toBe(10);
        });

        it('should parse the currentPage', () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.currentPage).toBe(0);
        });

        it('should parse the totalArticles', () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.totalArticles).toBe(120839);
        });
    });

    describe('parsing articles', () => {
        it('should define the articles field', () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.articles).toBeDefined();
        });

        it('should make the articles field an array with length greater than 0', () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.articles).toBeInstanceOf(Array);
            expect(result.articles.length).toBeGreaterThan(0);
        });

        it(`should parse the first article correctly`, () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.articles[0]).toEqual({
                published: '2015-01-21T02:41:55Z',
                authors: ['Yangyong Zhu', 'Yun Xiong'],
                title: 'Defining Data Science',
                summary: `  Data science is gaining more and more and widespread attention, but no
consensus viewpoint on what data science is has emerged. As a new science, its
objects of study and scientific issues should not be covered by established
sciences. Data in cyberspace have formed what we call datanature. In the
present paper, data science is defined as the science of exploring datanature.
`,
                primaryCategory: 'cs.DB',
                secondaryCategories: ['cs.DB', 'cs.CY'],
                pdfHref: 'http://arxiv.org/pdf/1501.05039v1'
            });
            expect(result.articles[0].doi).toBeUndefined();
        });

        it('should parse all the published dates in the correct order', () => {
            const result = ParseArxivXml(MockApiResponse);

            const allPublishedDates = result.articles.map(article => article.published);
            const expectedPublishedDates = [
                '2015-01-21T02:41:55Z',
                '2015-03-03T23:35:54Z',
                '2002-10-01T13:23:14Z',
                '2008-08-05T12:22:38Z',
                '2008-08-05T12:37:52Z',
                '2008-08-05T12:47:23Z',
                '2007-05-09T21:56:15Z',
                '2018-02-07T22:21:43Z',
                '2005-07-12T16:41:57Z',
                '2013-12-22T07:55:13Z'
            ];

            expect(expectedPublishedDates).toEqual(allPublishedDates);
        });

        it(`should parse the last article correctly`, () => {
            const result = ParseArxivXml(MockApiResponse);

            expect(result.articles[result.articles.length - 1]).toEqual({
                published: '2013-12-22T07:55:13Z',
                authors: ['Amelia Carolina Sparavigna'],
                title: 'The Science of al-Biruni',
                summary: `  Al-Biruni (973-1048) was one of the greatest scientists of all times. He was
an astronomer, mathematician and philosopher, and studied physics and natural
sciences. In this paper, we will discuss some of his experimental methods and
some instruments he used.
`,
                doi: '10.18483/ijSci.364',
                journal: 'International Journal of Sciences 2(12), 52-60, 2013',
                primaryCategory: 'physics.hist-ph',
                secondaryCategories: ['physics.hist-ph'],
                pdfHref: 'http://arxiv.org/pdf/1312.7288v1'
            });
        });
    });
});