/* eslint-disable import/no-anonymous-default-export */
import validator from "@rjsf/validator-ajv6";
// import Form from "@rjsf/core";
import Form from '@rjsf/antd';

// import { withTheme } from '@rjsf/core';
// import AntForm from '@rjsf/antd';
// const Form = withTheme(AntForm);




export default function (){
  const schema = {
    type: "object",
    required: ["lat", "lon"],
    properties: {
      lat: {type: "number"},
      lon: {type: "number"}
    }
  };
  
  const widgets = {
    CheckboxWidget: CustomCheckbox
  };



  const onSubmit = (data)=>{
    console.log('submit data: ', data);
  }
  const onChange = (data)=>{
    console.log('onchange data: ', data);
  }
  const onError = (data)=>{
    console.log('onError data: ', data);
  }

  return <Form 
  onSubmit={onSubmit}
  widgets={widgets}
  schema={schema}
  onError={onError}
  onChange={onChange}
  uiSchema={uiSchema}
  validator={validator} />
}