import * as yup from "yup";


export const schdualeShcema = yup.object().shape({
    title: yup.string().required(),
    check:yup.boolean()
  })