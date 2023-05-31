import { useState } from "react";
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

const Test = () => {
  const [image, setImage] = useState(null);

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
    // Resizer.imageFileResizer(
    //     file,
    //     300, // Nuevo ancho deseado de la imagen
    //     300, // Nuevo alto deseado de la imagen
    //     'JPEG', // Formato de salida de la imagen (JPEG, PNG, WEBP)
    //     100, // Calidad de la imagen (0 - 100)
    //     0, // Rotación de la imagen (0 - 360)
    //     (resizedFile) => {
    //         const convertedFile = new File([resizedFile], file.name, { type: file.type });
    //         setImage(convertedFile);
    //     },
    //     'base64' // Tipo de salida de la imagen (base64, blob, file)
    //   );
  };

  const handleOnClick = () => {
    const formData = new FormData();
    formData.append("image", image);
  
    axios.post("http://localhost:3001/test", formData)
      .then(response => {
        // Manejar la respuesta de la solicitud
        console.log(response);
      })
      .catch(error => {
        // Manejar errores
        console.log(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleOnChange} />
      <button onClick={handleOnClick}>Enviar</button>
    </div>
  );
};

export default Test;