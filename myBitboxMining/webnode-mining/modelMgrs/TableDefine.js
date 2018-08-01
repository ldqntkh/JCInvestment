const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

/**
 * table historyofcustomer
 */
module.exports.CustomerHistoryTable = sequelize.define('historyofcustomer', {
    customerId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    description: Sequelize.STRING,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

/**
 * table customer
 */
module.exports.CustomerTable = sequelize.define('customer', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname:  Sequelize.STRING,
    active: Sequelize.INTEGER,
    phone: Sequelize.STRING,
    birthday: Sequelize.DATE,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});

/**
 * table locale
 */
module.exports.LocaleTable = sequelize.define('locale', {
    name: Sequelize.STRING
});

/**
 * table maintenance_fee
 */
module.exports.MaintenanceFeeTable = sequelize.define('maintenance_fee', {
    customerId: Sequelize.INTEGER,
    settlementDate: Sequelize.DATE,
    paymentDate:  Sequelize.DATE,
    paymentMethod: Sequelize.STRING,
    paymentStatus: Sequelize.INTEGER,
    totalPayment: Sequelize.FLOAT,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});


/**
 * table orders
 */
module.exports.OrderTable = sequelize.define('orders', {
    customerid : Sequelize.INTEGER,
    productname : Sequelize.STRING,
    hashrate : Sequelize.FLOAT,
    quantity : Sequelize.INTEGER,
    description : Sequelize.STRING,
    state : Sequelize.STRING,
    amount: Sequelize.FLOAT,
    currency : Sequelize.STRING,
    product_period : Sequelize.INTEGER,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

/**
 * table payment_details
 */
module.exports.PaymentDetailsTable = sequelize.define('payment_details', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    orderid : Sequelize.INTEGER,
    payment_method : Sequelize.STRING,
    email : Sequelize.STRING,
    firstname : Sequelize.STRING,
    lastname : Sequelize.STRING,
    payerid: Sequelize.STRING,
    countrycode : Sequelize.STRING,
    state : Sequelize.STRING,
    cart : Sequelize.STRING,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

/**
 * table product
 */
module.exports.ProductTable = sequelize.define('product', {
    sku : Sequelize.STRING,
    hashrate : Sequelize.FLOAT,
    period : Sequelize.INTEGER,
    userUpdate : Sequelize.INTEGER,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

/**
 * table pricebook
 */
module.exports.PricebookTable = sequelize.define('pricebook', {
    productId: Sequelize.INTEGER,
    localeId: Sequelize.STRING,
    name : Sequelize.STRING,
    price : Sequelize.FLOAT,
    sale_price : Sequelize.FLOAT,
    currency : Sequelize.STRING,
    maintenance_fee: Sequelize.FLOAT,
    symbol_currency : Sequelize.STRING,
    desc1 : Sequelize.STRING,
    desc2 : Sequelize.STRING,
    desc3 : Sequelize.STRING,
    enable : Sequelize.BOOLEAN
});

/**
 * table productofcustomer
 */
module.exports.ProductTableCustomer = sequelize.define('productofcustomer', {
    name: Sequelize.STRING,
    hashrate: Sequelize.FLOAT,
    customerId: Sequelize.INTEGER,
    walletId : Sequelize.INTEGER,
    active : Sequelize.BOOLEAN,
    expired : Sequelize.BOOLEAN,
    period : Sequelize.INTEGER,
    maintenance_fee: Sequelize.FLOAT,
    userUpdate : Sequelize.INTEGER,
    startDate : Sequelize.DATE,
    endDate : Sequelize.DATE,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

/**
 * table token
 */
module.exports.TokenTable = sequelize.define('token', {
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});

/**
 * table user
 */
module.exports.UserTable = sequelize.define('user', {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname:  Sequelize.STRING,
    userTypeId: Sequelize.INTEGER,
    phone: Sequelize.STRING,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});

/**
 * table wallet
 */
module.exports.WalletTable = sequelize.define('wallet', {
    walletAddress: Sequelize.STRING,
    walletName: Sequelize.STRING,
    walletTypeId : Sequelize.INTEGER,
    customerId : Sequelize.INTEGER,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});

/**
 * table walletbalance
 */
module.exports.WalletBalance = sequelize.define('walletbalance', {
    balance: Sequelize.FLOAT,
    walletId: Sequelize.INTEGER,
    userUpdate: Sequelize.INTEGER,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});