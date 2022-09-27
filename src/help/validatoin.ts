import * as yup from "yup";


export const schdualeShcema = yup.object().shape({
    title: yup.string().required(),
    check:yup.boolean()
  })

  export const BookShcema = yup.object().shape({
    firstName: yup.string().required(),
    lastName:yup.string().required(),
    phone:yup.string().required()
  })