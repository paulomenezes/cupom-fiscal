const got = require('got');
const cheerio = require('cheerio');

const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({ attributeMode: false });

const CompanySchema = require('../models/company-schema');
const CoupomSchema = require('../models/coupom-schema');

const getCnpj = async cnpj => {
  console.log('cnpj', cnpj);

  try {
    const company = await CompanySchema.findOne({ cnpj }).exec();

    if (company) {
      return company;
    } else {
      const response = await got(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, { json: true });

      if (response.body && response.body.status !== 'ERROR') {
        console.log(response.body);
        const company = new CompanySchema({
          ...response.body,
          cnpj,
        });

        company.save();

        return company;
      } else {
        console.log(response.body);
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const saveCoupom = async url => {
  console.log('url', url);

  try {
    const response = await got(url);
    const $ = cheerio.load(response.body);
    const cnpj = $('cnpj').html();

    // console.log($.html());
    console.log(cnpj);

    const company = await getCnpj(cnpj);

    parser.xmlToJson($('infnfe').html(), (error, json) => {
      console.log(error, json);
      json['company'] = json['emit'];
      delete json['emit'];
      const coupom = new CoupomSchema(json);

      coupom.save();
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getCnpj,
  saveCoupom,
};
