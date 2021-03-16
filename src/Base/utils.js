let _idCounter = 0;

/**
 * Generates a new 16-character hexadecimal unique ID
 * @return {String} The id.
 */
const hexId = () => {
	_idCounter++;
	return (_idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16);
};

module.exports = {
	hexId
};