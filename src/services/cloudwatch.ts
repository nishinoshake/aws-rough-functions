import { parseFirstPrice, parseRange } from '@/lib/parser'

export default {
  metrics: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonCloudWatch',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype	:	'APN1-CW:MetricMonitorUsage',
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  api: {
    GetMetricData: {
      price: {
        params: {
          ServiceCode: 'AmazonCloudWatch',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype	:	'APN1-CW:GMD-Metrics',
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    GetMetricWidgetImage: {
      price: {
        params: {
          ServiceCode: 'AmazonCloudWatch',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype	:	'APN1-CW:GMWI-Metrics',
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    other: {
      price: {
        params: {
          ServiceCode: 'AmazonCloudWatch',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype	:	'APN1-CW:Requests',
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      },
      free: {
        manual: 1e6
      }
    },
  },
  alarm: {
    standard: {
      price: {
        params: {
          ServiceCode: 'AmazonCloudWatch',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype	:	'APN1-CW:AlarmMonitorUsage',
            alarmType	:	'Standard'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      },
      free: {
        manual: 10
      }
    },
    highResolution: {
      price: {
        params: {
          ServiceCode: 'AmazonCloudWatch',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype	:	'APN1-CW:HighResAlarmMonitorUsage',
            alarmType	:	'High Resolution'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
  },
  log: {
    collect: {
      price: {
        params: {
          ServiceCode: 'AmazonCloudWatch',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype	:	'APN1-DataProcessing-Bytes'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      },
      free: {
        manual: 5
      }
    }
  },
  dashboard: {
    price: {
      params: {
        ServiceCode: 'AmazonCloudWatch',
        Filters: {
          location: 'Any',
          usagetype	:	'DashboardsUsageHour-Basic'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    },
    free: {
      manual: 3
    }
  },
}
