import { ParsedResponse } from './interfaces/ParsedResponse';
import { Article } from './interfaces/Article';

export function parseArxivXml(rawXmlResponse: string): ParsedResponse {
    const articlesPerPage = Number(getValue(rawXmlResponse, 'itemsPerPage'));
    const currentPage = Number(getValue(rawXmlResponse, 'startIndex'));
    const totalArticles = Number(getValue(rawXmlResponse, 'totalResults'));
    const articles = totalArticles > 0 ? getArticles(rawXmlResponse, Math.min(totalArticles, articlesPerPage)) : null;

    return {
        articlesPerPage, currentPage, totalArticles, articles
    };
}

function getArticles(rawXml: string, articlesToParse: number): Array<Article> {
    const articles: Array<Article> = [];
    let articleStartIndex = rawXml.indexOf('<entry>');
    let xmlLeftToParse = rawXml.substring(articleStartIndex);

    while (articlesToParse > 0) {
        const articleEndIndex = xmlLeftToParse.indexOf('</entry>');
        const articleXml = xmlLeftToParse.substring(0, articleEndIndex);

        articles.push(removeFieldsWhichEqual({
            published: getValue(articleXml, 'published'),
            authors: getAllTagValues(articleXml, 'author', 'name', getValue),
            title: getValue(articleXml, 'title'),
            summary: getValue(articleXml, 'summary'),
            primaryCategory: getAttributeValue(getXmlElement(articleXml, 'arxiv:primary_category'), 'term'),
            secondaryCategories: getAllTagValues(articleXml, 'category', 'term', getAttributeValue),
            doi: getValue(articleXml, 'arxiv:doi'),
            pdfHref: getAttributeValueWithAttributeMatcher(articleXml, 'link', 'href', 'title', 'pdf'),
            journal: getValue(articleXml, 'arxiv:journal_ref')
        }, ''));

        xmlLeftToParse = xmlLeftToParse.substring(articleEndIndex + '</entry>'.length);
        articlesToParse--;
    }

    return articles;
}

function removeFieldsWhichEqual(object: any, value: any): any {
    Object.keys(object).forEach(key => object[key] === value && delete object[key]);
    return object;
}

function getValue(articleXml: string, tagName: string): string {
    try {
        const xmlElement = articleXml.split(tagName)[1];
        return xmlElement.slice(xmlElement.indexOf('>') + 1, xmlElement.indexOf('<'));
    } catch (error) {
        return '';
    }
}

function getXmlElement(articleXml: string, tagName: string) {
    try {
        return articleXml.split(tagName)[1];
    } catch (error) {
        return '';
    }
}

function getAttributeValue(xmlElement: string, attributeName: string): string {
    try {
        const attributeValueStart = xmlElement.substring(xmlElement.indexOf(attributeName) + attributeName.length + 2);
        return attributeValueStart.substring(0, attributeValueStart.indexOf('"'));
    } catch (error) {
        return '';
    }
}

function getAttributeValueWithAttributeMatcher(
    articleXml: string,
    tagName: string,
    desiredAttrName: string,
    matcherAttrName: string,
    matcherAttrValue: string
): string {
    try {
        return articleXml.split(`<${tagName}`)
            .slice(1)
            .map(linkText => {
                return {
                    attrName: getAttributeValue(linkText, matcherAttrName),
                    attrValue: getAttributeValue(linkText, desiredAttrName)
                };
            })
            .filter(link => link.attrName === matcherAttrValue)[0].attrValue;
    } catch (error) {
        return '';
    }
}

function getAllTagValues(articleXml: string, tagName: string, matcherName: string, extractorFunction: Function): Array<string> {
    return articleXml.split(`<${tagName}`)
        .slice(1)
        .map(elementText => extractorFunction(elementText, matcherName));
}