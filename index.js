const axios = require('axios')
require('dotenv').config()
const url = 'http://ingra01p1.dev.smf1.mobitv:3000'
const fs = require('fs')
// open the output file in append mode
var stream = fs.createWriteStream('/code/output', {flags: 'a'});
const hosts = require('./hosts')
async function getValues(hosts,stream){
    const promises = hosts.map(async (host)=>{
        return await axios({
            method:'post',
            url:`${url}/api/ds/query`,
            headers:{
                'content-type':'application/json',
                'Authorization': `Bearer ${process.env.GRAFANA_TOKEN}`
            },
            data:{
                "queries":[{
                    "datasource": {
                      "uid": "ueOmSTWVz",
                      "type": "prometheus"
                    },
                    "expr": `sum by (mode)(irate(node_cpu_seconds_total{mode=\"system\",instance=~\"${host}:9100\",job=~\"node_exporter\"}[5m])) * 100`,
                    "format": "time_series",
                    "interval": "10s",
                    "intervalFactor": 2,
                    "legendFormat": "System - Processes executing in kernel mode",
                    "refId": "A",
                    "step": 20,
                    "queryType": "timeSeriesQuery",
                    "exemplar": false,
                    "requestId": "3A",
                    "utcOffsetSec": 19800,
                    "datasourceId": 9,
                    "intervalMs": 3600000,
                    "maxDataPoints": 509
                  },
                  {
                    "datasource": {
                      "uid": "ueOmSTWVz",
                      "type": "prometheus"
                    },
                    "expr": `node_memory_MemTotal_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"} - node_memory_MemFree_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"} - node_memory_Buffers_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"} - node_memory_Cached_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"} - node_memory_Slab_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"} - node_memory_PageTables_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"} - node_memory_SwapCached_bytes{instance=~\"${host}:9100\",job=~\"node_exporter\"}`,
                    "format": "time_series",
                    "hide": false,
                    "intervalFactor": 2,
                    "legendFormat": "Apps - Memory used by user-space applications",
                    "refId": "Q",
                    "step": 240,
                    "queryType": "timeSeriesQuery",
                    "exemplar": false,
                    "requestId": "24Q",
                    "utcOffsetSec": 19800,
                    "interval": "",
                    "datasourceId": 9,
                    "intervalMs": 3600000,
                    "maxDataPoints": 509
                  }
                ],
                "range":{"from": "2023-07-26T06:01:24.776Z", "to": "2023-08-25T06:01:24.776Z", "raw": {"from": "now-30d", "to": "now"}},
                "from":"1690636835601",
                "to":"1693228835601"
            }
        })
    })
    console.log(promises)
    const resolved = await Promise.allSettled(promises)
    console.log(resolved)
    await resolved.forEach((res,i)=>{
        const out={
            'A':res.data.results.A.frames[0].data.values[1].sort(function (a, b) {  return b-a;  }),
            'Q':res.data.results.Q.frames[0].data.values[1].sort(function (a, b) {  return b-a;  })
        }
        //console.log(out);
        const mem = out['Q'][0]/1073741824
        const cpu = out['A'][0]
        const final = `${hosts[i]}  => max-cpu-kernel: ${cpu.toPrecision(4)} mem-apps: ${mem.toPrecision(4)} \n`
        console.log(final)
        stream.write(final)
    })
    stream.end()
}
getValues(hosts,stream)