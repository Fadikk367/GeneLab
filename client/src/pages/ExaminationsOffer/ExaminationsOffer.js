import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'api/axiosInstance';

import { TestCategoryTitle, TestListFilterForm, ExaminationsList } from './components';


const ExaminationsOffer = () => {
  const categories = useSelector(state => state.examinations.categories);
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0] || { name: 'Wybierz kategorię', id: -1});
  const [examinations, setExaminations] = React.useState([]);
  const [page, setPage] = React.useState(1);


  useEffect(() => {
    async function fetchExaminations(categoryId) {
      try {
        const response = await axios.get(`/examinations/category/${categoryId}?page=${page}&items=${7}`);

        if (page === 1) {
          setExaminations(response.data);
        } else {
          setExaminations([...examinations, ...response.data]);
        }
      } catch(err) {
        console.log(err);
      }
    }

    if (selectedCategory.id !== -1) {
      fetchExaminations(selectedCategory.id);
    }
  }, [selectedCategory, page]);

  const handleSelectCategory = selectedCategory => {
    setExaminations([]);
    setPage(1);
    setSelectedCategory(selectedCategory);
  }

  return (
    <div style={{width: '90%', margin: '0 auto'}}>
      <TestCategoryTitle categoryName={selectedCategory.name}/>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ExaminationsList items={examinations} setPage={setPage}/>
        <TestListFilterForm handleSelectCategory={handleSelectCategory} categories={categories}/>
      </div>
    </div>
  )
}

export default ExaminationsOffer;
