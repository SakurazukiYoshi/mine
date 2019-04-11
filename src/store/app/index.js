/**
 * @desc 各页面的vuex
 */

import home from './home'
import agent from './agent'
import resource from './resource'
import zone from './zone'
import report from './report'
import financial from './financial'

export default {
    namespaced: true,
    modules: {
        home,
        agent,
        resource,
        zone,
        report,
        financial
    }
}