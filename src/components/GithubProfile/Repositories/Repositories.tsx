import React, { useEffect, useState } from 'react';
import { Repos } from '../../../types/repos';
import ReactPaginate from 'react-paginate';

interface Props {
  repos: Repos[];
}

const Repositories: React.FC<Props> = ({ repos }) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentRepos, setCurrentRepos] = useState<Repos[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + 4;
    setCurrentRepos(repos.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(repos.length / 4));
  }, [itemOffset, repos]);

  // eslint-disable-next-line
  const handlePageClick = (evt: any) => {
    const newOffset = (evt.selected * 4) % repos.length;
    setItemOffset(newOffset);
  };

  const minItem = itemOffset + 1;
  const maxItem = itemOffset + 4 > repos.length ? repos.length : itemOffset + 4;

  return (
    <div className="repos">
      {currentRepos.map((repo) => (
        <div key={repo.name} className="repo-wrapper">
          <a className="repo-name" href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>

          <p className="repo-description">{repo.description}</p>
        </div>
      ))}

      <div className="pagination-wrapper">
        <p className="pages-count">
          {minItem}-{maxItem} of {repos.length} items
        </p>

        <ReactPaginate
          containerClassName="pagination"
          previousClassName="previous"
          nextLinkClassName="next"
          pageLinkClassName="page"
          activeClassName="active"
          breakLabel="..."
          pageCount={pageCount}
          previousLabel="<"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
};

export default Repositories;
