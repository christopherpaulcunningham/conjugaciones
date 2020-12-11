// A function to capitalise the first letter of each word in a string.
export default function capitaliseFirstLetterOfEachWord(string) {
	return string.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
