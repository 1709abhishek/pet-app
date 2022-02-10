import React from 'react';
import { useSelector } from 'react-redux';

const ImageList = props => {
  const [imageList, setImageList] = React.useState([]);
  const { breed } = useSelector(state => state);
  const fetchImages = async () => {
    try {
      const obj =
        props.selectedSubBreed !== ''
          ? breed !== ''
            ? await fetch(`https://dog.ceo/api/breed/${breed}/${props.selectedSubBreed}/images`)
            : null
          : await fetch(`https://dog.ceo/api/breed/${breed}/images`);

      if (obj.status === 200) {
        const resp = await obj.json();

        setImageList(resp.message);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchImages();
  }, [breed, props.selectedSubBreed]);
  React.useEffect(() => {
    // console.log(imageList);
  }, []);
  return (
    <div>
      {imageList && imageList.length > 0
        ? imageList.map(ele => {
            return <img src={`${ele}`} />;
          })
        : null}
    </div>
  );
};

export default ImageList;
