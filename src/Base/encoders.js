const jsonEncoder = {
	"encode": (data) => {
		return JSON.stringify(data);
	},
	"decode": (data) => {
		return JSON.parse(data);
	}
};

const stringArrayEncoder = {
	"encode": (data) => {
		return data.join(",");
	},
	"decode": (data) => {
		return data.split(",");
	}
};

module.exports = {
	jsonEncoder,
	stringArrayEncoder
};