class MonthlyExpense {
  constructor(mongoQuery, moment){
    this.query = mongoQuery;
    this.datetimeUtil = moment;
    this.collectionName = 'daily-expense';
  }

  getMonthlyExpense(startDate){
    const startDatetime = this.datetimeUtil(startDate);
    const endDatetime = startDatetime.add(1,'months');

    const query = {
      'datetime': {
        $gte: startDatetime,
        $lt: endDatetime
      }
    };
    const cursor = this.query.findAll(this.collectionName, query);
    
    return cursor.toArray();
  }
}

module.exports = MonthlyExpense