var URL = require('url');
var myURL = 'https://localhost:4001';
const myURLQ = URL.parse(myURL, true)

var constants = {
    messageKyes: {
        code_200 : 'Success',
        code_402 : 'Incomplete data.',
        code_500 : 'Internal server error.'
    }
};

var stripeKeys = {
	//skKey: "sk_test_YAOabvUScrHlzlW5I8WUFo2H"tok_1BmNkrBTjXsNpgZTcBzsZpo9
	//skKey: "sk_test_3HDYh1Y6eMg0fiddgxhRtlt5"
	skKey: "sk_test_P5puD96zqrusnZlm6qgxx2Xm"
	
};
module.exports = {
	constants: constants,
	myURLQ : myURLQ,
	stripeKeys: stripeKeys
}
