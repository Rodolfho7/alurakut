import { Box, MainGrid, ProfileRelationsBoxWrapper } from '../src/components';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';

function ProfileSidebar({ githubUserImage }) {
  return (
    <Box>
      <img src={ `https://github.com/${githubUserImage}.png` } style={{ borderRadius: '8px' }} />
    </Box>
  );
}

export default function Home() {
  const githubUserImage = 'rodolfho7';

  const pessoasFavoritas = [
    'mayconcarlete',
    'ry',
    'rmanguinho',
    'ayerrsn'
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUserImage={githubUserImage} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
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
