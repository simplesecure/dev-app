// Differentiate events from our different sites:
//   MKT - Marketing
//   DAS - Developer Dashboard
//   HLO - Hello App
//
const EVENT_PREFIX = 'DAS'
const SIMPLE_ID_AMPLITUDE_VERSION = '1.0.1'


class AmplitudeHelper {
  constructor(theQueryParams, anAmplitudeObj) {
    this.eventPrefix = EVENT_PREFIX

    this.sourceEventProperties = {}
    if (theQueryParams && theQueryParams.hasOwnProperty('tCode')) {
      this.sourceEventProperties['t_code'] = theQueryParams['tCode']
    }
    if (theQueryParams && theQueryParams.hasOwnProperty('sCode')) {
      this.sourceEventProperties['s_code'] = theQueryParams['sCode']
    }

    this.amplitudeObj = anAmplitudeObj
    this.amplitudeObj.getInstance().setVersionName(SIMPLE_ID_AMPLITUDE_VERSION)
  }

  getInstance() {
    return this.amplitudeObj.getInstance()
  }

  getEventName(anEventName) {
    const eventName = `${this.eventPrefix} ${anEventName}`
    if (process.env.NODE_ENV === 'development') {
      console.log(`DBG: Amplitude Event Name - ${eventName}`)
    }
    return eventName
  }

  getEventProperties(theEventProperties={}) {
    // All events have source properties attached now, so merge those in.
    const mergedEventProperties =
        Object.assign(theEventProperties, this.sourceEventProperties)

    if (process.env.NODE_ENV === 'development') {
      console.log(`DBG: Amplitude Event Props - ${JSON.stringify(mergedEventProperties)}`)
    }
    return mergedEventProperties
  }
}

// TODO: should probably be a singleton.
export default AmplitudeHelper;
