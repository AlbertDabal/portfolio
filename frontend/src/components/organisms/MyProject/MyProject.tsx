import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BasicTemplate } from 'templates/BasicTemplate';
import Card from './Card/Card';

const Title = styled.h1`
  background: linear-gradient(182deg, #4924ec 0%, #cb1291 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  font-weight: 700;
  margin-top: 10vh;
  margin-bottom: 10vh;
  display: flex;
  justify-content: flex-start;
  align-self: start;
`;

const WrapperProject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & > div:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: 1100px) {
      flex-direction: column;
    }
  }

  & > div:nth-child(odd) {
    @media (max-width: 1100px) {
      flex-direction: column;
    }
  }
`;

const Button = styled.button`
  margin-top: 20px;
  border-radius: 15px;
  background: linear-gradient(180deg, #2d27ff 0%, #ff0a6c 130.39%);

  outline: none;
  border: none;
  padding: 15px 75px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 3px 0px rgba(0, 0, 0, 0.14),
    0px 3px 5px -2px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: perspective(1000px) translateZ(50px);
  }

  @media (max-width: 1100px) {
    background: transparent;
    box-shadow: none;
    color: black;
    text-decoration: underline;
    font-weight: 600;
    & > span {
      text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
    }
  }

  transition: 0.8s all ease;
`;

const MyProject = () => {
  const [data, setData] = useState<any>(null);
  const [moreShow, setMoreShow] = useState<boolean>(false);

  useEffect(() => {
    const GetData = async () => {
      try {
        const lang = navigator.language === 'en' || navigator.language === 'pl' ? navigator.language : 'en';
        const res = await axios({ url: `./locales/${lang}/Projects.json` });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    GetData();
  }, []);

  return (
    <BasicTemplate id="my-project">
      <div style={{ paddingBottom: '15vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title>{data?.title}</Title>
        <WrapperProject>
          {data?.projects &&
            data.projects
              .filter((item: any, idx: number) => (moreShow ? idx < 10 : idx < 3))
              .map(
                (
                  items: {
                    images: string;
                    name: string;
                    technology: string;
                    description: string;
                    website: string | undefined;
                    github: string | undefined;
                  },
                  index: number
                ) => (
                  <Card
                    images={items.images}
                    name={items.name}
                    technology={items.technology}
                    description={items.description}
                    website={items.website}
                    github={items.github}
                    index={index}
                  />
                )
              )}
        </WrapperProject>
        {!moreShow && (
          <Button onClick={() => setMoreShow(true)}>
            <span>See More...</span>
          </Button>
        )}
      </div>
    </BasicTemplate>
  );
};

export default MyProject;
