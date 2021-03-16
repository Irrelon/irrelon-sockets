/**
 * Generates a new 16-character hexadecimal unique ID
 * @return {String} The id.
 */
const hexId = () => {
	this._idCounter++;
	return (this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16);
};

module.exports = {
	hexId
};