const axios = require('axios')
const url = 'http://ingra01p1.dev.smf1.mobitv:3000'
const fs = require('fs')
console.log(process.env.ENV)
axios({
    method:'post',
    url:'http://ingra01p1.dev.smf1.mobitv:3000/api/ds/query',
    headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${process.env.GRAFANA_TOKEN}`
    },
    data:{
        "queries":[{"datasource":{"uid":"ueOmSTWVz","type":"prometheus"},"expr":"sum by (mode)(irate(node_cpu_seconds_total{mode=\"system\",instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"}[5m])) * 100","format":"time_series","interval":"10s","intervalFactor":2,"legendFormat":"System - Processes executing in kernel mode","refId":"A","step":20,"queryType":"timeSeriesQuery","exemplar":false,"requestId":"3A","utcOffsetSec":19800,"datasourceId":9,"intervalMs":3600000,"maxDataPoints":836},
                {
        "datasource": {
            "uid": "ueOmSTWVz",
            "type": "prometheus"
        },
        "expr": "node_memory_MemTotal_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"} - node_memory_MemFree_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"} - node_memory_Buffers_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"} - node_memory_Cached_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"} - node_memory_Slab_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"} - node_memory_PageTables_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"} - node_memory_SwapCached_bytes{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"}",
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
        "maxDataPoints": 836
    },
    {
        "datasource": {
            "uid": "ueOmSTWVz",
            "type": "prometheus"
        },
        "expr": "node_load1{instance=~\"juing01p1.dev.smf1.mobitv:9100\",job=~\"apache_exporter\"}",
        "format": "time_series",
        "intervalFactor": 4,
        "legendFormat": "Load 1m",
        "refId": "T",
        "step": 480,
        "queryType": "timeSeriesQuery",
        "exemplar": false,
        "requestId": "7A",
        "utcOffsetSec": 19800,
        "interval": "",
        "datasourceId": 9,
        "intervalMs": 3600000,
        "maxDataPoints": 836
    }],
        "range":{"from": "2023-07-26T06:01:24.776Z", "to": "2023-08-25T06:01:24.776Z", "raw": {"from": "now-30d", "to": "now"}},
        "from":"1690351284776",
        "to":"1692943284776"
    }
}).then(res=>{
    fs.writeFile('/code/output.json',JSON.stringify(res.data))
})