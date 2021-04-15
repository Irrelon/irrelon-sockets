const partsToMessage = ({commandId, data, channelName, requestId, requestName}) => {
	const delimiter = "|";

	if (requestId) return [commandId, data, channelName, requestId, requestName].join(delimiter);
	if (channelName) return [commandId, data, channelName].join(delimiter);

	return [commandId, data].join(delimiter);
};

const messageToParts = (message) => {
	const [commandId, data, channelName, requestId, requestName] = message.split("|");

	return {
		commandId,
		data,
		channelName,
		requestId,
		requestName
	};
};

const Message = (message) => {
	if (typeof message === "string") {
		return messageToParts(message);
	}

	return partsToMessage(message);
};

module.exports = Message;