const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tax', { useNewUrlParser: true });

const { getCnpj, saveCoupom } = require('./services/tax-service');

const express = require('express');
const app = express();
const port = 3000;

app.get('/cnpj/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj;
  console.log('cnpj', cnpj);

  const company = await getCnpj(cnpj);
  return res.send(company);
});

app.get('/tax', async (req, res) => {
  const coupom = await saveCoupom(
    'http://nfce.sefaz.pe.gov.br/nfce/consulta?p=26190943283811010546650010002673391002673460%7C2%7C1%7C1%7CFD587490389412D0FB44CC0A11A74FBA56B47754',
  );
  return res.send(coupom);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
