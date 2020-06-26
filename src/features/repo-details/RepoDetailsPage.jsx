import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { formatToNow } from '../../utils/dates.js';

import { fetchRepo } from '../repo-list/repo-list-slice';
import { fetchRepoContributors } from './contributors-slice';
import { fetchRepoLanguages } from './languages-slice';

import { LanguageList } from './LanguageList';
import { ContributorList } from './ContributorList';
import { Star } from '../../components/shared/Star';
import { Spinner } from '../../components/shared/Spinner';

import styles from './RepoDetailsPage.module.css';

function BackToListButton() {
  return (
    <Link to='/' className={styles.backButton}>
      Back to list
    </Link>
  );
}

function RepoDetailsHeader() {
  return (
    <header className={styles.header}>
      <BackToListButton />
    </header>
  );
}

export function RepoDetailsPage({ showRepoList, match }) {
  const { repoId } = match.params;
  const dispatch = useDispatch();

  const repo = useSelector((state) => state.repos.byId[repoId]);

  useEffect(() => {
    if (!repo) {
      dispatch(fetchRepo(repoId));
    }
    dispatch(fetchRepoContributors(repoId));
    dispatch(fetchRepoLanguages(repoId));
  }, [repo, dispatch, repoId]);

  const { contributors, contributorsError } = useSelector((state) => {
    return {
      contributors: state.contributors.byRepoId[repoId],
      contributorsError: state.contributors.error,
    };
  }, shallowEqual);

  const { languages, languagesError } = useSelector((state) => {
    return {
      languages: state.languages.byRepoId[repoId],
      languagesError: state.languages.error,
    };
  });

  if (!repo) {
    return <Spinner />;
  }

  const lastCommitDate = new Date(repo.pushed_at);

  return (
    <>
      <RepoDetailsHeader showRepoList={showRepoList} />
      <main>
        <div className='wrapper'>
          <section className={styles.repoSection}>
            <header className={styles.repoHeader}>
              <img
                src={repo.owner.avatar_url}
                alt="repository owner's avatar"
                width='200'
                height='200'
                className={styles.ownerAvatar}
              />
              <div className={styles.infoBlock}>
                <h2 className={styles.title}>{repo.name}</h2>
                <span className={styles.stars}>
                  <Star width={16} height={16} />
                  {repo.stargazers_count}
                </span>
                <span className={styles.commit}>
                  Last commit: {formatToNow(lastCommitDate)}
                </span>
                <a
                  href={repo.owner.html_url}
                  className={styles.ownerLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.owner.login}
                </a>
              </div>
            </header>
            <LanguageList languages={languages} error={languagesError} />
            <p className={styles.description}>{repo.description}</p>
            <h3 className={styles.subtitle}>Contributors:</h3>
            <ContributorList
              contributors={contributors}
              error={contributorsError}
            />
          </section>
        </div>
      </main>
    </>
  );
}
