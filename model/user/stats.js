(function() {

'use strict'

class Stats
{
  constructor(reputation, impact, helpful, buggy, total) {
    this.reputation = reputation;
    this.impact = impact;
    this.helpful = helpful;
    this.buggy = buggy;
    this.total = total;
  }
}

module.exports = Stats;

})();