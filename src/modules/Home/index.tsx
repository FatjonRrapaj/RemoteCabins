import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

import { useFirebase } from '../../firebase';
import { handleAuthErrorCode, handleDbErrorCode } from '../../firebase/errorMessageHandler';

type Cabin = {
  cabinName: string;
  cabinLocation: string;
  id?: string;
};

export default function Home() {
  const navigate = useNavigate();
  const { firebaseAuth, database } = useFirebase();
  const [cabins, setCabins] = useState<Cabin[] | []>([]);
  const [addCabinModalVisible, setAddCabinModalVisible] = useState<Boolean>(false);
  const [cabinName, setCabinName] = useState<string>('');
  const [cabinLocation, setCabinLocation] = useState<string>('');
  const [loadingReceivingCabins, setLoadingReceivingCabins] = useState<boolean>(true);
  const [loadingSavingCabin, setLoadingSavingCabin] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(database, 'cabins'),
      (cabinsCollection) => {
        const currentCabins = cabinsCollection.docs.map((doc) => {
          const id = doc.id;
          const { cabinName, cabinLocation } = doc.data();
          return {
            id,
            cabinName,
            cabinLocation,
          };
        });

        setCabins(currentCabins as unknown as Cabin[]);
        setLoadingReceivingCabins(false);
      },
      (error) => {
        setLoadingReceivingCabins(false);
        handleDbErrorCode(error.code);
      },
    );

    return () => {
      unsub();
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

  function handleAddCabinClicked(event: MouseEvent): void {
    event.preventDefault();
    setAddCabinModalVisible(true);
  }

  function handleCabinModalCloseClicked(event: MouseEvent): void {
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
    setLoadingSavingCabin(true);
    try {
      const docRef = await addDoc(collection(database, 'cabins'), {
        cabinName,
        cabinLocation,
      });
      setLoadingSavingCabin(false);
      setAddCabinModalVisible(false);
      alert('Successfully added cabin');
      setCabinName('');
      setCabinLocation('');
      console.log('docRef: ', docRef);
    } catch (error: any) {
      setLoadingSavingCabin(false);
      handleDbErrorCode(error.code);
    }
  }

  function renderCabins(): JSX.Element[] {
    return cabins.map(({ cabinName, cabinLocation, id }: Cabin): JSX.Element => {
      return (
        <div className="flex flex-row justify-between mt-6" key={id}>
          <span className="flex-1 truncate">🏕️ {cabinName}</span>
          <span className="flex-1 text-left truncate">📍 {cabinLocation}</span>
        </div>
      );
    });
  }

  //todo: refactor modal into a new file
  function renderModal(): JSX.Element {
    return (
      <div className="h-full w-full bg-black bg-opacity-50 absolute flex justify-center">
        <div className="card">
          <button
            className="self-start mb-4 text-xs underline "
            onClick={handleCabinModalCloseClicked}
          >
            close
          </button>
          <div className="title text-lg mb-4">Add a new Cabin</div>
          <form className="flex flex-col items-center " onSubmit={handleSaveCabinSubmit}>
            <label className="w-full">
              <input
                required
                name="cabinName"
                className="input"
                placeholder="Enter cabin name"
                onChange={onCabinNameChange}
                value={cabinName}
              />
            </label>

            {/**
             * TODO: Change this into some legit location provider, like google maps.
             */}
            <label className="w-full mt-4">
              <input
                required
                name="cabinLocation"
                className="input"
                placeholder="Enter cabin location"
                onChange={onCabinLocationChange}
                value={cabinLocation}
              />
            </label>
            <button
              disabled={loadingSavingCabin}
              className="bg-green-500 rounded self-center p-2 mt-6 text-white font-semibold"
            >
              {loadingSavingCabin ? 'Loading...' : 'Save Cabin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper items-start">
      <div className="card self-start w-4/5 mt-40">
        <div className="title text-left">🌳 Remote Cabins</div>
        {loadingReceivingCabins && <>🏕️ are loading... </>}
        {!loadingReceivingCabins && cabins.length === 0 && <>There is not any cabin added yet</>}
        {renderCabins()}
        <button
          className="bg-green-500 rounded self-end align-bottom p-2 mt-6 text-white font-semibold"
          onClick={handleAddCabinClicked}
        >
          Add a new cabin
        </button>
      </div>
      <button
        className="bg-red-500 rounded self-end align-bottom p-2 mb-6 text-white font-semibold"
        onClick={handleSignOut}
      >
        Sign out
      </button>
      {addCabinModalVisible && renderModal()}
    </div>
  );
}
