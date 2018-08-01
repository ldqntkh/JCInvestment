const schedule = require('node-schedule');
const moment = require('moment');
// import class manager
const CustomerManager = require('../modelMgrs/CustomerManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');
const MaintenanceFeeManager = require('../modelMgrs/MaintenanceFeeManager');

// import model
const MaintenanceFeeModel = require('../models/MaintenanceFee');

const rule = new schedule.RecurrenceRule();
rule.date = 28;
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

var CalculationMaintainFee = {

    updateMaintainFee: async(customerId) => {
        try {
            let productOfCustomers = await ProductOfCustomerManager.getListProductOfCustomer({
                customerId : req.session.customer.id
            });
            if (productOfCustomers.length > 0) {
                // get total fee;
                var totalfee = 0;
                for(let i = 0; i < productOfCustomers.length; i++) {
                    let item = productOfCustomers[i];
                    if (item.active && item.maintenance_fee > 0) {
                        if (item.startDate === null || item.endDate === null)
                            totalfee += item.maintenance_fee;
                        else {
                            let fee;
                            let start = moment(item.startDate, "MM/DD/YYYY").toDate();
                            let now = momemt(Date.now(), "DD/MM/YYYY").toDate();
                            let diff = (now - start) / 86400000;
                            if (diff >= 30) diff = 30;

                            totalfee = (item.maintenance_fee / 30) * diff;
                        }
                    }
                }
                // insert maintain table
                let maintainObj = new MaintenanceFeeModel({
                    customerId : customerId,
                    maturity : moment(Date.now(), "DD/MM/YYYY").add(7, 'days'),
                    payment_amount: totalfee,
                    currency: 'USD',
                    symbol_currency: '$',
                    status: false,
                    createAt: momemt(Date.now(), "DD/MM/YYYY")
                });
                MaintenanceFeeManager.insertRecord(maintainObj);
            }
        } catch (err) {
            console.log(err.message)
        }
    },

    execute: async ()=> {
        JobUpdateBalance.UpdateWalletBalance = schedule.scheduleJob(rule, async function(){
            let customers = await CustomerManager.getListCustomer();
        
            if(customers !== null && customers.length > 0) {
                for(let index = 0; index < customers.length; index ++) {
                    CalculationMaintainFee.updateBalanceForCustomer(customers[index].id);
                }
            }
        });
    }
}

module.exports = CalculationMaintainFee;