const schedule = require('node-schedule');
const moment = require('moment');
// import class manager
const WithdrawEthManager = require('../modelMgrs/WithdrawEthManager');
const rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 0;
rule.second = 0;

// gửi email thông báo đến admin
var UpdateStatusRequestWithdraw = {
    ScheduleUpdate : null,
    updateStatusRequest: async(withdraw) => {
        try {
            withdraw.setStatus(2);
            withdraw.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            WithdrawEthManager.updateWithdrawEth(withdraw);
        } catch (err) {
            console.log(err.message);
        }
    },

    execute: async ()=> {
        UpdateStatusRequestWithdraw.ScheduleUpdate = schedule.scheduleJob(rule, async function(){
            // quét tất cả các request với status là create - 1
            let dataResult = await WithdrawEthManager.getAllWithDrawWithField({
                status : 1
            });
            for (let i = 0; i < dataResult.length ; i++) {
                UpdateStatusRequestWithdraw.updateStatusRequest(dataResult[i]);
            }
        });
    }
}

module.exports = UpdateStatusRequestWithdraw;