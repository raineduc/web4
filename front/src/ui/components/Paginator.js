import React, { useState, useMemo, useEffect } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import PropTypes from 'prop-types';

const PaginatorButton = ({ children, ...props }) => (
  <Button colorScheme="teal" {...props}>
    {children}
  </Button>
);

export const Paginator = ({ pageCount, pageRange, onPageChange }) => {
  const [currentPage, changePage] = useState(1);
  const buttons = useMemo(() => {
    if (pageCount < currentPage) {
      changePage(pageCount);
    }
    const pages = [];
    const margin = Math.max(Math.floor(pageRange / 2), 0);
    const startIndex = Math.min(Math.max(currentPage - margin, 1), Math.max(pageCount - pageRange + 1, 1));
    const lastIndex = Math.min(startIndex + pageRange - 1, pageCount);

    for (let i = startIndex; i <= lastIndex; i += 1) {
      pages.push(<PaginatorButton onClick={() => changePage(i)} isActive={i === currentPage} key={i}>{i}</PaginatorButton>);
    }
    return pages;
  }, [currentPage, pageRange, pageCount]);

  useEffect(() => onPageChange(currentPage), [currentPage]);

  return (
    <ButtonGroup spacing="5px" variant="outline">
      <PaginatorButton
        onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        <GrPrevious />
      </PaginatorButton>
      {buttons}
      <PaginatorButton
        onClick={() => currentPage !== pageCount && changePage(currentPage + 1)}
        isDisabled={currentPage === pageCount}
      >
        <GrNext />
      </PaginatorButton>
    </ButtonGroup>
  );
};

Paginator.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageRange: PropTypes.number,
  onPageChange: PropTypes.func,
};

Paginator.defaultProps = {
  pageRange: 1,
  onPageChange: () => {},
};
