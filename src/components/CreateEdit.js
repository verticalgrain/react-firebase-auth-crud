import React, { Component } from 'react';
import { ref } from '../config/constants'
import { Form, Text, Textarea, Radio, FormError } from 'react-form';
import FormReactSelect from './FormReactSelect'
import FormImageUpload from './FormImageUpload'

export default class CreateEdit extends Component {
  constructor () {
    super();
    this.state = {
      newitemtext : ''
    }
    this.dbItems = ref.child('items');
    this.options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ]
  }


  render () {
    return (

      <Form
          onSubmit={(values) => {
            this.dbItems.push(values);
          }}
          defaultValues={{
            ingredients: [],
            instructions: []
          }}
          validate={values => {
            const { name, ingredients, instructions, tags, description, image, credit } = values
            return {
              name: !name ? 'A name is required' : undefined,
              ingredients: (!ingredients || !ingredients.length) ? 'You need at least one ingredient' : ingredients.map(ingredient => {
                const { name } = ingredient
                return {
                  name: !name ? 'An ingredient name is required' : undefined,
                }
              }),
              instructions: (!instructions || !instructions.length) ? 'You must add at least 1 instruction' : false,
            }
          }}
        >

          {({values, submitForm, addValue, removeValue, getError}) => {
            return (
              <form onSubmit={submitForm}>
                <Text field='name' placeholder='Recipe Name' />
                <FormError field='ingredients' />

                <div className='nested'>
                  {!values.ingredients.length ? (
                    <em>No ingredients have been added yet</em>
                  ) : values.ingredients.map((ingredients, i) => ( // Loop over the values however you'd like
                    <div key={i}>

                      <div>
                        <h6>Ingredient Name</h6>
                        <Text
                          field={['ingredients', i, 'name']} 
                          placeholder='Ingredient Name'
                        />
                      </div>
                      <div>
                        <h6>Ingredient Quantity</h6>
                        <Text
                          field={['ingredients', i, 'quantity']} 
                          placeholder='Ingredient Quantity'
                        />
                      </div>
                      <div>
                        <h6>Ingredient Unit</h6>
                        <FormReactSelect
                          name="tags"
                          field={`ingredients.${i}.unit`}
                          options={this.options}
                          multi={false}
                        />
                      </div>

                      <button 
                        type='button'
                        onClick={() => removeValue('ingredients', i)} 
                      >
                        Remove Ingredient
                      </button>

                    </div>
                  ))}
                </div>

                <div>
                  <button 
                    type='button'
                    onClick={() => addValue('ingredients', {})}
                  >
                    Add Ingredient
                  </button>
                </div>

                <div className='nested'>
                  {!values.instructions.length ? (
                    <em>No instructions have been added yet</em>
                  ) : values.instructions.map((instructions, i) => ( // Loop over the values however you'd like
                    <div key={i}>

                      <div>
                        <h6>Instruction</h6>
                        <Textarea
                          field={['instructions', i, 'instruction']} 
                          placeholder='Instruction'
                        />
                      </div>

                      <button 
                        type='button'
                        onClick={() => removeValue('instructions', i)} 
                      >
                        Remove Instruction
                      </button>

                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type='button'
                    onClick={() => addValue('instructions', {})}
                  >
                    Add Instruction
                  </button>
                </div>

                <FormReactSelect
                  name="tags"
                  field="tags"
                  options={this.options}
                  multi={true}
                />

                <Textarea field='description' placeholder='Recipe Description'>
                </Textarea>
                
                <FormImageUpload field="image" />

                <button type='submit'>Submit</button>

                <input type="hidden" name="authorid" id="authorid" value="" /> 
              </form>
            )
          }}
        </Form>

    )
  }
}