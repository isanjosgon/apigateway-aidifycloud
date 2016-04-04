(function() {

'use strict';

const Stats = require('./stats');

module.exports.statsfromjson = function(json){

	return new Stats(json['reputation'], json['impact'], json['helpful'], json['buggy'], json['total']);
}

})();