import { FC, useRef, DragEvent, useEffect } from 'react';
import './imageUpload.css'

type imageUploadProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const ImageUpload: FC<imageUploadProps> = ({ onChange }: imageUploadProps) => {
  const drop = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer?.files;

      if (files && files.length > 0 && onChange) {
        const syntheticEvent = {
          target: { files },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const dropArea = drop.current;

    if (dropArea) {
      dropArea.addEventListener(
        'dragover',
        handleDragOver as unknown as EventListener
      );
      dropArea.addEventListener('drop', handleDrop as unknown as EventListener);

      return () => {
        dropArea.removeEventListener(
          'dragover',
          handleDragOver as unknown as EventListener
        );
        dropArea.removeEventListener(
          'drop',
          handleDrop as unknown as EventListener
        );
      };
    }
  }, [onChange]);

  return (
    <div className='flex items-center justify-center w-96' ref={drop}>
      <label
        htmlFor='upload'
        className='flex flex-col justify-center items-center gap-4 w-full h-48 border border-dashed rounded-2xl cursor-pointer hover:bg-zinc-700'>

        <h2>
          Clique aqui <strong className='upload-text'>upload</strong> ou arraste seu arquivo
        </h2>

        <input
          className='hidden w-full h-full'
          type='file'
          name='upload'
          id='upload'
          multiple
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;