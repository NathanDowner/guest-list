import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Contributor } from '../models/contributor.interface';
import { useEffect, useState } from 'react';
import { MIN_CONTRIBUTORS } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';
import { CreateListDto } from '@/models/list.interface';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Role } from '@/models/role.enum';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { createListName } from '@/utils';

const AddContributorsForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const ROLES = [
    {
      label: 'Owner',
      value: Role.OWNER,
    },
    {
      label: 'Contributor',
      value: Role.CONTRIBUTOR,
    },
  ];

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik<Contributor>({
      initialValues: {
        name: '',
        email: '',
        role: Role.CONTRIBUTOR,
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
          role: Role.OWNER,
        },
      ]);
    }
  }, [user]);

  const submitContributors = async () => {
    const newList: CreateListDto = {
      title: createListName(contributors),
      author: user!.displayName!,
      guests: [],
      contributors: contributors.reduce<Record<string, Contributor>>(
        (obj, contributor) => {
          obj[contributor.email] = contributor;
          return obj;
        },
        {},
      ),
    };

    await saveList(newList);
  };

  const addContributor = (contributor: Contributor) => {
    setContributors((prevContributors) => [
      ...prevContributors,
      { ...contributor },
    ]);
  };

  const saveList = async (newList: CreateListDto) => {
    try {
      setIsCreatingList(true);
      const docRef = await addDoc(collection(db, 'lists'), newList);

      Promise.all(
        Object.values(newList.contributors).map((contributor) => {
          return addDoc(collection(db, `lists/${docRef.id}/contributors`), {
            name: contributor.name,
            email: contributor.email,
            guests: [],
          });
        }),
      );
      setIsCreatingList(false);
      navigate(AppRoutes.guestListBuilder(docRef.id));
    } catch (error) {
      console.error('Error adding document: ', error);
    }
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
              <span>{contributor.name}</span>

              <div className="flex items-center">
                <span className="text-gray-400">{contributor.role}</span>
                <span
                  onClick={() => removeContributor(contributor.email)}
                  className="hidden rounde-md group-hover:block text-red-500 ml-24 cursor-pointer"
                >
                  x
                </span>
              </div>
            </li>
          ))}
        </ol>
        {contributors.length < MIN_CONTRIBUTORS ? (
          <span className="text-sm text-gray-400">
            Add at least {MIN_CONTRIBUTORS} contributor(s) to get started
            building your list!
          </span>
        ) : (
          <button
            onClick={submitContributors}
            className="border py-2 px-4 mt-4 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            type="button"
          >
            {isCreatingList ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              <>Start building the list!</>
            )}
          </button>
        )}
      </div>

      <div className="border rounded-lg p-4">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">Add Contributors</h2>
        </header>
        <form className="" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span
                className={`${touched.name && errors.name && 'text-red-400'}`}
              >
                Full Name
              </span>
            </label>
            <input
              className={`input input-bordered input-sm rounded-md ${
                touched.name && errors.name && 'input-error'
              }`}
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="name">
              <span
                className={`${touched.email && errors.email && 'text-red-400'}`}
              >
                Email
              </span>
            </label>
            <input
              className={`input input-bordered input-sm ${
                touched.email && errors.email && 'input-error'
              } w-full rounded-md`}
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-control">
            <label htmlFor="role" className="label">
              Role
            </label>
            <select
              className="select select-bordered select-sm rounded-md"
              name="role"
              id="role"
              onChange={handleChange}
              value={values.role}
              onBlur={handleBlur}
            >
              {ROLES.map((role) => (
                <option key={role.label} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={!user}
            className="mt-4 btn btn-md rounded-md"
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
