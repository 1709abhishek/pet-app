import React from 'react';
import ImageList from './ImageList';
import { useSelector, useDispatch } from 'react-redux';
import changeBreed from './actionCreators/changeBreed';

const Animal = () => {
  const [pets, setPets] = React.useState([]);
  const [subBreed, setSubBreed] = React.useState([]);
  const [optionValue, setOptionValue] = React.useState([]);
  const [subBreedOptionValue, setSubBreedOptionValue] = React.useState([]);
  const petDropdown = React.useRef(null);
  const subBreedDropdown = React.useRef(null);
  //   const [breed, setbreed] = React.useState('');
  const { breed } = useSelector(state => state);
  const dispatch = useDispatch();
  const [selectedSubBreed, setSelectedSubBreed] = React.useState('');
  const fetchData = async () => {
    const obj = await fetch('https://dog.ceo/api/breeds/list/all');
    const json = await obj.json();
    console.log(json);
    const arr = [];
    const subArr = [];
    for (let x in json.message) {
      arr.push(x);

      if (json.message[x].length !== 0) {
        subArr.push({ key: x, val: json.message[x] });
      }
    }
    setPets(arr);
    setSubBreed(subArr);
  };

  React.useEffect(() => {
    fetchData();
    // console.log(pets);
  }, []);

  React.useEffect(() => {
    let items = [];
    pets.map(ele => {
      items.push(
        <option key={ele} value={ele}>
          {ele}
        </option>
      );
    });
    setOptionValue(items);
    // console.log(pets);
  }, [pets]);

  React.useEffect(() => {
    let flag = false;
    subBreed.map(ele => {
      if (ele.key === breed) {
        flag = true;
        console.log(ele.val);
        let items = [];
        if (ele.val.length === 0) {
          setSubBreedOptionValue([]);
        } else {
          ele.val.map(x => {
            items.push(
              <option key={x} value={x}>
                {x}
              </option>
            );
          });
          setSubBreedOptionValue(items);
        }
      }
    });
    if (flag === false) {
      setSubBreedOptionValue([]);
    }
    // console.log(breed);
  }, [breed, subBreed, selectedSubBreed]);

  return (
    <div>
      <select
        name='Select breeds'
        ref={petDropdown}
        style={{ color: 'black' }}
        onChange={e => {
          dispatch(changeBreed(e.target.value));
          setSelectedSubBreed('');
        }}
      >
        {optionValue}
      </select>
      <select
        name='Select sub breeds'
        ref={subBreedDropdown}
        style={{ color: 'black' }}
        onChange={e => setSelectedSubBreed(e.target.value)}
      >
        {subBreedOptionValue}
      </select>
      <select name='Select Pets' ref={petDropdown} style={{ color: 'black' }}>
        {optionValue}
      </select>
      <ImageList breed={breed} selectedSubBreed={selectedSubBreed} />
    </div>
  );
};

export default Animal;
