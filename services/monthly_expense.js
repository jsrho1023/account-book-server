class MonthlyExpense {
  constructor(mongoQuery, moment){
    this.query = mongoQuery;
    this.datetimeUtil = moment;
    this.collectionName = 'daily-expense';
  }

  * monthlyDateGenerator(startDate){
    yield startDate;
    const startDay = startDate.date()
    var nextDay = startDate.add(1, 'days');
    
    while(startDay !== nextDay.date()){
      yield nextDay;
      nextDay = nextDay.add(1, 'days');
    }
  }

  async getMonthlyExpense(startDate){
    const startDatetime = this.datetimeUtil(startDate);
    const endDatetime = this.datetimeUtil(startDate).add(1,'months');

    const query = {
      'datetime': {
        $gte: startDatetime.valueOf(),
        $lt: endDatetime.valueOf()
      }
    };

    var cursor = this.query.findAll(this.collectionName, query);
    cursor = cursor.sort('datetime', 1);

    var monthlyExpense = {};

    const monthlyIterator = this.monthlyDateGenerator(startDatetime);
    var day = monthlyIterator.next();
    
    while(!day.done){
      monthlyExpense[day.value.format('YYYY-MM-DD')] = 0;
      day = monthlyIterator.next();
    }

    while(await cursor.hasNext()){
      await cursor.next().then((doc) => {
        monthlyExpense[this.datetimeUtil(doc.datetime).format('YYYY-MM-DD')] += doc.consumption.amount;        
      }).catch((error)=>{
        if(error) {
          console.log(error);
          return { error: 'DB Error'};
        }
      })
    }

    return monthlyExpense;
  }
}

module.exports = MonthlyExpense