import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="errors"> {errors.name}</p>
        )}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="errors"> {errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="errors">{errors.password}</p>
        )}
        <label className="checkbox-contatiner">
          Terms:
          <Field type="checkbox" name="terms" checked={values.terms} />
          {touched.terms && errors.terms && (
            <p className="errors">{errors.terms}</p>
          )}
          <button>Submit</button>
        </label>
      </Form>
      {users.map(user => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || ""
    };
  },
  validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email("Need a vaild Email").required("You must do this"),
      password: Yup.string().max(5, "Password is too long, Password must be less than 5 char ").required("You must do this "),
    //   terms: Yup.bool().oneOf([true]).required("You must do This ")
    }),
    handleSubmit( values, { setStatus }) {
        axios.post(" https://reqres.in/api/users", values).then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(error => {
            console.log(error.res)
        })
        console.log()
    }
})(UserForm);
export default FormikUserForm;
console.log("This is the HOC", FormikUserForm);

