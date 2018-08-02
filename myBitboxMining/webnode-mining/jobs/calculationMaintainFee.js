const schedule = require('node-schedule');
const moment = require('moment');
// import class manager
const CustomerManager = require('../modelMgrs/CustomerManager');
const ProductOfCustomerManager = require('../modelMgrs/ProductOfCustomerManager');
const MaintenanceFeeManager = require('../modelMgrs/MaintenanceFeeManager');

// import model
const MaintenanceFeeModel = require('../models/MaintenanceFee');

const rule = new schedule.RecurrenceRule();
rule.date = 28;
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

var CalculationMaintainFee = {
    ScheduleMaintainFee : null,
    updateMaintainFee: async(customerId) => {
        try {
            let productOfCustomers = await ProductOfCustomerManager.getListProductOfCustomer({
                customerId : customerId
            });
            if (productOfCustomers.length > 0) {
                // get total fee;
                var totalfee = 0;
                for(let i = 0; i < productOfCustomers.length; i++) {
                    let item = productOfCustomers[i];
                    if (item.active && item.maintenance_fee > 0 && !item.expired) {
                        if (item.startDate === null)
                            totalfee += item.maintenance_fee;
                        else {
                            var fee;
                            let start = moment(item.startDate, "DD/MM/YYYY").toDate();
                            let now = Date.now();
                            let diff = Math.ceil((now - start) / 86400000);
                            if (diff >= 30) diff = 30;
                            fee = (item.maintenance_fee / 30) * diff;
                            fee = Math.round(fee * 100)/100;
                            totalfee += fee;
                        }
                    }
                }
                // insert maintain table
                let maintainObj = new MaintenanceFeeModel({
                    customerId : customerId,
                    maturity : moment(Date.now()).add(7, 'days').format('YYYY-MM-DD'),
                    payment_amount: totalfee,
                    currency: 'USD',
                    symbol_currency: '$',
                    status: false,
                    createAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                });
                MaintenanceFeeManager.insertRecord(maintainObj);
            }
        } catch (err) {
            console.log(err.message)
        }
    },

    execute: async ()=> {
        CalculationMaintainFee.ScheduleMaintainFee = schedule.scheduleJob(rule, async function(){
            let customers = await CustomerManager.getListCustomer();
            if(customers !== null && customers.length > 0) {
                for(let index = 0; index < customers.length; index ++) {
                    CalculationMaintainFee.updateMaintainFee(customers[index].id);
                }
            }
        });
    }
}

module.exports = CalculationMaintainFee;