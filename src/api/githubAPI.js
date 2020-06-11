import axios from 'axios';
import parseLink from 'parse-link-header';

import { REPOS_PER_PAGE, CONTRIBUTORS_PER_PAGE } from '../constants';

export async function getTopRatedRepos() {
  const url = `https://api.github.com/search/repositories?q=stars:>115000+&sort=stars&order=desc`;
  const { data } = await axios.get(url);

  return data;
}

function isLastPage(pageLinks) {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  );
}

function getPageCount(pageLinks) {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  }
  if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  }

  return 0;
}

export async function getRepoList(repo, page = 1) {
  const url = `https://api.github.com/search/repositories?q=${repo}&per_page=${REPOS_PER_PAGE}&page=${page}`;
  const reposResponse = await axios.get(url);

  let pageCount = 0;
  const pageLinks = parseLink(reposResponse.headers.link);

  if (pageLinks !== null) {
    pageCount = getPageCount(pageLinks);
  }

  return {
    pageLinks,
    pageCount,
    repos: reposResponse.data,
  };
}

// async function getRepoLanguages(repoId) {
//   const url = `https://api.github.com/repositories/${repoId}/languages`;
//   const { data } = await axios.get(url);

//   return data;
// }

export async function getRepoDetails(repoId) {
  const repoUrl = `https://api.github.com/repositories/${repoId}`;
  const languagesUrl = `https://api.github.com/repositories/${repoId}/languages`;
  const contributorsUrl = `https://api.github.com/repositories/${repoId}/contributors?anon=true&per_page=${CONTRIBUTORS_PER_PAGE}`;

  const repoDetailsRequest = axios.get(repoUrl);
  const languagesRequest = axios.get(languagesUrl);
  const contributorsRequest = axios.get(contributorsUrl);

  return await axios
    .all([repoDetailsRequest, languagesRequest, contributorsRequest])
    .then(
      axios.spread((...responses) => ({
        repoDetails: responses[0].data,
        languages: responses[1].data,
        contributors: responses[2].data,
      }))
    );
  // const { data } = await axios.get(url);
  // const repoLanguages = await getRepoLanguages(repoId);
  // const {
  //   name: repoName,
  //   stargazers_count: starsCount,
  //   pushed_at: lastCommitDate,
  //   owner: {
  //     login: repoOwnerName,
  //     avatar_url: repoOwnerAvatarUrl,
  //     html_url: repoOwnerUrl,
  //   },
  //   description,
  // } = data;

  // return {
  //   repoName,
  //   starsCount,
  //   lastCommitDate,
  //   repoOwnerName,
  //   repoOwnerAvatarUrl,
  //   repoLanguages,
  //   repoOwnerUrl,
  //   description,
  // };
}

// export async function getRepoContributors(repoId) {
//   const url = `https://api.github.com/repositories/${repoId}/contributors?anon=true`;
//   const { data } = await axios.get(url);

//   return data;
// }
