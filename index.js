const axios = require('axios')
require('dotenv').config()
const url = 'http://ingra01p1.dev.smf1.mobitv:3000'
const fs = require('fs')
const hosts = require('./hosts')
console.log(process.env.GRAFANA_TOKEN)
axios({
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
            "expr": "sum by (mode)(irate(node_cpu_seconds_total{mode=\"system\",instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"}[5m])) * 100",
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
            "expr": "node_memory_MemTotal_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"} - node_memory_MemFree_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"} - node_memory_Buffers_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"} - node_memory_Cached_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"} - node_memory_Slab_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"} - node_memory_PageTables_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"} - node_memory_SwapCached_bytes{instance=~\"biehd01p1.dev.smf1.mobitv:9100\",job=~\"node_exporter\"}",
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
        "from":"1690351284776",
        "to":"1692943284776"
    }
}).then(res=>{
    const out={
        'A':res.data.results.A.frames[0].data.values[1].sort(function (a, b) {  return b-a;  }),
        'Q':res.data.results.Q.frames[0].data.values[1].sort(function (a, b) {  return b-a;  })
    }
    console.log(out);
    const final = `biehd01p1.dev.smf1.mobitv  => max-cpu-kernel: ${out['A'][0]} mem-apps: ${out['Q'][0]/1073741824} \n`
    console.log(final);
    fs.writeFile('/code/output',final,err => {
        if (err) {
          console.error(err);
        }
    })
})