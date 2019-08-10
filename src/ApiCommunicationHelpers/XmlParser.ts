import { ParsedResponse } from './types/ParsedResponse';


export function ParseArxivXml(rawXmlResponse: string): ParsedResponse {
    return {
        articlesPerPage: Number(getValue(rawXmlResponse, 'itemsPerPage')),
        currentPage: Number(getValue(rawXmlResponse, 'startIndex')),
        totalArticles: Number(getValue(rawXmlResponse, 'totalResults'))
    };
}

function getValue(rawXml: string, xmlPropertyName: string) {
    const xmlProperty = rawXml.split(xmlPropertyName)[1];

    return xmlProperty.slice(xmlProperty.indexOf('>') + 1, xmlProperty.indexOf('<'));
}