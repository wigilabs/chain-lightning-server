const superagent = require('superagent');
const handler = (req, res) => {
  let events
  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT%20description%20FROM%20ZabbixAgent,%20ZabbixHTTP,%20ZabbixSSH%20limit%203')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {

      events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)

      let valueSSH  = (events[0].description.includes('is unreachable')) ? 0 : 1
      let valueHTTP = (events[1].description.includes('is unreachable')) ? 0 : 1
      let valueHost = (events[2].description.includes('is unreachable')) ? 0 : 1

      console.log('valueSSH: ', valueSSH)
      console.log('valueHTTP: ', valueHTTP)
      console.log('valueHost: ', valueHost)

      let ret = [
        {name: 'SSH',  value: valueSSH},
        {name: 'HTTP', value: valueHTTP},
        {name: 'Host', value: valueHost}
      ]
      return res.json(ret);
    });
};
export default handler;
