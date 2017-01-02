var Xray = require('x-ray');
var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    reverse: function (value) {
      return typeof value === 'string' ? value.split('').reverse().join('') : value
    },
    slice: function (value, start , end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    },
    price: function (value) {
      return value.replace(/(<([^>]+)>)/ig,"").replace(/was|now|per case|Price/ig,"");
    }
  }
});

x('https://www.tesco.com/wine/product/browse/default.aspx?N=8132', {
  title: '#pageHeaders h1',
  items: x('#productListWrapper > div > ul.line li', [{
    title: 'div.desc > div.descContent > h3',
    price: x('div.desc > div.descContent > h3 > a@href', '.price | price | trim'),
    wasPrice: x('div.desc > div.descContent > h3 > a@href', '.wasPrice | price | trim'),
    nowPrice: x('div.desc > div.descContent > h3 > a@href', '.nowPrice | price | trim'),
    country: '.keyFacts dt:contains(\'Country\') + dd',
    region: '.keyFacts dt:contains(\'Region\') + dd',
    grape: '.keyFacts dt:contains(\'Grape\') + dd',
    vintage: '.keyFacts dt:contains(\'Vintage\') + dd',
    producer: '.keyFacts dt:contains(\'Producer\') + dd',
    winemaker: '.keyFacts dt:contains(\'Winemaker\') + dd',
    stopper: '.keyFacts dt:contains(\'Stopper\') + dd',
    ABV: '.keyFacts dt:contains(\'ABV\') + dd',
    tastingNotes: x('div.desc > div.descContent > h3 > a@href', '#detailsBox-1 h4 + p'),
    strength:  x('div.desc > div.descContent > h3 > a@href', '#detailsBox-1 h4 + p + ul > li:nth-child(2)'),
//     description: '.item-content section'
  }])
})(function(err, obj) {
  console.log(obj);
})
  .paginate('p.next a@href')
//   .limit(1)
  .write('results.json')