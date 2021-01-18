import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  VStack,
  Stack,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  draw,
  Point,
  translateCanvasElemCoordsToRCoords,
} from '../logic/game-area';
import { hitArea } from '../logic/game';

const Canvas = styled.canvas`
  width: 100%;
  height: auto;
`;

export const GameArea = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const points = useSelector((state) => state.game.lastPostedHits);
  const [radius, setRadius] = useState(0);
  const canvasCallback = useCallback(
    (e) => {
      const canvasPoint = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY, null);
      const rPoint = translateCanvasElemCoordsToRCoords(canvasPoint, radius);
      dispatch(
        hitArea({
          'x-coord': rPoint.getX(),
          'y-coord': rPoint.getY(),
          radius,
        }),
      );
    },
    [radius],
  );
  useEffect(() => {
    draw([radius], points, canvasRef.current);
  }, [radius, points]);

  return (
    <VStack spacing="5px" align="left">
      <Canvas
        className="game-area__image"
        width="400"
        height="400"
        ref={canvasRef}
        onClick={canvasCallback}
      />
      <Stack direction="row" spacing="20px">
        <Box as="p">Радиус:</Box>
        <Slider
          defaultValue={radius}
          colorScheme="teal"
          min={0}
          max={2}
          step={0.5}
          onChange={(val) => setRadius(val)}
          maxWidth="350px"
          flexGrow="1"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Stack>
    </VStack>
  );
};
