const superagent = require('superagent');

const handler = (req, res) => {

  let events

  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+*+FROM+NagiosReport+SINCE+5+minutes+ago')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)

      return res.json(events);
    });
};
export default handler;
