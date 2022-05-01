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

  const itemsPerPage = window.innerWidth <= 1000 ? Math.ceil(window.innerHeight / 116) : 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentRepos(repos.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(repos.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, repos]);

  // eslint-disable-next-line
  const handlePageClick = (evt: any) => {
    const newOffset = (evt.selected * itemsPerPage) % repos.length;
    setItemOffset(newOffset);
  };

  const sliceDescription = (description: string) => {
    if (description && description.length > 100) {
      return description.substring(0, 97) + '...';
    }

    return description;
  };

  const repoItemsToDisplay = () => {
    const minItem = itemOffset + 1;
    const maxItem =
      itemOffset + itemsPerPage > repos.length ? repos.length : itemOffset + itemsPerPage;

    return `${minItem}-${maxItem} of ${repos.length} items`;
  };

  return (
    <div className="repos">
      {currentRepos.map((repo) => (
        <div key={repo.name} className="repo-wrapper">
          <a className="repo-name" href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>

          <p className="repo-description">{sliceDescription(repo.description)}</p>
        </div>
      ))}

      <div className="pagination-wrapper">
        <p className="pages-count">{repoItemsToDisplay()}</p>

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
