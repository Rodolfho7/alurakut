import { useEffect, useState } from 'react';
import { Box, MainGrid, ProfileRelationsBoxWrapper } from '../src/components';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/alurakutCommons';

function ProfileSidebar({ githubUserImage, githubUser }) {
  return (
    <Box as="aside">
      <img src={ `https://github.com/${githubUserImage}.png` } style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, itens }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title}({ itens.length })
      </h2>
      <ul>
        {itens.map((item, index) => {
          return index <= 5 && (
            <li key={item.id}>
              <a href="#">
                <img src={item.avatar_url} />
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {

  const [comunidades, setComunidades] = useState(['1']);
  const [seguidores, setSeguidores] = useState([]);

  const githubUserImage = 'rodolfho7';

  const pessoasFavoritas = [
    'mayconcarlete',
    'ry',
    'rmanguinho',
    'ayerrsn'
  ];

  const handleCriaComunidade = (event) => {
    event.preventDefault();

    const dadosForm = new FormData(event.target);

    const comunidadeCriada = {
      title: dadosForm.get('title'),
      image: dadosForm.get('image')
    };

    setComunidades([...comunidades, comunidadeCriada]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
      .then((respostaDoServidor) => {
        return respostaDoServidor.json()
      })
      .then((respostaCompleta) => {
        console.log(respostaCompleta)
        setSeguidores(respostaCompleta);
      });
  }, []);


  return (
    <>
      <AlurakutMenu githubUser={githubUserImage} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUserImage={githubUserImage} githubUser={githubUserImage} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2>O que voce deseja fazer?</h2>

            <form onSubmit={handleCriaComunidade}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button type="submit">
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBox title="Seguidores" itens={seguidores} />
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              comunidade({ comunidades.length })
            </h2>
            <ul>
              {comunidades.map((item) => {
                return (
                  <li key={item.title}>
                    <a href="#">
                      <img src={`https://placehold.it/300x300`} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade({ pessoasFavoritas.length })
            </h2>
            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li key={item}>
                    <a href="#">
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
