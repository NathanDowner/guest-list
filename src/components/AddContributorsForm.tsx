import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Contributor } from '../models/contributor.interface';
import { useEffect, useState } from 'react';
import { createUUID } from '../utils';
import { useAppDispatch } from '../store/hooks';
import { bulkAddContributors } from '../store/contributorSlice';
import { createLists } from '@/store/guestListSlice';
import { MIN_CONTRIBUTORS } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';

const AddContributorsForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik<Contributor>({
      initialValues: {
        name: '',
        email: '',
      },
      validationSchema: Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
      }),
      onSubmit: (values, { resetForm }) => {
        addContributor(values);
        resetForm();
      },
    });

  useEffect(() => {
    if (user) {
      setContributors([
        {
          name: user.displayName || '',
          email: user.email || '',
        },
      ]);
    }
  }, [user]);

  const submitContributors = () => {
    dispatch(bulkAddContributors(contributors));
    dispatch(createLists(contributors));
  };

  const addContributor = (contributor: Contributor) => {
    setContributors((prevContributors) => [
      ...prevContributors,
      { ...contributor },
    ]);
  };

  const removeContributor = (email: string) => {
    setContributors((prevContributors) =>
      prevContributors.filter((contributor) => contributor.email !== email),
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 ">
      {/* list to be confirmed */}

      <div>
        <header>
          <h2 className="text-2xl font-semibold">Contributors</h2>
        </header>
        <ol className=" list-decimal">
          {contributors.map((contributor, idx) => (
            <li
              className="group mb-2 flex items-center justify-between border rounded-md w-full py-1 px-2"
              key={contributor.email}
            >
              {contributor.name}
              {idx > 0 ? (
                <span
                  onClick={() => removeContributor(contributor.email)}
                  className="hidden rounde-md group-hover:block text-red-500 ml-24 cursor-pointer"
                >
                  x
                </span>
              ) : (
                <span className="text-gray-400">Creator</span>
              )}
            </li>
          ))}
        </ol>
        {contributors.length < MIN_CONTRIBUTORS ? (
          <span className="text-sm text-gray-400">
            Add at least 2 contributors to get started building your list!
          </span>
        ) : (
          <button
            onClick={submitContributors}
            className="border py-2 px-4 mt-4 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
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
              <span
                className={`${touched.name && errors.name && 'text-red-400'}`}
              >
                Full Name
              </span>
              <input
                className={`${
                  touched.name && errors.name && 'border-red-400'
                } border w-full rounded-md p-1`}
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
              <span
                className={`${touched.email && errors.email && 'text-red-400'}`}
              >
                Email
              </span>
              <input
                className={`${
                  touched.email && errors.email && 'border-red-400'
                } border w-full rounded-md p-1`}
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>

          <button
            disabled={!user}
            className="border py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            type="submit"
          >
            {user ? 'Add Contributor' : 'Login to add contributor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContributorsForm;
