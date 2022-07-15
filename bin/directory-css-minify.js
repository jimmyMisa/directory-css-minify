#!/usr/bin/env node

import { Minify } from "../index.js";
import { mkd, isCss, fg, fp, getFolderSize } from "../src/lib/lib.js";

var start = null;

var args = process.argv;
if (args.length < 2) {
	console.error("Please enter the folder parameter");
	process.exit(1); //an error occurred
}

args = args.slice(2);
var p = args[0];

run();

function startBenchmarking() {
	start = process.hrtime();
}

function benchmark(note, f = () => {}) {
	var precision = 3;
	var elapsed = process.hrtime(start)[1] / 1000000;
	var r = process.hrtime(start)[0] * 1000 + Math.ceil(elapsed);
	console.log(
		process.hrtime(start)[0] +
			" s, " +
			elapsed.toFixed(precision) +
			" ms - " +
			note
	);
	r = Math.ceil(r);
	f(r);
	start = process.hrtime(); // reset the timer
}

function run() {
	var s = getFolderSize(p);
	var lines = [
		`------------`,
		`---START----`,
		`------------`,
		`Size : \t${s / 1000} kb`,
		`------------`,
		`Size : \t${s} b`,
		`------------`,
	];

	console.log(lines.join("\n"));
	startBenchmarking();
	process.on("exit", () => {
		benchmark("done", (t) => {
			var s = getFolderSize(p);
			var lines = [
				`------------`,
				`-----END----`,
				`------------`,
				`Time : \t${t / 1000} s`,
				`Size : \t${s / 1000} kb`,
				`------------`,
				`Time : \t${t} ms`,
				`Size : \t${s} b`,
				`------------`,
			];

			console.log(lines.join("\n"));
		});
	});
	Minify.apply(p);
}
