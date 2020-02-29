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

      console.log('valueSSH: ', valueSSH, 'msg:', events[0].description)
      console.log('valueHTTP: ', valueHTTP, 'msg:', events[1].description)
      console.log('valueHost: ', valueHost, 'msg:', events[2].description)

      let ret = [
        {name: 'SSH',  value: valueSSH, msg: events[0].description},
        {name: 'HTTP', value: valueHTTP, msg: events[1].description},
        {name: 'Host', value: valueHost, msg: events[2].description}
      ]
      return res.json(ret);
    });
};
export default handler;
