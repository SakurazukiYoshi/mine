/**
 * @desc 财务信息
 */
const type={
    1:'个人',
    2:'企业'
};
const status={
    0:'申请提现',
    1:'已转帐',
    2:'未通过',
};

const blanks={
    '01':'中信银行',
    '02':'中国银行',
    '03':'中国农业银行',
    '04':'中国邮政储蓄银行',
    '05':'交通银行',
    '06':'中国建设银行',
    '07':'中国工商银行',
//    '08':'招商银行',
//    '09':'广东发展银行',
};

export default {
    namespaced: true,
    state: {
        type,
        status,
        blanks
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
}
