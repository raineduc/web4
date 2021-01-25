import React, { useCallback } from 'react';
import throttle from 'lodash.throttle';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { ListBox } from 'primereact/listbox';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  HStack,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Card } from '$ui/components/Card';
import { sendHit } from '../logic/game';
import { validateMessages } from '../logic/validate-messages';

const xValues = ['0', '0.5', '1', '1.5', '2'];
const radiusValues = xValues;

const GameListBox = styled(ListBox)`
  max-width: 300px;
  max-height: 150px;
  font-size: 0.85em;
  line-height: ${({ theme }) => theme.lineHeights.shorter};
  overflow: auto;
`;

export const GameForm = () => {
  const dispatch = useDispatch();
  const {
    register, watch, handleSubmit, setValue, errors,
  } = useForm({
    defaultValues: {
      'y-coord': -5,
    },
  });
  const dataError = useSelector((state) => state.game.dataError, shallowEqual);
  const watchXCoord = watch('x-coord', null);
  const watchYCoord = watch('y-coord', -5);
  const watchRadius = watch('radius', null);
  const sliderCallback = useCallback(throttle((val) => setValue('y-coord', val), 100), []);
  const onSubmit = (data) => {
    dispatch(sendHit(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="game-form__x-coord" isRequired isInvalid={errors['x-coord']}>
        <FormLabel>Выберите X координату:</FormLabel>
        <Input name="x-coord" type="hidden" ref={register({ required: validateMessages['x-coord'].required })} />
        <GameListBox
          options={xValues}
          value={watchXCoord}
          onChange={(e) => setValue('x-coord', e.value && parseFloat(e.value, 10), { shouldValidate: true })}
        />
        <FormErrorMessage>
          {(errors['x-coord'] && errors['x-coord'].message)
            || (dataError && dataError.field === 'x-coord' && dataError.error)}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="game-form__y-coord" isRequired mt="15px">
        <FormLabel>Выберите Y координату:</FormLabel>
        <Input name="y-coord" type="hidden" ref={register} />
        <HStack spacing="15px">
          <Slider
            defaultValue={watchYCoord}
            colorScheme="teal"
            min={-5}
            max={5}
            step={0.01}
            onChange={sliderCallback}
            maxWidth="350px"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Card as="span" padding="3px 0" width="50px" textAlign="center">
            {watchYCoord}
          </Card>
        </HStack>
      </FormControl>
      <FormControl id="game-form__radius" isRequired isInvalid={errors.radius} mt="15px">
        <FormLabel>Выберите радиус:</FormLabel>
        <Input name="radius" type="hidden" ref={register({ required: validateMessages.radius.required })} />
        <GameListBox
          options={radiusValues}
          value={watchRadius}
          onChange={(e) => setValue('radius', e.value && parseFloat(e.value, 10), { shouldValidate: true })}
        />
        <FormErrorMessage>
          {(errors.radius && errors.radius.message)
            || (dataError && dataError.field === 'radius' && dataError.error)}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" mt="5" colorScheme="teal">
        Отправить
      </Button>
    </form>
  );
};
