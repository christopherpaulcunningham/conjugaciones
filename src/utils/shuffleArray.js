// A method to shuffle the array using Richard Durstenfeld's algorithm. This method picks a random element
// for each original array element, and excludes it from the next draw.
export default function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
