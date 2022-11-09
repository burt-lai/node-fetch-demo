import fetch from 'node-fetch';

const testPost = async () => {
  const response = await fetch('https://httpbin.org/post', { method: 'POST', body: 'a=1' });
  const data = await response.json();

  console.log(data);
};
// testPost(); // 成功！

const fetchGithubRepo = async () => {
  //['https://api.github.com/repos/nestjs/nest'];
  const repos = [
    'nestjs/nest',
    'expressjs/express',
    'koajs/koa',
    'blitz-js/blitz',
    'fastify/fastify',
    'meteor/meteor',
    'eggjs/egg',
    'midwayjs/midway',
  ];
  const urls = repos.map(repo => `https://api.github.com/repos/${repo}`);
  const requests = urls.map(url => fetch(url).then(r => r.json()));
  const result = await Promise.all(requests);
  const data = result
    .map(e => ({
      name: e.name,
      star: e.stargazers_count,
      fork: e.forks,
      watch: e.watchers_count,
    }))
    .sort((a, b) => b.star - a.star);
  console.log(data);
};
fetchGithubRepo();
// [
//   { name: 'express', star: 58791, fork: 9977, watch: 58791 },
//   { name: 'nest', star: 51892, fork: 6107, watch: 51892 },
//   { name: 'meteor', star: 43121, fork: 5226, watch: 43121 },
//   { name: 'koa', star: 33265, fork: 3229, watch: 33265 },
//   { name: 'fastify', star: 25460, fork: 1879, watch: 25460 },
//   { name: 'egg', star: 18210, fork: 1780, watch: 18210 },
//   { name: 'blitz', star: 12257, fork: 716, watch: 12257 },
//   { name: 'midway', star: 6173, fork: 457, watch: 6173 }
// ]
