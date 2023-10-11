import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Contributor,
  CreateContributorDto,
} from '../models/contributor.interface';
import { useState } from 'react';
import { createUUID } from '../utils';
import { useAppDispatch } from '../store/hooks';
import { bulkAddContributors } from '../store/contributorSlice';

const AddContributorsForm = () => {
  const dispatch = useAppDispatch();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik<CreateContributorDto>({
      initialValues: {
        name: '',
      },
      validationSchema: Yup.object({
        name: Yup.string().required(),
      }),
      onSubmit: (values, { resetForm }) => {
        setContributors((prevContributors) => [
          ...prevContributors,
          { id: createUUID(), name: values.name },
        ]);
        resetForm();
      },
    });

  const submitContributors = () => {
    dispatch(bulkAddContributors(contributors));
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 max-w-3xl mx-auto">
      {/* list to be confirmed */}

      <div className="">
        <header>
          <h2 className="text-2xl font-semibold">Contributors</h2>
        </header>
        <ol className=" list-decimal ml-4">
          {contributors.map((contributor) => (
            <li className="rounded-md mb-2" key={contributor.id}>
              {contributor.name}
            </li>
          ))}
        </ol>
        {contributors.length < 2 ? (
          <span className="text-sm text-gray-400">
            Add at least 2 contributors to get started building your list!
          </span>
        ) : (
          <button
            onClick={submitContributors}
            className="border py-2 px-4 mt-4  text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            type="button"
          >
            Start building the list!
          </button>
        )}
      </div>

      <div className="border rounded-lg p-4">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">Add Contributors</h2>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Full Name
              <input
                className="border w-full rounded-md p-1"
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>

          <div>
            <label htmlFor="name">
              Email
              <input
                className="border w-full rounded-md p-1"
                type="text"
                name="email"
                id="email"
                disabled
              />
            </label>
          </div>

          <button
            className="border py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
            type="submit"
          >
            Add Contributor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContributorsForm;
