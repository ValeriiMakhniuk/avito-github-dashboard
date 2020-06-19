import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { formatToNow } from '../../utils/dates.js';

import { fetchRepo } from '../repo-list/repo-list-slice';
import { fetchRepoContributors } from './contributors-slice';
import { fetchRepoLanguages } from './languages-slice';

import { LanguageList } from './LanguageList';
import { ContributorList } from './ContributorList';
import Star from '../../components/shared/star';

import styles from './RepoDetailsPage.module.css';

function BackToListButton({ showRepoList }) {
  const handleClick = (e) => {
    e.preventDefault();
    showRepoList();
  };

  return (
    <button onClick={handleClick} className={styles.backButton}>
      Back to list
    </button>
  );
}

function RepoDetailsHeader({ showRepoList }) {
  return (
    <header className={styles.header}>
      <BackToListButton showRepoList={showRepoList} />
    </header>
  );
}

export function RepoDetailsPage({ showRepoList, activeRepoId }) {
  const dispatch = useDispatch();

  const repo = useSelector((state) => state.repos.byId[activeRepoId]);

  useEffect(() => {
    if (!repo) {
      dispatch(fetchRepo(activeRepoId));
    }
    dispatch(fetchRepoContributors(activeRepoId));
    dispatch(fetchRepoLanguages(activeRepoId));
  }, [repo, dispatch, activeRepoId]);

  const { contributors, contributorsError } = useSelector((state) => {
    return {
      contributors: state.contributors.byRepoId[activeRepoId],
      contributorsError: state.contributors.error,
    };
  }, shallowEqual);

  const { languages, languagesError } = useSelector((state) => {
    return {
      languages: state.languages.byRepoId[activeRepoId],
      languagesError: state.languages.error,
    };
  });

  if (!repo) {
    return (
      <div>
        <p>Loading repo #{activeRepoId}...</p>
      </div>
    );
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
