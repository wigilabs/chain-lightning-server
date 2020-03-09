import Cors from 'micro-cors'

const cors = Cors()

const superagent = require('superagent');
const handler = (req, res) => {
  let events
  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+%60_raw%60%2C%60_sourcetype%60%2C%60source%60+FROM+splunkUpdateLogs%2C+splunkApacheAccess%2C+splunkApacheErrors%2C+splunkAuthLogs%2C+splunkHttp%2C+splunkKernel%2C+splunkSystemctl+WHERE+%60_raw%60+NOT+LIKE+%27%25CRON%25%27+LIMIT+6+')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events;
      let name1=events[0]._sourcetype;
      let eval1=events[0]._raw;
      let value1=eval1.includes('not found or unable to stat') || eval1.includes('[:error]') || eval1.includes('deprecated') || eval1.includes('invalid') || eval1.includes('error') ? 0 : 1
      let name2=events[1]._sourcetype;
      let eval2=events[1]._raw;
      let value2=eval2.includes('not found or unable to stat') || eval2.includes('[:error]') || eval2.includes('deprecated') || eval2.includes('invalid') || eval2.includes('error') ? 0 : 1
      let name3=events[2]._sourcetype;
      let eval3=events[2]._raw;
      let value3=eval3.includes('not found or unable to stat') || eval3.includes('[:error]') || eval3.includes('deprecated') || eval3.includes('invalid') || eval3.includes('error') ? 0 : 1
      let name4=events[3]._sourcetype;
      let eval4=events[3]._raw;
      let value4=eval4.includes('not found or unable to stat') || eval4.includes('[:error]') || eval4.includes('deprecated') || eval4.includes('invalid') || eval4.includes('error') ? 0 : 1
      let name5=events[4]._sourcetype;
      let eval5=events[4]._raw;
      let value5=eval5.includes('not found or unable to stat') || eval5.includes('[:error]') || eval5.includes('deprecated') || eval5.includes('invalid') || eval5.includes('error') ? 0 : 1
      let name6=events[5]._sourcetype;
      let eval6=events[5]._raw;
      let value6=eval6.includes('not found or unable to stat') || eval6.includes('[:error]') || eval6.includes('deprecated') || eval6.includes('invalid') || eval6.includes('error') ? 0 : 1

      let parsed = [
        { name: name1,    value: value1,     msg: eval1 },
        { name: name2,    value: value2,     msg: eval2 },
        { name: name3,    value: value3,     msg: eval3 },
        { name: name4,    value: value4,     msg: eval4 },
        { name: name5,    value: value5,     msg: eval5 },
        { name: name6,    value: value6,     msg: eval6 }
      ]
      
      console.log(parsed);
      return res.json(parsed);
    });
};

export default cors(handler);
