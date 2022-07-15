import fs from "fs";
function mkd(p, t) {
	if (fs.existsSync(p)) {
		t();
	} else {
		fs.mkdirSync(p, { recursive: true });
		t();
	}
}

function isCss(file) {
	var sp = file.split(".");
	var l = sp.length;
	if (sp[l - 1] == "css") {
		return true;
	}
	return false;
}

function fg(p) {
	var c = fs.readFileSync(p, { encoding: "utf8", flag: "r" });
	return c;
}

function fp(p, c) {
	fs.writeFileSync(p, c);
}

function getFolderSize(f) {
	var stats = fs.statSync(f);
	var isf = stats.isFile();
	if (isf) {
		return stats.size;
	}
	var t = 0;
	gf(f).map((k) => {
		var p = `${f}/${k}`;
		t = t + getFolderSize(p);
	});
	return t;
}

function gf(d) {
	var fns = fs.readdirSync(d);

	var r = [];
	fns.forEach((file) => {
		r.push(file);
	});
	return r;
}

export { mkd, isCss, fg, gf, fp, getFolderSize };
