import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Comments({ username }) {
  const [storedComments, setStoredComments] = useState("");

  useEffect(() => {
    const savedComments = localStorage.getItem(`${username}-commentsData`);
    if (savedComments) {
      setStoredComments(savedComments);
    }
  }, [username]);

  const validationSchema = Yup.object({
    comments: Yup.string().required("Comment is required"),
  });

  const handleSubmit = (values) => {
    localStorage.setItem(`${username}-commentsData`, values.comments);
    alert("Data submitted successfully!");
    console.log("Submitted comments:", values);
  };

  return (
    <div className="container">
      <Formik
        initialValues={{
          comments: storedComments || "",
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="header">Comments</h2>

            <div className="field-container">
              <label htmlFor="comments" className="label">
                Add Comments
              </label>
              <Field
                type="text"
                name="comments"
                id="comments"
                className="textarea"
                placeholder="Add a comment and use @Name to tag someone"
              />
              {errors.comments && touched.comments && (
                <div className="error-message">{errors.comments}</div>
              )}
            </div>

            <div className="button-group">
              <button type="submit" className="save-draft-btn">
                Save as Draft
              </button>
              <button type="submit" className="submit-new-btn">
                Submit & New
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Comments;
