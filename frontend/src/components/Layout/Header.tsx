import Neo4jLogoBW from '../../logo.svg';
import Neo4jLogoColor from '../../logo-color.svg';
import {
  MoonIconOutline,
  SunIconOutline,
  CodeBracketSquareIconOutline,
  InformationCircleIconOutline,
} from '@neo4j-ndl/react/icons';
import { Typography } from '@neo4j-ndl/react';
import { useCallback, useEffect } from 'react';
import IconButtonWithToolTip from '../UI/IconButtonToolTip';
import { tooltips } from '../../utils/Constants';
import { useFileContext } from '../../context/UsersFiles';

export default function Header({ themeMode, toggleTheme }: { themeMode: string; toggleTheme: () => void }) {
  const handleURLClick = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const { isSchema, setIsSchema } = useFileContext();

  useEffect(() => {
    setIsSchema(isSchema);
  }, [isSchema]);

  return (
    <div
      className='n-bg-palette-neutral-bg-weak p-1'
      style={{ borderBottom: '2px solid rgb(var(--theme-palette-neutral-border-weak))' }}
    >
      <nav
        className='flex items-center justify-between flex-row'
        role='navigation'
        data-testid='navigation'
        id='navigation'
        aria-label='main navigation'
      >
        <section className='flex w-1/3 shrink-0 grow-0 items-center grow min-w-[200px]'>
          <Typography className="ml-1" variant='h6' component='a' href='#app-bar-with-responsive-menu' sx={{}}>
            <img
              src={
                themeMode === 'dark'
                  ? '/degraph_logo_horizontal.webp'
                  : '/degraph_logo_horizontal.webp'
              }
              className='h-8 min-h-8 min-w-8 rounded-[1px]'
              alt='Neo4j Logo'
            />
          </Typography>

          {/* <Typography
            className='ml-2 mb-0.5'
            style={{ fontFamily: 'StyreneA, Arial, serif' }}
            variant='h5'
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{}}
          >
            Hedera
          </Typography> */}
        </section>
        <section className='items-center justify-end w-1/3 grow-0 flex'>
          <div>
            <div
              className='inline-flex gap-x-1'
              style={{ display: 'flex', flexGrow: 0, alignItems: 'center', gap: '4px' }}
            >
              <IconButtonWithToolTip
                text={tooltips.documentation}
                onClick={() => handleURLClick('http://degraph.var-meta.com:8090/docs')}
                size='large'
                clean
                placement='left'
                label={tooltips.documentation}
              >
                <InformationCircleIconOutline className='n-size-token-7' />
              </IconButtonWithToolTip>

              <IconButtonWithToolTip
                label={tooltips.github}
                onClick={() => handleURLClick('https://github.com/dungpt3003/hedera-knowledge-graph-builder/issues')}
                text={tooltips.github}
                size='large'
                clean
              >
                <CodeBracketSquareIconOutline />
              </IconButtonWithToolTip>
              <IconButtonWithToolTip
                label={tooltips.theme}
                text={tooltips.theme}
                clean
                size='large'
                onClick={toggleTheme}
                placement='left'
              >
                {themeMode === 'dark' ? (
                  <span role='img' aria-label='sun'>
                    <SunIconOutline />
                  </span>
                ) : (
                  <span role='img' aria-label='moon'>
                    <MoonIconOutline />
                  </span>
                )}
              </IconButtonWithToolTip>
            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
