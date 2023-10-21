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
import { createLists } from '@/store/guestListSlice';

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
        addContributor(values.name);
        resetForm();
      },
    });

  const submitContributors = () => {
    dispatch(bulkAddContributors(contributors));
    dispatch(createLists(contributors));
  };

  const addContributor = (name: string) => {
    setContributors((prevContributors) => [
      ...prevContributors,
      { name, id: createUUID() },
    ]);
  };

  const removeContributor = (id: string) => {
    setContributors((prevContributors) =>
      prevContributors.filter((contributor) => contributor.id !== id)
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 ">
      {/* list to be confirmed */}

      <div className="">
        <header>
          <h2 className="text-2xl font-semibold">Contributors</h2>
        </header>
        <ol className=" list-decimal">
          {contributors.map((contributor) => (
            <li
              className="group mb-2 flex items-center justify-between border rounded-md w-full py-1 px-2"
              key={contributor.id}
            >
              {contributor.name}
              <span
                onClick={() => removeContributor(contributor.id)}
                className="hidden rounde-md group-hover:block text-red-500 ml-24 cursor-pointer"
              >
                x
              </span>
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
                placeholder="Disabled for demo purposes"
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
