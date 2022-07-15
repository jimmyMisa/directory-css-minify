import path from "path";
import fs from "fs";

import postcss from "postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";

import {mkd, isCss, fg, fp} from "./lib/lib.js"
var fpath = ""
var fout = ""

function minifier(c, t) {
	postcss([cssnano, autoprefixer])
		.process(c, { from: undefined })
		.then((output) => {
			var m = output.css;
			t(m);
		});
}

function run() {
	app_minify();
}

function app_minify(sub) {
	var files = [];
	var pth = fpath;
	if (sub) {
		pth = `${pth}/${sub}`;
	}
	var filenames = fs.readdirSync(pth);
	filenames.forEach((file) => {
		files.push(file);
	});

	files.map((file, index) => {
		var p = `${pth}/${file}`;
		var stats = fs.statSync(p);
		var isf = stats.isFile();
		if (isf) {
			var css = isCss(file);
			if (css) {
				minify(p, sub);
				return true;
			}
			return false;
		} else {
			var ft = fout;
			var ssub = file;
			if (sub) {
				ft = `${fout}/${sub}/${file}`;
				ssub = `${sub}/${ssub}`;
			} else {
				ft = `${fout}/${file}`;
			}
			mkd(ft, () => {
				app_minify(ssub);
			});
		}
	});
}


function mnf(p) {
	if(!p){
		return false
	}
	fpath = p
	fout = p
	var irun = () => {
		run();
	};
	if (!fs.existsSync(fout)) {
		mkd(fout, () => {
			irun();
		});
	}
	else{
		irun()
	}
}

function minify(p, sub) {
	var c = fg(p);
	var f = path.basename(p);
	minifier(c, (m) => {
		var ft = fout;
		if (sub) {
			ft = `${ft}/${sub}`;
		}
		fp(`${ft}/${f}`, m)
	});
}

export {mnf}