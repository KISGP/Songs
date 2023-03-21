function handlePeopleCount(people: string | number): string {
	if (typeof people == "number") {
		people = people.toString();
	}
	let length: number = people.length;
	let count: number = parseInt(people);
	let result: string = "";

	if (length <= 4) {
		result = count.toString();
	} else if (length >= 5 && length <= 6) {
		result = Math.floor((count / 10000) * 10) / 10 + "万";
	} else if (length == 7) {
		result = Math.floor((count / 1000000) * 10) / 10 + "百万";
	} else if (length == 8) {
		result = Math.floor((count / 10000000) * 10) / 10 + "千万";
	} else if (length >= 9) {
		result = Math.floor((count / 100000000) * 10) / 10 + "亿";
	}
	return result;
}