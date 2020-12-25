import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTestCategory } from 'state/testCategory/testCategoryActions';


const Home = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddTestCategory = async e => {
    e.preventDefault();

    if (categoryName && categoryDescription) {
      setIsLoading(true);
      dispatch(createTestCategory(categoryName, categoryDescription))
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }
  return (
    <div>
      Home page

      <form onSubmit={handleAddTestCategory}>
        <label>Category name:</label><br />
        <input type="text" name="categoryName" value={categoryName} onChange={e => setCategoryName(e.target.value)}/><br />
        <label>Category description:</label><br />
        <textarea name="categoryDescription" cols="50" rows="5" value={categoryDescription} onChange={e => setCategoryDescription(e.target.value)}></textarea><br />
        <button type='submit'>dodaj</button>
        <span>{isLoading ? 'loading...' : null}</span>
      </form>
    </div>
  )
}

export default Home
