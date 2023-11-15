import React from 'react';
import Header from './components/header';
import ImageUpload from './components/input/imageUpload';
import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://laxtonsbbgirkmnbdiya.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxheHRvbnNiYmdpcmttbmJkaXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAxNzAsImV4cCI6MjAxNTU3NjE3MH0.PNgosxOFtbzii2e7uyY2AxL4J5wR0KncRqWx96SvOjc')

const App: React.FC = () => {

  const [userId, setUserId] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user !== null) {
        setUserId(user.id);
      } else {
        setUserId('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files);
    }
  };
  async function handleSendFiles() {
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        const file = selectedFile[i];

        await supabase.storage
          .from('Imagens')
          .upload(userId + '/' + uuidv4(), file);
      }

      setSelectedFile(null);
    } else {
      console.warn('Nenhum arquivo selecionado!');
    }
  }
  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div>
      <Header />
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
        }}
        providers={[]}
      />
      <h1 className="description-area">Faça o upload da sua imagem</h1>
      <div className='input-area'>
        <ImageUpload onChange={handleFileChange} />
      </div>
      <button onClick={handleSendFiles}>Enviar</button>
    </div>
  );
};

export default App;
