import React, { useEffect } from 'react';
import {
  VStack, Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { Paginator } from '$ui/components/Paginator';
import { getHits } from '../logic/game';

const HitParam = styled(Td)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const HitResults = () => {
  const dispatch = useDispatch();
  const hits = useSelector((state) => state.game.requestedHits);
  const currentPage = useSelector((state) => state.game.currentPage);
  const lastPostedHit = useSelector((state) => state.game.lastPostedHit);
  const pageCount = useSelector((state) => state.game.pageCount);

  useEffect(() => {
    dispatch(getHits(currentPage));
  }, [lastPostedHit]);

  return (
    <VStack marginTop="10px">
      <Table variant="striped" colorScheme="green" lineHeight="1">
        <Thead>
          <Tr>
            <Th>X</Th>
            <Th>Y</Th>
            <Th>Радиус</Th>
            <Th paddingTop="0.5rem" paddingBottom="0.5rem">Попал</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hits.map((hit, index) => (
            <Tr key={index}>
              <HitParam>{hit.x}</HitParam>
              <HitParam>{hit.y}</HitParam>
              <HitParam>{hit.radius}</HitParam>
              <HitParam>{hit.hit ? 'Да' : 'Нет'}</HitParam>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Paginator pageCount={pageCount} pageRange={10} onPageChange={(page) => dispatch(getHits(page))} />
    </VStack>
  );
};
