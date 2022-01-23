import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button"

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validator";
import { useForm } from '../../shared/hooks/form-hook';

const NewPlaces = () => {
    const [formState, inputHandler] = useForm(
        {
          title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          },
          address: {
            value: '',
            isValid: false
          }
        },
        false
      );
    
    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
      };
  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        id="text"
        element='input'
        type='text'
        label='Title'
        errorText='Please enter a valid title'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
        <Input
        id="description"
        element='textarea'
       // type='text'
        label='Description'
        errorText='Please enter a valid description (at least 5 characters).'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
        <Input
        id="address"
        element='input'
        label='Address'
        errorText='Please enter a valid address.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button type="submit" disbaled={!formState.isValid}>
          ADD PLACE
      </Button>
    </form> 
  );
};

export default NewPlaces;
