import { mnf } from "./src/css-minify.js";

class Minify {
	static apply(folder) {
		return mnf(folder);
	}
}

export { Minify };
