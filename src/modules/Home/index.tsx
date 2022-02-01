import React, { MouseEvent, useEffect, useState, useRef, InputHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, doc, CollectionReference } from 'firebase/firestore';

import { useFirebase } from '../../firebase';
import { handleAuthErrorCode, handleDbErrorCode } from '../../firebase/errorMessageHandler';

type Cabin = {
  name: string;
  location: string;
};

export default function Home() {
  const navigate = useNavigate();
  const { firebaseAuth, database } = useFirebase();
  const [cabins, setCabins] = useState<Cabin[] | []>([]);
  const [addCabinModalVisible, setAddCabinModalVisible] = useState<Boolean>(false);
  const [cabinName, setCabinName] = useState<string>('');
  const [cabinLocation, setCabinLocation] = useState<string>('');
  const [loadingSavingCabin, setLoadingSavingCabin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribeCabinsChanges = onSnapshot(
      collection(database, 'cabins'),
      (collection) => {
        console.log('cabinsCollection: ', collection.docs);
        const cabins = collection.docs.map((element) => {
          return element;
        });
        setCabins(cabins as unknown as Cabin[]);
      },
      (error) => {
        console.error('cabinsCollectionChanges error: ', error);
      },
    );

    return () => {
      unsubscribeCabinsChanges();
    };
  }, []);

  function handleSignOut(event: MouseEvent): void {
    event.preventDefault();
    signOut(firebaseAuth)
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((error: any) => {
        handleAuthErrorCode(error.code);
        //todo: ?? any manual solution for this?
      });
  }
  //todo: refactor modal into a new file
  function handleAddCabinPressed(event: MouseEvent): void {
    event.preventDefault();
    //open modal with form and cabin data
    setAddCabinModalVisible(true);
  }

  function handleCabinModalClosePressed(event: MouseEvent): void {
    event.preventDefault();
    setAddCabinModalVisible(false);
  }

  function onCabinNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setCabinName(event.target.value);
  }

  function onCabinLocationChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setCabinLocation(event.target.value);
  }

  async function handleSaveCabinSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(database, 'cabins'), {
        cabinName,
        cabinLocation,
      });
      alert('Successfully added cabin');
      setCabinName('');
      setCabinLocation('');
      console.log('docRef: ', docRef);
    } catch (error: any) {
      handleDbErrorCode(error.code);
    }
  }

  function renderModal(): JSX.Element {
    return (
      <div className="h-full w-full bg-black bg-opacity-50 absolute flex justify-center">
        <div className="card">
          <button
            className="self-start mb-4 text-xs underline "
            onClick={handleCabinModalClosePressed}
          >
            close modal
          </button>
          <div className="title text-lg mb-4">Add a new Cabin</div>
          <form onSubmit={handleSaveCabinSubmit}>
            <label>
              <input
                required
                className="input"
                placeholder="Enter cabin name"
                onChange={onCabinNameChange}
                value={cabinName}
              />
              <input
                required
                className="input"
                placeholder="Enter cabin location"
                onChange={onCabinLocationChange}
                value={cabinLocation}
              />
              <button
                disabled={loadingSavingCabin}
                className="bg-green-500 rounded-sm align-top p-2 mt-6 text-white font-semibold"
              >
                {loadingSavingCabin ? 'Loading...' : 'Save Cabin'}
              </button>
            </label>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper items-start">
      <div className="card self-start w-4/5 mt-40">
        {cabins.length === 0 && <>there is not any cabin added yet</>}
        {cabins.map(({ name, location }) => {
          return <div>{name}</div>;
        })}
        <button
          className="bg-green-500 rounded-sm self-end align-bottom p-2 mt-6 text-white font-semibold"
          onClick={handleAddCabinPressed}
        >
          Add a new cabin
        </button>
      </div>
      <button
        className="bg-red-500 rounded-sm self-end align-bottom p-2 mb-6 text-white font-semibold"
        onClick={handleSignOut}
      >
        Sign out
      </button>
      {addCabinModalVisible && renderModal()}
    </div>
  );
}
