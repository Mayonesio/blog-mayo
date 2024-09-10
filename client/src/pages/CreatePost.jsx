import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import TiptapEditor from '../components/Tiptap/TipTap'; // Importa TiptapEditor
import Header from '../components/Header';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  // Validar el archivo antes de cargarlo
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!allowedTypes.includes(file.type)) {
      return 'Formato de archivo no permitido. Solo se permiten imágenes JPEG y PNG.';
    }

    if (file.size > maxSize) {
      return 'El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.';
    }

    return null;
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Selecciona una imagen');
        return;
      }

      // Validar el archivo antes de intentar subirlo
      const validationError = validateFile(file);
      if (validationError) {
        setImageUploadError(validationError);
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.error('Error de carga:', error); // Imprime el error completo
          let errorMessage = 'Error desconocido';
          if (error.code) {
            switch (error.code) {
              case 'storage/unauthorized':
                errorMessage = 'No tienes permiso para acceder al recurso.';
                break;
              case 'storage/canceled':
                errorMessage = 'La subida fue cancelada.';
                break;
              case 'storage/unknown':
                errorMessage = 'Se produjo un error desconocido.';
                break;
              case 'storage/failed-precondition': // Error de precondición fallida
                errorMessage = 'El archivo no cumple con las condiciones necesarias.';
                break;
              default:
                errorMessage = `Error: ${error.message}`;
            }
          }
          setImageUploadError(`Error de subida: ${errorMessage}`);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Subida fallida');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Algo ha salido mal');
    }
  };

  return (
    <>
      <Header />
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Crea una entrada</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Título'
              required
              id='title'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value='uncategorized'>Selecciona una categoría</option>
              <option value='Entrenamientos'>Entrenamientos</option>
              <option value='Consejos'>Recomendaciones</option>
              <option value='Reglamento'>Reglas Ultimate</option>
            </Select>
          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className='w-16 h-16'>
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                'Subir Imagen'
              )}
            </Button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          {formData.image && (
            <img
              src={formData.image}
              alt='upload'
              className='w-full h-72 object-cover'
            />
          )}
          <TiptapEditor
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <Button type='submit' gradientDuoTone='purpleToPink'>
            Publicar
          </Button>
          {publishError && (
            <Alert className='mt-5' color='failure'>
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </>
  );
}
