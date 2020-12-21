import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTestFamily } from 'state/actions/testFamilies.actions';


const Home = () => {
  const [familyName, setFamilyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddDiagnosticTestsFamily = async e => {
    e.preventDefault();

    if (familyName) {
      setIsLoading(true);
      dispatch(createTestFamily(familyName))
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }
  return (
    <div>
      Home page

      <form onSubmit={handleAddDiagnosticTestsFamily}>
        <label>Family name:</label><br />
        <input type="text" name="familyName" value={familyName} onChange={e => setFamilyName(e.target.value)}/>
        <button type='submit'>dodaj</button>
        <span>{isLoading ? 'loading...' : null}</span>
      </form>
    </div>
  )
}

export default Home
