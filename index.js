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

	let content = "User:" + res.user + "\n" +
			"Level:" + level + "\n" + 
			"New_xp:" + res.new_xp + "\n" +
			"-------------" + "\n" +
			"https://codestats.net/users/" + CODESTATS_USER ;

    console.log(content);

	box.update({
	  filename: '📊 Yesterday Codestats',
	  description: 'codestats analysis',
	  content: content
	}).catch(
		error => {throw Error(error)}
	);

  });
}).on("error", (err) => {
	throw Error(err)
});


