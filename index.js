#!/usr/bin/env node

const {
  GIST_ID, GITHUB_TOKEN, CODESTATS_USER,
} = process.env;

const { GistBox } = require('gist-box');
const https = require('https');

if (!GITHUB_TOKEN || !GIST_ID || !CODESTATS_USER) {
  throw Error('params error');
}

const box = new GistBox({ id:GIST_ID, token:GITHUB_TOKEN});
const LEVEL_FACTOR = 0.025;

https.get('https://codestats.net/api/users/' + CODESTATS_USER, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
	let res = JSON.parse(data);
	let level = (LEVEL_FACTOR * Math.sqrt(res.total_xp)).toFixed(2);

	let languages = res.languages;
	var lang_content = "";
	Object.keys(languages).forEach(function(key){
		var xps = languages[key].new_xps;
		if(xps >= 100){
			var txt = key;
			if(key.length > 11){
				txt = key.split(" ")[0];	
			}	
			// TODO:xp level
			lang_content += txt.padEnd(11) + generateBarChart((languages[key].new_xps / 50).toFixed(2), 21) + "5000/"  + languages[key].new_xps + "\n";
		}
	});
	let content = 
			"Level".padEnd(11) + generateBarChart(level,21) + "100/" + level + "\n" + 
			"Coding".padEnd(11) + generateBarChart((res.new_xp / 50).toFixed(2), 21) + "5000/" + res.new_xp + "\n" +
			lang_content +
			"----------------------------------------" + "\n" +
			"https://codestats.net/users/" + CODESTATS_USER ;

    console.log(content);

	box.update({
      filename: '📊 Recent Code::Stats',
	  description: 'codestats analysis',
	  content: content
	}).catch(
		error => {throw Error(error)}
	);

  });
}).on("error", (err) => {
	throw Error(err)
});

function generateBarChart(percent, size) {
      const syms = "░▏▎▍▌▋▊▉█";

      const frac = Math.floor((size * 8 * percent) / 100);
      const barsFull = Math.floor(frac / 8);
      if (barsFull >= size) {
              return syms.substring(8, 9).repeat(size);
            }
      const semi = frac % 8;

      return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
        .join("")
        .padEnd(size, syms.substring(0, 1));
}

