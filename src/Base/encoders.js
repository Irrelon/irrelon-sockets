const jsonEncoder = {
	"name": "jsonEncoder",
	"encode": (data) => {
		if (data === undefined) return "";
		return JSON.stringify(data);
	},
	"decode": (data) => {
		if (data === undefined || data === null || data === "") return "";
		let decoded;

		try {
			decoded = JSON.parse(data);
		} catch (err) {
			decoded = "";
		}

		return decoded;
	}
};

const stringArrayEncoder = {
	"name": "stringArrayEncoder",
	"encode": (data = []) => {
		return data.join(",");
	},
	"decode": (data = "") => {
		return data.split(",");
	}
};

const booleanArrayEncoder = {
	"name": "booleanArrayEncoder",
	"encode": (data = []) => {
		return data.join(",");
	},
	"decode": (data = "") => {
		return data.split(",").map((value) => value === "true");
	}
};

const noDataEncoder = {
	"name": "noDataEncoder",
	"encode": () => {
		return undefined;
	},
	"decode": () => {
		return undefined;
	}
};

module.exports = {
	jsonEncoder,
	stringArrayEncoder,
	booleanArrayEncoder,
	noDataEncoder
};